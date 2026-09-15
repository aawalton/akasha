import { afterAll, expect, test } from "bun:test"
import {
  DAY,
  HOUR,
  sinceNow,
} from "akasha/check/modules/measuring/check-measuring.module.test-fixtures.ts"
import { saidForPart } from "akasha/command/argument/modules/taking/argument-taking.module.test-fixtures.ts"
import { runWindow } from "akasha/command/argument/pages/run-window.argument.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { measureChange } from "akasha/command/pages/measure/change/measure-change.command.code.ts"
import { measureChange as page } from "akasha/command/pages/measure/change/measure-change.command.ts"
import {
  CHANGE_AT,
  ONE,
  rowsInto,
  THREE,
  TWO,
} from "akasha/command/pages/measure/change/modules/change-measuring/change-measuring.module.test-fixtures.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const CALLED_AS = "akasha measure change"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const CHOSEN = saidForPart([runWindow], page.arguments[0]?.argument ?? "")

const NEITHER = "5y"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const changeRefusing = (argv: readonly string[]): readonly string[] => {
  const answer = measureChange(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("the page declares one argument, the window, and this test carries its page", () => {
  expect(page.arguments.length).toBe(1)
  expect(CHOSEN).toBe(runWindow.said)
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
})

test("a flag this takes nothing of is refused, naming the one argument it does take", () => {
  const said = changeRefusing(["--nope"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
  expect(said[0]).toContain(`\`${CHOSEN}\``)
})

test("a window said as a word in place is refused, since this takes it at a flag alone", () => {
  expect(page.arguments.filter((one) => "saidAs" in one).length).toBe(0)
  const said = changeRefusing(["30m"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("30m")
})

test("the window with no value after it is refused", () => {
  expect(changeRefusing([CHOSEN])[0]).toBe(`\`${CHOSEN}\` takes a value, and none follows it`)
})

test("the window joined to an empty value is refused rather than read as nothing", () => {
  expect(changeRefusing([`${CHOSEN}=`])[0]).toContain(`${CHOSEN}=`)
})

test("the window said twice is refused, and one call says it once", () => {
  const said = changeRefusing([CHOSEN, "5", CHOSEN, "10"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("twice")
})

test("a window that is neither a count of runs nor a period is refused once it is taken", () => {
  const said = changeRefusing([CHOSEN, NEITHER])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(NEITHER)
  expect(said[0]).toContain(`${CHOSEN} <count>`)
})

test("a call naming no window reads the runs of the past twenty-four hours", () => {
  const root = rowsInto(scratch.rootFor("measure-change-"), CHANGE_AT, [
    { runId: ONE, ran: "change-file", ranAt: sinceNow(HOUR) },
    { runId: TWO, ran: "add-file", ranAt: sinceNow(2 * HOUR) },
    { runId: THREE, ran: "move-file", ranAt: sinceNow(DAY + HOUR) },
  ])
  const said = measureChange([], { ...GIVEN, root }).report.join("\n")

  expect(said).toContain("change-file")
  expect(said).toContain("add-file")
  expect(said).not.toContain("move-file")
})
