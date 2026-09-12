import { expect, test } from "bun:test"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperErrorList } from "akasha/commands/pages/temper/error-list/temper-error-list.command.code.ts"

const SAYS = "is no whole number of nought or more"

const GIVEN: Given = {
  root: ".",
  calledAs: "akasha temper error-list",
  from: ".",
  writer: null,
  agentId: null,
}

test("a stale window that is no number at all is refused before a capture is read", async () => {
  const said = await temperErrorList(["--stale-after-hours", "abc"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(SAYS)
  expect(said.refusals.join("\n")).toContain("abc")
})

test("a stale window carrying a fraction is refused rather than rounded", async () => {
  const said = await temperErrorList(["--stale-after-hours", "1.5"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(SAYS)
})

test("a stale window under nought is refused rather than read as a window", async () => {
  const said = await temperErrorList(["--stale-after-hours", "-3"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(SAYS)
})

test("a flag this takes no argument for is refused before a capture is read", async () => {
  const said = await temperErrorList(["--outdated"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--outdated` is no argument")
})

test("the stale window said twice is refused rather than read as the first saying", async () => {
  const said = await temperErrorList(
    ["--stale-after-hours", "4", "--stale-after-hours", "8"],
    GIVEN
  )

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--stale-after-hours` is said twice")
})
