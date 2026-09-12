import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import {
  measureLearning,
  type Reading,
  saidOf,
} from "akasha/commands/pages/measure/learning/measure-learning.command.code.ts"
import { measureLearning as page } from "akasha/commands/pages/measure/learning/measure-learning.command.ts"

const CALLED_AS = "akasha measure learning"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const ASKED = saidForPart([json], page.arguments[0]?.argument ?? "")

const learningRefusing = (argv: readonly string[]): readonly string[] => {
  const answer = measureLearning(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

const PARTS: readonly Reading[] = [
  { title: "Matter", coverage: 1.5, topics: 12 },
  { title: "Mind", coverage: 0.25, topics: 3 },
]

const WHOLE: Reading = { title: "Book of Everything", coverage: 0.875, topics: 120 }

test("the page declares one argument, the JSON flag, and this test carries its page", () => {
  expect(page.arguments.length).toBe(1)
  expect(ASKED).toBe(json.said)
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
})

test("a flag this takes nothing of is refused, naming the one argument it does take", () => {
  const said = learningRefusing(["--nope"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
  expect(said[0]).toContain(`\`${ASKED}\``)
})

test("a word off any flag is refused rather than read as a part to measure", () => {
  const said = learningRefusing(["all"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("`all`")
  expect(said[0]).toContain(`\`${ASKED}\``)
})

test("the JSON flag carries no value, so one joined to it is refused", () => {
  const said = learningRefusing([`${ASKED}=1`])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${ASKED}\``)
  expect(said[0]).toContain("carries no value")
})

test("the JSON flag said twice is refused, and one call says it once", () => {
  const said = learningRefusing([ASKED, ASKED])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("twice")
})

test("the rows are padded into columns rather than parted by a mark", () => {
  const lines = saidOf(PARTS, WHOLE)
  const heading = lines[2] ?? ""
  expect(heading).toContain("Coverage")
  expect(heading).toContain("Topics")
  expect(lines.join("\n")).not.toContain("\t")
  expect(lines.join("\n")).not.toContain("|")
})

test("a reading is written to two places, so a coverage of one and a half reads as 1.50", () => {
  const lines = saidOf(PARTS, WHOLE)
  expect(lines[3]).toContain("1.50")
  expect(lines[4]).toContain("0.25")
})

test("the last row is the whole book rather than a part, with a blank line before it", () => {
  const lines = saidOf(PARTS, WHOLE)
  expect(lines.at(-1)).toContain(WHOLE.title)
  expect(lines.at(-2)).toBe("")
})
