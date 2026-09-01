import { expect, test } from "bun:test"
import { flagsIn, refactor } from "./refactor.command.code.ts"

const GIVEN = {
  root: "/nowhere-at-all",
  calledAs: "akasha refactor",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("an act this does not carry is refused with the ones it does", () => {
  const said = refactor(["reshape", "page-type"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`reshape` is no act this carries")
  expect(said.refusals[0]).toContain("`rename`")
})

test("naming no act is refused with what to say", () => {
  const said = refactor([], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("rename page-type")
})

test("an act names the namespace it is worked over", () => {
  const said = refactor(["rename"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names the namespace it is worked over")
})

test("a namespace this does not carry is refused with the ones it does", () => {
  const said = refactor(["rename", "seat"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`seat` is not one of them")
  expect(said.refusals[0]).toContain("`page-type`")
  expect(said.refusals[0]).toContain("`property-slug`")
})

test("a key rename takes the property it is worked over and the key it becomes", () => {
  const said = refactor(["rename", "property-slug", "--from", "text-property/slug"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--to")
})

test("a key rename takes no plural", () => {
  const said = refactor(
    ["rename", "property-slug", "--from", "text-property/slug", "--to", "named", "--plural", "n"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--plural")
})

test("a key rename respells no string", () => {
  const said = refactor(
    ["rename", "property-slug", "--from", "text-property/slug", "--to", "named", "--in-strings"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--in-strings")
})

test("a page type rename respells no string", () => {
  const said = refactor(
    ["rename", "page-type", "--from", "seat", "--to", "chair", "--in-strings"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--in-strings")
})

test("a key rename takes no line", () => {
  const said = refactor(
    ["rename", "property-slug", "--from", "text-property/slug", "--to", "named", "--line", "3"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe("only a name rename takes --line")
})

test("a page type rename takes no line", () => {
  const said = refactor(
    ["rename", "page-type", "--from", "seat", "--to", "chair", "--plural", "chairs", "--line", "3"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe("only a name rename takes --line")
})

test("a name rename naming a line no body could carry is refused", () => {
  const said = refactor(
    [
      "rename",
      "token",
      "--at",
      "akasha/one.module.code.ts",
      "--from",
      "a",
      "--to",
      "b",
      "--line",
      "x",
    ],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--line takes the line a declaration starts on")
})

test("a rename takes the slug, what it becomes, and the plural it becomes", () => {
  const said = refactor(["rename", "page-type", "--from", "seat", "--to", "chair"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--plural")
})

test("a flag this does not take is refused rather than passed over", () => {
  const said = flagsIn(["--nowhere", "one"])
  expect("refused" in said && said.refused).toContain("is not a flag this takes")
})

test("a flag said twice is refused rather than the last winning", () => {
  const said = flagsIn(["--from", "one", "--from", "two"])
  expect("refused" in said && said.refused).toContain("said more than once")
})

test("a flag whose value the line never gives is refused", () => {
  const said = flagsIn(["--from"])
  expect("refused" in said && said.refused).toContain("needs a value")
})

test("the flags are read whatever order they stand in", () => {
  const said = flagsIn(["--dry-run", "--plural", "chairs", "--from", "seat", "--to", "chair"])
  expect("said" in said && said.dryRun).toBe(true)
  expect("said" in said && said.said.get("--from")).toBe("seat")
  expect("said" in said && said.said.get("--plural")).toBe("chairs")
})

test("the line a name is declared on is read off the flags", () => {
  const said = flagsIn(["--at", "akasha/one.module.code.ts", "--line", "288"])
  expect("said" in said && said.said.get("--line")).toBe("288")
})
