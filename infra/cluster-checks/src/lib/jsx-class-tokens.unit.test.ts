import { describe, expect, test } from "bun:test"

import { extractJsxClassUsages } from "./jsx-class-tokens.ts"

const FILE = "test.tsx"

function tokensFor(source: string): readonly (readonly string[])[] {
  return extractJsxClassUsages(source, FILE).map((u) => u.tokens)
}

describe("extractJsxClassUsages — string literal className", () => {
  test("plain string literal: tokens are space-split and root flagged on exported component", () => {
    const source = `
      export function Comp() {
        return <div className="foo bar" />
      }
    `
    const usages = extractJsxClassUsages(source, FILE)
    expect(usages).toHaveLength(1)
    expect(usages[0]?.tokens).toEqual(["foo", "bar"])
    expect(usages[0]?.isRootElement).toBe(true)
    expect(usages[0]?.filename).toBe(FILE)
    expect(typeof usages[0]?.line).toBe("number")
    expect(typeof usages[0]?.column).toBe("number")
  })

  test("empty/whitespace-only className produces zero tokens (still a usage entry is acceptable)", () => {
    const source = `
      export function Comp() {
        return <div className="   " />
      }
    `
    const usages = extractJsxClassUsages(source, FILE)
    if (usages.length > 0) {
      expect(usages[0]?.tokens).toEqual([])
    }
  })
})

describe("extractJsxClassUsages — template literal className", () => {
  test("template literal: cooked text segments contribute tokens; interpolations ignored", () => {
    const source = `
      export function Comp({ x }: { x: boolean }) {
        return <div className={\`foo \${x ? "bar" : "baz"} qux\`} />
      }
    `
    const usages = extractJsxClassUsages(source, FILE)
    expect(usages).toHaveLength(1)
    const tokens = usages[0]?.tokens ?? []
    expect(tokens).toContain("foo")
    expect(tokens).toContain("qux")
    expect(tokens).not.toContain("bar")
    expect(tokens).not.toContain("baz")
  })
})

describe("extractJsxClassUsages — cn() / clsx() class-builder calls", () => {
  test("cn(): string literal arg, logical-AND short-circuit, and object-literal values all contribute", () => {
    const source = `
      function cn(...args: unknown[]): string {
        return args.flat().filter((a): a is string => typeof a === "string").join(" ")
      }
      export function Comp({ cond }: { cond: boolean }) {
        return <div className={cn("foo", cond && "bar", { active: "baz" })} />
      }
    `
    const usages = extractJsxClassUsages(source, FILE)
    expect(usages).toHaveLength(1)
    const tokens = usages[0]?.tokens ?? []
    expect(tokens).toContain("foo")
    expect(tokens).toContain("bar")
    expect(tokens).toContain("baz")
  })

  test("conditional expression: both branches contribute their literal", () => {
    const source = `
      declare function cn(...args: unknown[]): string
      export function Comp({ on }: { on: boolean }) {
        return <span className={cn(on ? "primary" : "secondary")}>hi</span>
      }
    `
    const tokens = tokensFor(source).flat()
    expect(tokens).toContain("primary")
    expect(tokens).toContain("secondary")
  })
})

describe("extractJsxClassUsages — cva() variants", () => {
  test("cva('base', { variants: { size: { sm, lg } } }) collects base + every variant string", () => {
    const source = `
      declare function cva(base: string, config: unknown): string
      export function Comp() {
        return (
          <button
            className={cva("base", { variants: { size: { sm: "px-2", lg: "px-4" } } })}
          >x</button>
        )
      }
    `
    const usages = extractJsxClassUsages(source, FILE)
    expect(usages).toHaveLength(1)
    const tokens = usages[0]?.tokens ?? []
    expect(tokens).toContain("base")
    expect(tokens).toContain("px-2")
    expect(tokens).toContain("px-4")
  })
})

describe("extractJsxClassUsages — root vs non-root elements", () => {
  test("nested JSX: outer div is root, inner span is not — both reported", () => {
    const source = `
      export function Comp() {
        return (
          <div className="outer">
            <span className="inner">hi</span>
          </div>
        )
      }
    `
    const usages = extractJsxClassUsages(source, FILE)
    expect(usages).toHaveLength(2)
    const byTokens = new Map(usages.map((u) => [u.tokens.join(" "), u]))
    expect(byTokens.get("outer")?.isRootElement).toBe(true)
    expect(byTokens.get("inner")?.isRootElement).toBe(false)
  })

  test("two exported components: each gets its own isRootElement: true", () => {
    const source = `
      export function A() {
        return <div className="a-root" />
      }
      export function B() {
        return <section className="b-root"><p className="b-child">x</p></section>
      }
    `
    const usages = extractJsxClassUsages(source, FILE)
    const roots = usages.filter((u) => u.isRootElement).map((u) => u.tokens.join(" "))
    expect(roots).toContain("a-root")
    expect(roots).toContain("b-root")
    const child = usages.find((u) => u.tokens.includes("b-child"))
    expect(child?.isRootElement).toBe(false)
  })
})

describe("extractJsxClassUsages — data-slot extraction", () => {
  test("static data-slot string literal is exposed as the dataSlot field", () => {
    const source = `
      export function Comp() {
        return <div data-slot="my-slot" className="p-2" />
      }
    `
    const usages = extractJsxClassUsages(source, FILE)
    expect(usages).toHaveLength(1)
    expect(usages[0]?.dataSlot).toBe("my-slot")
  })

  test("missing data-slot reports null", () => {
    const source = `
      export function Comp() {
        return <div className="p-2" />
      }
    `
    const usages = extractJsxClassUsages(source, FILE)
    expect(usages[0]?.dataSlot).toBeNull()
  })

  test("dynamic (non-literal) data-slot value reports null", () => {
    const source = `
      export function Comp({ slot }: { slot: string }) {
        return <div data-slot={slot} className="p-2" />
      }
    `
    const usages = extractJsxClassUsages(source, FILE)
    expect(usages[0]?.dataSlot).toBeNull()
  })
})

describe("extractJsxClassUsages — enclosingComponent tracking", () => {
  test("element inside a top-level component reports its component name", () => {
    const source = `
      export function MyCompound() {
        return <div className="root"><span className="nested">x</span></div>
      }
    `
    const usages = extractJsxClassUsages(source, FILE)
    expect(usages.length).toBeGreaterThan(0)
    for (const u of usages) {
      expect(u.enclosingComponent).toBe("MyCompound")
    }
  })

  test("two co-exported components report their respective names", () => {
    const source = `
      export function A() {
        return <div className="a-root" />
      }
      export function B() {
        return <section className="b-root" />
      }
    `
    const usages = extractJsxClassUsages(source, FILE)
    const byTokens = new Map(usages.map((u) => [u.tokens.join(" "), u]))
    expect(byTokens.get("a-root")?.enclosingComponent).toBe("A")
    expect(byTokens.get("b-root")?.enclosingComponent).toBe("B")
  })

  test("element outside any top-level component reports null", () => {
    const source = `
      const node = <div className="orphan" />
    `
    const usages = extractJsxClassUsages(source, FILE)
    if (usages.length > 0) {
      expect(usages[0]?.enclosingComponent).toBeNull()
    }
  })
})

describe("extractJsxClassUsages — variant prefixes preserved verbatim", () => {
  test('"md:p-4 hover:mb-2" is reported as two tokens with prefixes intact', () => {
    const source = `
      export function Comp() {
        return <div className="md:p-4 hover:mb-2" />
      }
    `
    const usages = extractJsxClassUsages(source, FILE)
    expect(usages).toHaveLength(1)
    expect(usages[0]?.tokens).toEqual(["md:p-4", "hover:mb-2"])
  })

  test("multiple stacked variants: prefix is preserved as a single token", () => {
    const source = `
      export function Comp() {
        return <div className="dark:hover:mr-1 focus-visible:p-3" />
      }
    `
    const usages = extractJsxClassUsages(source, FILE)
    expect(usages[0]?.tokens).toEqual(["dark:hover:mr-1", "focus-visible:p-3"])
  })
})
