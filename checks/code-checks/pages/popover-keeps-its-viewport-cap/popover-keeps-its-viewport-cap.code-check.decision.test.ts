import { expect, test } from "bun:test"
import {
  reasonsIn,
  tagsIn,
  tsxNamed,
  widthReason,
} from "./popover-keeps-its-viewport-cap.code-check.decision.code.ts"
import {
  USES_AT,
  WRAPPER,
  WRAPPER_AT,
} from "./popover-keeps-its-viewport-cap.code-check.decision.test-fixtures.ts"

const TAGS = tagsIn([{ path: WRAPPER_AT, text: WRAPPER }])

function over(text: string): readonly string[] {
  return reasonsIn(TAGS, USES_AT, text)
}

test("a wrapper capping by available width names its tag", () => {
  expect([...TAGS]).toEqual([["PopoverContent", "popover"]])
})

test("a wrapper setting no collision padding names no tag", () => {
  const text =
    "export function LooseContent() {\n" +
    '  return <Inner className="max-w-(--radix-popover-content-available-width)" />\n' +
    "}\n"
  expect(tagsIn([{ path: WRAPPER_AT, text }]).size).toBe(0)
})

test("a wrapper that is not exported names no tag", () => {
  const text =
    "function PopoverContent() {\n" +
    '  return <Inner collisionPadding={8} className="max-w-(--radix-popover-content-available-width)" />\n' +
    "}\n"
  expect(tagsIn([{ path: WRAPPER_AT, text }]).size).toBe(0)
})

test("one tag capped by two families refuses the read", () => {
  const other = WRAPPER.replace("radix-popover", "radix-select")
  expect(() =>
    tagsIn([
      { path: WRAPPER_AT, text: WRAPPER },
      { path: USES_AT, text: other },
    ])
  ).toThrow(/caps by "popover" in one file and by "select" in another/)
})

test("a file using no named tag is refused nothing", () => {
  expect(over('const one = <Other className="max-w-none" />\n')).toEqual([])
})

test("a named tag with no width token is refused nothing", () => {
  expect(over('const one = <PopoverContent className="p-2" />\n')).toEqual([])
})

test("max-w-none on a named tag is refused", () => {
  const said = over('const one = <PopoverContent className="max-w-none" />\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("undoes the viewport cap")
  expect(said[0]).toContain("--radix-popover-content-available-width")
})

test("a fixed width on a named tag is refused", () => {
  expect(over('const one = <PopoverContent className="max-w-sm" />\n')).toHaveLength(1)
})

test("an arbitrary width on a named tag is refused", () => {
  const said = over('const one = <PopoverContent className="max-w-[40rem]" />\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("max-w-[40rem]")
})

test("an arbitrary width holding a calc is left", () => {
  expect(over('const one = <PopoverContent className="max-w-[calc(20rem)]" />\n')).toEqual([])
})

test("a width naming the cap itself is left", () => {
  const text =
    'const one = <PopoverContent className="max-w-[var(--radix-popover-content-available-width)]" />\n'
  expect(over(text)).toEqual([])
})

test("a variant prefix and an important mark are read past", () => {
  expect(over('const one = <PopoverContent className="sm:!max-w-none" />\n')).toHaveLength(1)
})

test("a className a call builds is read through", () => {
  expect(over('const one = <PopoverContent className={cn("max-w-none")} />\n')).toHaveLength(1)
})

test("turning collisions off is refused", () => {
  const said = over("const one = <PopoverContent avoidCollisions={false} />\n")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("flip and shift")
})

test("leaving collisions on is left", () => {
  expect(over("const one = <PopoverContent avoidCollisions={true} />\n")).toEqual([])
})

test("closing the collision padding is refused", () => {
  const said = over("const one = <PopoverContent collisionPadding={0} />\n")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("margin between the panel")
})

test("a collision padding of its own is left", () => {
  expect(over("const one = <PopoverContent collisionPadding={8} />\n")).toEqual([])
})

test("a tag written with children is read too", () => {
  const text = 'const one = <PopoverContent className="max-w-none">held</PopoverContent>\n'
  expect(over(text)).toHaveLength(1)
})

test("the line named is the line the attribute is on", () => {
  const text = 'const one = (\n  <PopoverContent\n    className="max-w-none"\n  />\n)\n'
  expect(over(text)[0]).toContain("line 3:")
})

test("a token carrying no width is answered nothing", () => {
  expect(widthReason("p-2", "popover")).toBeNull()
})

test("only a tsx path is taken", () => {
  expect(tsxNamed(USES_AT)).toBe(true)
  expect(tsxNamed("web/one/one.module.code.ts")).toBe(false)
})
