import { expect, test } from "bun:test"
import type { Leaf } from "akasha/alan/library/book-of-everything/seeded-draw/seeded-draw.module.code.ts"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import {
  alanLearnNext,
  sweepOf,
} from "akasha/commands/pages/alan/learn-next/alan-learn-next.command.code.ts"
import { alanLearnNext as page } from "akasha/commands/pages/alan/learn-next/alan-learn-next.command.ts"

const CALLED_AS = "akasha alan learn-next"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES = [json]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const UNOPENED: readonly Leaf[] = ["one", "two", "three", "four", "five"].map(
  (path): Leaf => ({ path, label: `the leaf called ${path}`, status: "unopened" })
)

const EVERY_ONE_OPENED: readonly Leaf[] = UNOPENED.map((one): Leaf => ({ ...one, status: "live" }))

const pathsOf = (leaves: readonly Leaf[]): readonly string[] => leaves.map((one) => one.path)

const nextRefusing = (argv: readonly string[]): readonly string[] => {
  const answer = alanLearnNext(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the JSON flag is the one argument the page names, and a call may leave it out", () => {
  expect(SAYS).toEqual([json.said])
  expect(page.arguments.length).toBe(1)
  expect(page.arguments[0]).not.toHaveProperty("required")
})

test("a flag this takes no argument at is refused, naming the one argument it takes", () => {
  const said = nextRefusing(["--nope"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("`--nope`")
  expect(said[0]).toContain(`\`${json.said}\``)
})

test("a word is refused here, where this takes no argument as a word", () => {
  const said = nextRefusing(["a-topic"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("`a-topic`")
  expect(said[0]).toContain(`\`${json.said}\``)
})

test("the JSON flag written with an equals is refused, carrying no value of its own", () => {
  const said = nextRefusing([`${json.said}=true`])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${json.said}\``)
  expect(said[0]).toContain("carries no value")
})

test("the JSON flag said twice is refused, though it carries nothing to choose between", () => {
  const said = nextRefusing([json.said, json.said])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${json.said}\``)
  expect(said[0]).toContain("twice")
})

test("the order the leaves are walked in is the same whichever leaves are opened", () => {
  const first = pathsOf(sweepOf(UNOPENED))

  expect(pathsOf(sweepOf(UNOPENED))).toEqual(first)
  expect(pathsOf(sweepOf(EVERY_ONE_OPENED))).toEqual(first)
})

test("the sweep walks every leaf once rather than dropping or repeating one", () => {
  const walked = pathsOf(sweepOf(UNOPENED))

  expect([...walked].sort()).toEqual([...pathsOf(UNOPENED)].sort())
})
