import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { scanTstlPropertyCallbackSelf } from "./ts-tstl-property-callback-self.ts"

const sfOf = (src: string, filePath = "x.ts"): ts.SourceFile =>
  ts.createSourceFile(filePath, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

const findingsOf = (src: string, filePath = "x.ts") =>
  scanTstlPropertyCallbackSelf(sfOf(src, filePath))

const namesOf = (src: string): readonly string[] => findingsOf(src).map((f) => f.name)

describe("scanTstlPropertyCallbackSelf — flags property-style callbacks missing this: void", () => {
  test("interface property-style function type without this: void — the #12209 sortFunction shape — is flagged", () => {
    const src = "interface UnitList { sortFunction: (a: Entry, b: Entry) => boolean }\n"
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.name).toBe("sortFunction")
  })

  test("type-literal property-style function type without this: void is flagged", () => {
    const src = "type T = { cb: (n: number) => void }\n"
    expect(namesOf(src)).toEqual(["cb"])
  })

  test("zero-parameter property-style callback without this: void is flagged", () => {
    const src = "interface I { isReady: () => boolean }\n"
    expect(namesOf(src)).toEqual(["isReady"])
  })

  test("optional property-style callback without this: void is flagged", () => {
    const src = "interface I { onDone?: (ok: boolean) => void }\n"
    expect(namesOf(src)).toEqual(["onDone"])
  })

  test("parenthesized function type without this: void is flagged", () => {
    const src = "interface I { cb: ((n: number) => void) }\n"
    expect(namesOf(src)).toEqual(["cb"])
  })

  test("union member function type without this: void is flagged", () => {
    const src = "interface I { cb: ((n: number) => void) | undefined }\n"
    expect(namesOf(src)).toEqual(["cb"])
  })

  test("nested type literal in a parameter position is reached by the walk", () => {
    const src = "function f(opts: { onTick: (n: number) => void }): void {}\n"
    expect(namesOf(src)).toEqual(["onTick"])
  })

  test("finding carries 1-indexed line and column at the property", () => {
    const src = ["interface I {", "  sortFunction: (a: Entry) => boolean", "}", ""].join("\n")
    const f = findingsOf(src)[0]
    expect(f?.line).toBe(2)
    expect(f?.column).toBe(3)
  })
})

describe("scanTstlPropertyCallbackSelf — does NOT flag legitimate shapes", () => {
  test("property-style callback WITH this: void is clean", () => {
    const src = "interface UnitList { sortFunction: (this: void, a: Entry, b: Entry) => boolean }\n"
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("property-style self-method WITH an explicit this: Receiver is clean", () => {
    const src = "interface UnitList { Initialize: (this: UnitList, control: Control) => void }\n"
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("method-shorthand signature is clean (self-method form, the inverse rule)", () => {
    const src = "interface TooltipControl { LayoutItem(bagId: number, slotIndex: number): void }\n"
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("non-function property is clean", () => {
    const src = "interface I { count: number; name: string }\n"
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("standalone function-type alias is out of scope (not a property)", () => {
    const src = "type Cb = (n: number) => void\n"
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("property typed as an object literal (no function) is clean", () => {
    const src = "interface I { config: { enabled: boolean } }\n"
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("mix — only the missing-this:void members are flagged", () => {
    const src = [
      "interface I {",
      "  ok: (this: void, n: number) => boolean",
      "  bad: (n: number) => boolean",
      "  also(n: number): boolean",
      "}",
      "",
    ].join("\n")
    expect(namesOf(src)).toEqual(["bad"])
  })

  test("empty interface and type literal are clean", () => {
    expect(findingsOf("interface I {}\ntype T = {}\n")).toHaveLength(0)
  })
})
