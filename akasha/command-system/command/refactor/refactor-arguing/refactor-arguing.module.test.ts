import { expect, test } from "bun:test"
import { flagsIn } from "./refactor-arguing.module.code.ts"

function why(argv: readonly string[]): string {
  const said = flagsIn(argv)
  return "refused" in said ? said.refused : ""
}

test("a flag this does not take is refused", () => {
  expect(why(["--nowhere", "one"])).toContain("is not a flag this takes")
})

test("a flag said more than once is refused", () => {
  expect(why(["--from", "one", "--from", "two"])).toContain("said more than once")
})

test("a flag given no value is refused", () => {
  expect(why(["--from"])).toContain("needs a value")
})

test("a dry run is read off the line and carries no value", () => {
  const said = flagsIn(["--dry-run", "--plural", "chairs", "--from", "seat", "--to", "chair"])
  expect("refused" in said ? null : said.dryRun).toBe(true)
  expect("refused" in said ? null : said.said.get("--plural")).toBe("chairs")
})

test("a line naming no dry run says so", () => {
  const said = flagsIn(["--from", "seat", "--to", "chair"])
  expect("refused" in said ? null : said.dryRun).toBe(false)
})

test("a respelling inside strings is read off the line", () => {
  const said = flagsIn(["--in-strings", "--from", "one", "--to", "two"])
  expect("refused" in said ? null : said.inStrings).toBe(true)
})

test("a line naming no respelling inside strings says so", () => {
  const said = flagsIn(["--from", "one", "--to", "two"])
  expect("refused" in said ? null : said.inStrings).toBe(false)
})

test("the value a flag carries is read whole", () => {
  const said = flagsIn(["--at", "akasha/one.module.code.ts", "--line", "288"])
  expect("refused" in said ? null : said.said.get("--at")).toBe("akasha/one.module.code.ts")
  expect("refused" in said ? null : said.said.get("--line")).toBe("288")
})

test("a line naming nothing at all is no flag rather than a refusal", () => {
  const said = flagsIn([])
  expect("refused" in said ? null : said.said.size).toBe(0)
})
