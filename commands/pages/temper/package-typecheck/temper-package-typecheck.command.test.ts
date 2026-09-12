import { expect, test } from "bun:test"
import { DATA, INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperPackageTypecheck } from "akasha/commands/pages/temper/package-typecheck/temper-package-typecheck.command.code.ts"

const GIVEN: Given = {
  root: ".",
  calledAs: "akasha temper package-typecheck",
  from: ".",
  writer: null,
  agentId: null,
}

test("a flag this takes no argument for is refused before the compiler is run", () => {
  const said = temperPackageTypecheck(["--json"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--json` is no argument")
})

test("a word this takes no argument for is refused before the compiler is run", () => {
  const said = temperPackageTypecheck(["temper-alpha"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`temper-alpha` is no argument")
})

test("the checkout said twice is refused rather than read as the first saying", () => {
  const said = temperPackageTypecheck(["--code-root", "/nowhere", "--code-root", "/nowhere"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--code-root` is said twice")
})

test("a checkout holding no temper folder is refused rather than reported clean", () => {
  const said = temperPackageTypecheck(["--code-root", "/nowhere"], GIVEN)

  expect(said.code).toBe(DATA)
  expect(said.refusals.join("\n")).toContain("holds no temper/")
})
