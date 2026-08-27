import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { scanTstlObjectLiteralSelf } from "./ts-tstl-object-literal-self.ts"

const sfOf = (src: string, filePath = "x.ts"): ts.SourceFile =>
  ts.createSourceFile(filePath, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

const findingsOf = (src: string, filePath = "x.ts") =>
  scanTstlObjectLiteralSelf(sfOf(src, filePath))

const namesOf = (src: string): readonly string[] => findingsOf(src).map((f) => f.name)

describe("scanTstlObjectLiteralSelf — flags object-literal method shorthand with this: void", () => {
  test("object-literal method shorthand with this: void emits one finding with the method name", () => {
    const src = `const bar = { mount(this: void, parent: Control, topOffset: number) { return parent } }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.name).toBe("mount")
  })

  test("factory-returned object literal — the #12076 bug shape — is flagged", () => {
    const src = [
      "function makeSavedSearchBar() {",
      "  return {",
      "    mount(this: void, parent: Control, topOffset: number) { return topOffset },",
      "    applySearch(this: void, term: string) { return term },",
      "  }",
      "}",
      "",
    ].join("\n")
    expect(namesOf(src)).toEqual(["mount", "applySearch"])
  })

  test("only the this: void methods are flagged; siblings without it are clean", () => {
    const src = [
      "const bar = {",
      "  mount(this: void, parent: Control) { return parent },",
      "  refresh(parent: Control) { return parent },",
      "}",
      "",
    ].join("\n")
    expect(namesOf(src)).toEqual(["mount"])
  })

  test("whitespace variant `this :void` is still flagged", () => {
    const src = `const bar = { mount(this :void, n: number) { return n } }\n`
    expect(namesOf(src)).toEqual(["mount"])
  })

  test("finding carries 1-indexed line and column at the method declaration", () => {
    const src = ["const bar = {", "  mount(this: void, n: number) { return n },", "}", ""].join(
      "\n"
    )
    const f = findingsOf(src)[0]
    expect(f?.line).toBe(2)
    expect(f?.column).toBe(3)
  })
})

describe("scanTstlObjectLiteralSelf — does NOT flag legitimate this: void uses", () => {
  test("object-literal method shorthand WITHOUT this: void (FilterController shape) is clean", () => {
    const src = `const ctl = { mount(parent: Control, topOffset: number) { return topOffset } }\n`
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("standalone callback function expression with this: void is clean", () => {
    const src = [
      "EVENT_MANAGER.RegisterForEvent(",
      '  "name",',
      "  EVENT_ADD_ON_LOADED,",
      "  function (this: void, _event: number, addonName: string) { return addonName }",
      ")",
      "",
    ].join("\n")
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("function-expression-valued object property with this: void is clean (not method shorthand)", () => {
    const src = `const o = { cb: function (this: void, n: number) { return n } }\n`
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("class method with this: void is clean (not an object literal)", () => {
    const src = `class C { mount(this: void, n: number) { return n } }\n`
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("interface method signature with this: void is clean", () => {
    const src = `interface I { mount(this: void, n: number): number }\n`
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("top-level function declaration with this: void is clean", () => {
    const src = `function mount(this: void, n: number) { return n }\n`
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("empty object literal and methods without a this param are clean", () => {
    expect(findingsOf("const a = {}\nconst b = { f(n: number) { return n } }\n")).toHaveLength(0)
  })
})
