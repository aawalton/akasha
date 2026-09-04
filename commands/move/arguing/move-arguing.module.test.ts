import { expect, test } from "bun:test"
import { pairsIn } from "./move-arguing.module.code.ts"

const HELD = "akasha/one/held.module.ts"

const THREE = "akasha/three/held.module.ts"

function why(argv: readonly string[]): string {
  const said = pairsIn(argv)
  return "refused" in said ? said.refused : ""
}

function pairs(argv: readonly string[]): readonly unknown[] {
  const said = pairsIn(argv)
  if ("refused" in said) throw new Error(said.refused)
  return said.pairs
}

test("a from answered by a to is one pair", () => {
  expect(pairs(["--from", HELD, "--to", THREE])).toEqual([{ from: HELD, to: THREE }])
})

test("naming nothing at all is no pair rather than a refusal", () => {
  expect(pairs([])).toEqual([])
})

test("the pairs stand in the order the line names them", () => {
  expect(pairs(["--from", "a", "--to", "b", "--from", "c", "--to", "d"])).toEqual([
    { from: "a", to: "b" },
    { from: "c", to: "d" },
  ])
})

test("a second from before its to is refused", () => {
  expect(why(["--from", "a", "--from", "b"])).toContain("each pair names both sides")
})

test("a to before any from is refused", () => {
  expect(why(["--to", "b"])).toContain("has no --from")
})

test("a from left unanswered when the line ends is refused", () => {
  expect(why(["--from", "a"])).toContain("has no --to")
})

test("a flag this does not take is refused rather than passed along", () => {
  expect(why(["--sideways", "a"])).toContain("is not a flag this takes")
})

test("a flag given no value is refused", () => {
  expect(why(["--from"])).toContain("needs a value")
})

test("a path flag is refused a value opening with a dash", () => {
  expect(why(["--from", "--to"])).toContain("needs a value")
})

test("a flag carrying free text takes a value opening with a dash", () => {
  expect(pairs(["--from", "a", "--to", "b", "--message", "-said"])).toEqual([
    { from: "a", to: "b" },
  ])
})

test("a dry run is read off the line and carries no value", () => {
  const said = pairsIn(["--from", "a", "--to", "b", "--dry-run"])
  expect("refused" in said ? null : said.dryRun).toBe(true)
})

test("a line naming no dry run says so", () => {
  const said = pairsIn(["--from", "a", "--to", "b"])
  expect("refused" in said ? null : said.dryRun).toBe(false)
})

test("what a message or a reason says is not read as a pair", () => {
  expect(
    pairs(["--message", "held moves", "--break-the-glass", "why", "--from", "a", "--to", "b"])
  ).toEqual([{ from: "a", to: "b" }])
})
