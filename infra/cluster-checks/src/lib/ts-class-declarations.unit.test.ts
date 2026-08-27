import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { scanClassDeclarations } from "./ts-class-declarations.ts"

const sfOf = (src: string, filePath = "x.ts") => {
  const scriptKind = filePath.endsWith(".tsx")
    ? ts.ScriptKind.TSX
    : filePath.endsWith(".jsx")
      ? ts.ScriptKind.JSX
      : filePath.endsWith(".mjs") || filePath.endsWith(".cjs") || filePath.endsWith(".js")
        ? ts.ScriptKind.JS
        : ts.ScriptKind.TS
  return ts.createSourceFile(filePath, src, ts.ScriptTarget.Latest, true, scriptKind)
}

const findingsOf = (src: string, filePath = "x.ts") => scanClassDeclarations(sfOf(src, filePath))

const namesOf = (src: string, filePath = "x.ts"): readonly (string | null)[] =>
  findingsOf(src, filePath).map((f) => f.name)

describe("scanClassDeclarations — declarations", () => {
  test("plain class declaration emits one finding with the class name", () => {
    const src = `class Foo {}\n`
    expect(namesOf(src)).toEqual(["Foo"])
  })

  test("exported class declaration emits one finding", () => {
    const src = `export class Bar {}\n`
    expect(namesOf(src)).toEqual(["Bar"])
  })

  test("export default class declaration emits one finding", () => {
    const src = `export default class Baz {}\n`
    expect(namesOf(src)).toEqual(["Baz"])
  })

  test("export default with anonymous class emits one finding with null name", () => {
    const src = `export default class {}\n`
    expect(namesOf(src)).toEqual([null])
  })

  test("abstract class declaration emits one finding", () => {
    const src = `export abstract class Base {}\n`
    expect(namesOf(src)).toEqual(["Base"])
  })

  test("class with extends clause records the parent name", () => {
    const src = `export class FooError extends Error {}\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.name).toBe("FooError")
    expect(findings[0]?.extendsName).toBe("Error")
  })

  test("class with implements only records null extendsName", () => {
    const src = `export class Store implements Iface {}\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.extendsName).toBeNull()
  })

  test("class with extends and implements records the parent name", () => {
    const src = `export class Store extends Base implements Iface {}\n`
    const findings = findingsOf(src)
    expect(findings[0]?.extendsName).toBe("Base")
  })

  test("generic class records the parent name without type arguments", () => {
    const src = `export class Boundary extends React.Component<P, S> {}\n`
    const findings = findingsOf(src)
    expect(findings[0]?.extendsName).toBe("React.Component")
  })

  test("class expression in a variable initializer is reported", () => {
    const src = `const C = class extends Base {}\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.isExpression).toBe(true)
    expect(findings[0]?.name).toBeNull()
  })

  test("named class expression is reported with its inner name", () => {
    const src = `const C = class Inner extends Base {}\n`
    const findings = findingsOf(src)
    expect(findings[0]?.name).toBe("Inner")
    expect(findings[0]?.isExpression).toBe(true)
  })

  test("class returned from a function is reported as expression", () => {
    const src = `function makeOne() { return class extends Base {} }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.isExpression).toBe(true)
  })

  test("multiple classes in one file emit one finding each", () => {
    const src = `class A {}\nclass B {}\nclass C extends A {}\n`
    expect(namesOf(src)).toEqual(["A", "B", "C"])
  })

  test("nested classes are reported once each", () => {
    const src = `class Outer { method() { return class Inner {} } }\n`
    const findings = findingsOf(src)
    expect(findings.map((f) => f.name)).toEqual(["Outer", "Inner"])
  })

  test("file with no class declarations emits no findings", () => {
    const src = `function f() {}\nconst x = 1\nexport interface I { y: number }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test(".tsx file with class component is reported", () => {
    const src = `export class Boundary extends React.Component<P, S> {\n  render() { return null }\n}\n`
    expect(namesOf(src, "x.tsx")).toEqual(["Boundary"])
  })

  test("line and column are 1-indexed", () => {
    const src = `\n  class Foo {}\n`
    const findings = findingsOf(src)
    expect(findings[0]?.line).toBe(2)
    expect(findings[0]?.column).toBe(3)
  })

  test("file path passes through verbatim", () => {
    const findings = findingsOf(`class X {}\n`, "foo/src/bar.ts")
    expect(findings[0]?.file).toBe("foo/src/bar.ts")
  })
})

describe("scanClassDeclarations — hasErrorBoundaryMethod", () => {
  test("class with static getDerivedStateFromError is flagged", () => {
    const src = `
      class B extends React.Component {
        static getDerivedStateFromError(e: Error) { return { e } }
        render() { return null }
      }
    `
    const findings = findingsOf(src)
    expect(findings[0]?.hasErrorBoundaryMethod).toBe(true)
  })

  test("class with instance componentDidCatch is flagged", () => {
    const src = `
      class B extends React.Component {
        componentDidCatch(error: Error, info: unknown) {}
        render() { return null }
      }
    `
    const findings = findingsOf(src)
    expect(findings[0]?.hasErrorBoundaryMethod).toBe(true)
  })

  test("class with getDerivedStateFromError as a property declaration is flagged", () => {
    const src = `
      class B extends React.Component {
        static getDerivedStateFromError = (e: Error) => ({ e })
        render() { return null }
      }
    `
    const findings = findingsOf(src)
    expect(findings[0]?.hasErrorBoundaryMethod).toBe(true)
  })

  test("class with both lifecycle methods is flagged", () => {
    const src = `
      class B extends React.Component {
        static getDerivedStateFromError(e: Error) { return { e } }
        componentDidCatch() {}
        render() { return null }
      }
    `
    const findings = findingsOf(src)
    expect(findings[0]?.hasErrorBoundaryMethod).toBe(true)
  })

  test("class without either lifecycle method is not flagged", () => {
    const src = `
      class B extends React.Component {
        componentDidMount() {}
        render() { return null }
      }
    `
    const findings = findingsOf(src)
    expect(findings[0]?.hasErrorBoundaryMethod).toBe(false)
  })

  test("plain class with no body methods is not flagged", () => {
    const findings = findingsOf(`class Foo {}\n`)
    expect(findings[0]?.hasErrorBoundaryMethod).toBe(false)
  })

  test("class extending Error with the lifecycle name does not get flagged for error boundary unless body matches", () => {
    const src = `
      class FooError extends Error {
        constructor(msg: string) { super(msg) }
      }
    `
    const findings = findingsOf(src)
    expect(findings[0]?.hasErrorBoundaryMethod).toBe(false)
  })
})
