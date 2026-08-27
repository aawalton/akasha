import { describe, expect, test } from "bun:test"
import {
  collectGeneratedGlobalFns,
  collectGeneratedObjectMethods,
  collectGlobalCallableDecls,
  findFalseGlobalDecls,
} from "./eso-global-decl-consistency.ts"

const OBJECTS = [
  "interface AddOnManager {",
  "  GetNumAddOns(): number",
  "  GetAddOnInfo(addOnIndex: number): LuaMultiReturn<[name: string]>",
  "  SetAddOnEnabled(addOnIndex: number, enabled: boolean): void",
  "}",
  "interface AnimationManager {",
  "  CreateTimeline(): unknown",
  "}",
  "",
].join("\n")

const FUNCTIONS = [
  "declare function GetAddOnManager(): AddOnManager",
  "declare function ReloadUI(guiName: string): void",
  "",
].join("\n")

describe("collectGeneratedObjectMethods", () => {
  test("collects every interface method name across the generated objects surface", () => {
    const methods = collectGeneratedObjectMethods(OBJECTS)
    expect(methods.has("GetNumAddOns")).toBe(true)
    expect(methods.has("GetAddOnInfo")).toBe(true)
    expect(methods.has("SetAddOnEnabled")).toBe(true)
    expect(methods.has("CreateTimeline")).toBe(true)
  })

  test("does not treat a name absent from the surface as a method", () => {
    expect(collectGeneratedObjectMethods(OBJECTS).has("GetAddOnManager")).toBe(false)
  })
})

describe("collectGeneratedGlobalFns", () => {
  test("collects every generated top-level declare function name", () => {
    const globals = collectGeneratedGlobalFns(FUNCTIONS)
    expect(globals.has("GetAddOnManager")).toBe(true)
    expect(globals.has("ReloadUI")).toBe(true)
  })
})

describe("collectGlobalCallableDecls", () => {
  test("collects each manual declare function with its 1-indexed position and name", () => {
    const src = [
      "declare function GetUnitName(unitTag: string): string",
      "declare function GetNumAddOns(): number",
      "",
    ].join("\n")
    const manual = collectGlobalCallableDecls("api.d.ts", src)
    expect(manual.map((m) => m.name)).toEqual(["GetUnitName", "GetNumAddOns"])
    const numAddOns = manual.find((m) => m.name === "GetNumAddOns")
    expect(numAddOns?.file).toBe("api.d.ts")
    expect(numAddOns?.line).toBe(2)
    expect(numAddOns?.column).toBe(1)
    expect(numAddOns?.keyword).toBe("function")
  })

  test("collects a callable global spelled as a const, let or var", () => {
    const src = [
      "declare const GetNumAddOns: (this: void) => number",
      "declare let GetAddOnInfo: { (i: number): string }",
      "declare var SetAddOnEnabled: (i: number, on: boolean) => void",
      "",
    ].join("\n")
    const decls = collectGlobalCallableDecls("addon-manager.d.ts", src)
    expect(decls.map((d) => [d.name, d.keyword, d.line])).toEqual([
      ["GetNumAddOns", "const", 1],
      ["GetAddOnInfo", "let", 2],
      ["SetAddOnEnabled", "var", 3],
    ])
  })

  test("does not collect a declared value nothing says is callable", () => {
    const src = [
      "declare const MAX_ADDONS: number",
      "declare const ADDON_TABLE: { GetNumAddOns(): number }",
      "declare const UNANNOTATED",
      "",
    ].join("\n")
    expect(collectGlobalCallableDecls("globals.d.ts", src)).toHaveLength(0)
  })

  test("gives each declarator of one statement a position of its own", () => {
    const decls = collectGlobalCallableDecls(
      "api.d.ts",
      "declare const A: () => void, GetNumAddOns: () => number\n"
    )
    expect(decls.map((d) => d.name)).toEqual(["A", "GetNumAddOns"])
    const [first, second] = decls
    expect(second?.column).toBeGreaterThan(first?.column ?? 0)
  })
})

describe("findFalseGlobalDecls", () => {
  const methodNames = collectGeneratedObjectMethods(OBJECTS)
  const globalFnNames = collectGeneratedGlobalFns(FUNCTIONS)

  test("flags a manual global that the generated surface exposes only as an object method", () => {
    const manual = collectGlobalCallableDecls(
      "addon-manager.d.ts",
      "declare function GetNumAddOns(): number\ndeclare function GetAddOnInfo(i: number): string\n"
    )
    const findings = findFalseGlobalDecls({ manual, methodNames, globalFnNames })
    expect(findings.map((f) => f.name)).toEqual(["GetNumAddOns", "GetAddOnInfo"])
    expect(findings[0]?.file).toBe("addon-manager.d.ts")
    expect(findings[0]?.line).toBe(1)
  })

  test("does not flag a manual global that is genuinely a generated global (both global and method)", () => {
    const manual = collectGlobalCallableDecls(
      "api.d.ts",
      "declare function GetAddOnManager(): AddOnManager\n"
    )
    expect(findFalseGlobalDecls({ manual, methodNames, globalFnNames })).toHaveLength(0)
  })

  test("does not flag a manual-only global the generated surface does not know at all", () => {
    const manual = collectGlobalCallableDecls(
      "timers.d.ts",
      "declare function setTimeout(cb: () => void, ms: number): number\n"
    )
    expect(findFalseGlobalDecls({ manual, methodNames, globalFnNames })).toHaveLength(0)
  })

  test("flags the same false global spelled as a callable const, and says which word spelled it", () => {
    const manual = collectGlobalCallableDecls(
      "addon-manager.d.ts",
      "declare const GetNumAddOns: (this: void) => number\n"
    )
    const findings = findFalseGlobalDecls({ manual, methodNames, globalFnNames })
    expect(findings.map((f) => [f.name, f.keyword])).toEqual([["GetNumAddOns", "const"]])
  })

  test("does not flag a manual decl mirroring a generated global spelled as a callable const", () => {
    const generated = collectGeneratedGlobalFns(
      "declare const GetAddOnManager: () => AddOnManager\n"
    )
    const manual = collectGlobalCallableDecls(
      "api.d.ts",
      "declare function GetAddOnManager(): AddOnManager\n"
    )
    expect(findFalseGlobalDecls({ manual, methodNames, globalFnNames: generated })).toHaveLength(0)
  })

  test("clean tree (no false globals) yields no findings", () => {
    const manual = collectGlobalCallableDecls(
      "api.d.ts",
      "declare function GetUnitName(t: string): string\n"
    )
    expect(findFalseGlobalDecls({ manual, methodNames, globalFnNames })).toHaveLength(0)
  })
})
