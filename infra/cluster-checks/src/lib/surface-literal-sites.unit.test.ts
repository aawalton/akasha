import { describe, expect, test } from "bun:test"

import {
  declaresSurfaceHelper,
  findSurfaceLiteralSites,
  mayHoldSurfaceLiteral,
} from "./surface-literal-sites.ts"

const tokensIn = (source: string, filename = "a.tsx"): readonly string[] =>
  findSurfaceLiteralSites(source, filename).map((site) => site.token)

describe("findSurfaceLiteralSites", () => {
  test("catches the inline attribute the attribute-only reader already caught", () => {
    expect(tokensIn(`const A = () => <div className="rounded bg-surface-2" />`)).toEqual([
      "bg-surface-2",
    ])
  })

  test("catches a literal in an options object handed to a third-party component", () => {
    const source = `const T = () => <Sonner toastOptions={{ classNames: OPTS }} />
const OPTS = { toast: "bg-surface-2 border-none", error: "!bg-surface-2" }`
    expect(tokensIn(source)).toEqual(["bg-surface-2", "!bg-surface-2"])
  })

  test("catches a literal inside a class-joining helper in a local function", () => {
    const source = `function f(active: boolean) {
  return cn("rounded", active ? "text-accent bg-surface-2" : "hover:bg-surface-2")
}`
    expect(tokensIn(source)).toEqual(["bg-surface-2"])
  })

  test("catches a literal passed as a prop other than className", () => {
    expect(tokensIn(`const A = () => <Group headerClassName="rounded bg-surface-2" />`)).toEqual([
      "bg-surface-2",
    ])
  })

  test("catches a literal in a variant table", () => {
    const source = `const variants = { destructive: "bg-surface-2 text-secondary" } as const`
    expect(tokensIn(source)).toEqual(["bg-surface-2"])
  })

  test("catches a literal on a module constant applied by name later", () => {
    const source = `const CLS = "focus:!bg-surface-4 bg-surface-4"
const A = () => <Item className={CLS} />`
    expect(tokensIn(source)).toEqual(["bg-surface-4"])
  })

  test("catches a literal in a plain .ts module a component imports", () => {
    expect(tokensIn(`export const D = { toast: "!bg-surface-0 !font-bold" }`, "use-x.ts")).toEqual([
      "!bg-surface-0",
    ])
  })

  test("catches a literal in a fixed chunk of a template with substitutions", () => {
    expect(tokensIn("const c = `flex ${gap} bg-surface-3 p-2`")).toEqual(["bg-surface-3"])
  })

  test("leaves variant-prefixed forms alone, which is the standing exemption", () => {
    const source = `const c = "hover:bg-surface-2 md:bg-surface-3 data-[state=open]:bg-surface-1"`
    expect(tokensIn(source)).toEqual([])
  })

  test("leaves the fix alone — a surfaceClass call in an interpolation is not a literal", () => {
    expect(tokensIn("const c = `flex ${surfaceClass(2)} p-2`")).toEqual([])
  })

  test("reads through neither a comment nor a JSX text node", () => {
    const source = `// bg-surface-2 in a comment is prose about the rule
const A = () => <code>bg-surface-1</code>`
    expect(tokensIn(source)).toEqual([])
  })

  test("reports the line the string was written on", () => {
    const source = `const a = "p-2"\nconst b = "bg-surface-4"`
    expect(findSurfaceLiteralSites(source, "a.tsx")).toEqual([{ line: 2, token: "bg-surface-4" }])
  })

  test("parses a .ts file as TS, so a type assertion does not swallow the rest of it", () => {
    const source = `const n = <number>x\nexport const CLS = "bg-surface-1"`
    expect(tokensIn(source, "cast.ts")).toEqual(["bg-surface-1"])
  })
})

describe("mayHoldSurfaceLiteral", () => {
  test("false is what keeps the parse off nearly every file in the population", () => {
    expect(mayHoldSurfaceLiteral(`const c = "rounded bg-accent/15 p-2"`)).toBe(false)
    expect(mayHoldSurfaceLiteral(`const c = "hover:bg-surface-2"`)).toBe(true)
  })
})

describe("declaresSurfaceHelper", () => {
  test("true for the module that exports the helper, whatever the module is called", () => {
    const source = `const TABLE = ["bg-surface-0", "bg-surface-1"] as const
export function surfaceClass(level: number): string {
  return TABLE[level] ?? ""
}`
    expect(declaresSurfaceHelper(source, "anything.ts")).toBe(true)
  })

  test("true for an exported const binding of the same name", () => {
    expect(declaresSurfaceHelper(`export const surfaceClass = (n: number) => ""`, "a.ts")).toBe(
      true
    )
  })

  test("false for a component that merely calls the helper", () => {
    const source = `import { surfaceClass } from "./surface-class"
const A = () => <div className={surfaceClass(2)} />`
    expect(declaresSurfaceHelper(source, "a.tsx")).toBe(false)
  })

  test("false for a module that declares it without exporting it", () => {
    expect(declaresSurfaceHelper(`function surfaceClass(n: number) { return "" }`, "a.ts")).toBe(
      false
    )
  })
})
