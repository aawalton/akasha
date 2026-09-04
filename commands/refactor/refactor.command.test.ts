import { expect, test } from "bun:test"
import { refactor } from "./refactor.command.code.ts"

const GIVEN = {
  root: "/nowhere-at-all",
  calledAs: "akasha refactor",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("an act this does not carry is refused with the ones it does", async () => {
  const said = await refactor(["reshape", "page-type"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`reshape` is no act this carries")
  expect(said.refusals[0]).toContain("`rename`")
  expect(said.refusals[0]).toContain("`retype`")
})

test("a retype takes the address a page is at and the page type it becomes", async () => {
  const said = await refactor(["retype", "--from", "module/one"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("a retype takes --from and --to")
})

test("a retype takes no plural, no line and no respelling inside strings", async () => {
  const said = ["--from", "module/one", "--to", "manifest"]
  const plural = await refactor(["retype", ...said, "--plural", "n"], GIVEN)
  expect(plural.refusals[0]).toContain("--plural")
  const line = await refactor(["retype", ...said, "--line", "3"], GIVEN)
  expect(line.refusals[0]).toBe("only a name rename takes --line")
  const strings = await refactor(["retype", ...said, "--in-strings"], GIVEN)
  expect(strings.refusals[0]).toBe("only a name rename takes --in-strings")
})

test("naming no act is refused with what to say", async () => {
  const said = await refactor([], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("rename page-type")
})

test("an act names the namespace it is worked over", async () => {
  const said = await refactor(["rename"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names the namespace it is worked over")
})

test("a namespace this does not carry is refused with the ones it does", async () => {
  const said = await refactor(["rename", "seat"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`seat` is not one of them")
  expect(said.refusals[0]).toContain("`page-type`")
  expect(said.refusals[0]).toContain("`property-slug`")
})

test("a key rename takes the property it is worked over and the key it becomes", async () => {
  const said = await refactor(["rename", "property-slug", "--from", "text-property/slug"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--to")
})

test("a key rename takes no plural", async () => {
  const said = await refactor(
    ["rename", "property-slug", "--from", "text-property/slug", "--to", "named", "--plural", "n"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--plural")
})

test("a key rename respells no string", async () => {
  const said = await refactor(
    ["rename", "property-slug", "--from", "text-property/slug", "--to", "named", "--in-strings"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--in-strings")
})

test("a page type rename respells no string", async () => {
  const said = await refactor(
    ["rename", "page-type", "--from", "seat", "--to", "chair", "--in-strings"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--in-strings")
})

test("a key rename takes no line", async () => {
  const said = await refactor(
    ["rename", "property-slug", "--from", "text-property/slug", "--to", "named", "--line", "3"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe("only a name rename takes --line")
})

test("a page type rename takes no line", async () => {
  const said = await refactor(
    ["rename", "page-type", "--from", "seat", "--to", "chair", "--plural", "chairs", "--line", "3"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe("only a name rename takes --line")
})

test("a name rename naming a line no body could carry is refused", async () => {
  const said = await refactor(
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

test("a rename takes the slug, what it becomes, and the plural it becomes", async () => {
  const said = await refactor(["rename", "page-type", "--from", "seat", "--to", "chair"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--plural")
})

test("a page slug rename takes the address a page is at and the slug it becomes", async () => {
  const said = await refactor(["rename", "page-slug", "--from", "module/one"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--to")
})

test("a page slug rename takes no plural", async () => {
  const said = await refactor(
    ["rename", "page-slug", "--from", "module/one", "--to", "two", "--plural", "n"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--plural")
})

test("a slug alone names no page, and a page type is sent to the act renaming one", async () => {
  const bare = await refactor(["rename", "page-slug", "--from", "one", "--to", "two"], GIVEN)
  expect(bare.code).toBe(1)
  expect(bare.refusals[0]).toContain("names no page type")
  const typed = await refactor(
    ["rename", "page-slug", "--from", "page-type/seat", "--to", "two"],
    GIVEN
  )
  expect(typed.code).toBe(1)
  expect(typed.refusals[0]).toContain("rename page-type")
})
