import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  linesFor,
  measureClosure,
  noPredicate,
  noSeed,
  thereAre,
} from "akasha/command/pages/measure/closure/measure-closure.command.code.ts"
import { measureClosure as page } from "akasha/command/pages/measure/closure/measure-closure.command.ts"
import { valuedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

const CALLED_AS = "akasha measure closure"

const ARGUMENT = "argument"

const NAMED = "performance"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const THERE: readonly string[] = ["importers", "imports"]

const SEED = valuedAt(REPO, ARGUMENT, NAMED).path

const NOWHERE = "nowhere/at/all.ts"

const A_MIB = 1024 * 1024

const SPENT = { cpuSeconds: 0.25, wallSeconds: 0.3, bytes: A_MIB }

const TOOK = { nodes: ["one", "two"], edges: [], stepsTo: new Map([["one", 0]]) }

const closureRefusing = (argv: readonly string[]): readonly string[] => {
  const answer = measureClosure(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("the page takes a predicate and its seeds, both as words", () => {
  expect(page.arguments.length).toBe(2)
  expect(page.arguments[0]?.argument).toBe("argument/predicate")
  expect(page.arguments[1]?.argument).toBe("argument/closure-seed")
  expect(page.arguments[1]?.repeats).toBe(true)
  expect(page.arguments.filter((one) => one.saidAs === "word").length).toBe(2)
})

test("a call naming no predicate is refused naming every predicate there is", () => {
  expect(thereAre(THERE)).toContain("the predicates there are")
  expect(thereAre(THERE)).toContain("imports")
})

test("a predicate there is takes no refusal, and a word naming none is refused", () => {
  expect(noPredicate("imports", THERE)).toEqual([])
  expect(noPredicate("nowhere", THERE)[0]).toContain("is no predicate")
})

test("a seed the checkout holds no file at is refused, and one it holds is not", () => {
  expect(noSeed([NOWHERE], () => null)[0]).toContain(NOWHERE)
  expect(noSeed([SEED], () => "")).toEqual([])
})

test("a call saying nothing is refused, naming both words it takes", () => {
  const said = closureRefusing([]).join("\n")
  expect(said).toContain("<slug>")
  expect(said).toContain("<seed>")
})

test("the first word is the predicate and every word after it is a seed", () => {
  const said = closureRefusing(["nowhere", NOWHERE]).join("\n")
  expect(said).toContain("`nowhere` is no predicate")
  expect(said).toContain(`\`${NOWHERE}\` is no file`)
})

test("a line says how many seeds, nodes and edges a closure took in beside what it cost", () => {
  const said = linesFor("imports", 1, TOOK, SPENT)
  expect(said[0]).toMatch(/^closure\s+seeds\s+nodes\s+edges\s+cpu\s+wall\s+mem$/)
  expect(said[1]).toMatch(/^imports\s+1\s+2\s+0\s+0\.250s\s+0\.300s\s+1\.0 MiB$/)
})

test("a run that noted no high-water mark draws its memory as a dash", () => {
  const said = linesFor("imports", 1, TOOK, { ...SPENT, bytes: null })
  expect(said[1]).toMatch(/\s-$/)
})

test("a closure answered from words says what it took in and what it cost", () => {
  const answer = measureClosure(["imports", SEED], GIVEN)
  expect(answer.refusals).toEqual([])
  expect(answer.report[0]).toMatch(/^closure\s+seeds\s+nodes\s+edges\s+cpu\s+wall\s+mem$/)
  expect(answer.report[1]).toMatch(/^imports\s+1\s+\d+\s+\d+\s+\d+\.\d{3}s\s+\d+\.\d{3}s\s+\S/)
})
