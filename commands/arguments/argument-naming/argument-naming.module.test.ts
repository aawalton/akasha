import { afterAll, expect, test } from "bun:test"
import { argumentsNamed } from "akasha/commands/arguments/argument-naming/argument-naming.module.code.ts"
import {
  ANSWERS,
  argumentsFiled,
  rootWith,
  sweep,
} from "akasha/commands/modules/calling/calling.module.test-fixtures.ts"

afterAll(sweep)

const JSON_LINE = {
  said: "--json",
  takes: "answer as JSON rather than as the lines a reader takes",
}

const DRY_RUN = { said: "--dry-run", takes: "judge what the act would land and write nothing" }

function rooted(): string {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  argumentsFiled(root, [
    { slug: "json", ...JSON_LINE },
    { slug: "dry-run", ...DRY_RUN },
    { slug: "unsaid" },
  ])
  return root
}

test("an argument is read by the slug after the page type, as how it is said and what it is for", () => {
  expect(argumentsNamed(rooted(), { arguments: [{ argument: "argument/json" }] })).toEqual([
    JSON_LINE,
  ])
})

test("the arguments are answered in the order the command names them", () => {
  const page = { arguments: [{ argument: "argument/dry-run" }, { argument: "argument/json" }] }
  expect(argumentsNamed(rooted(), page)).toEqual([DRY_RUN, JSON_LINE])
})

test("an argument name reaching no page is answered with nothing in its place", () => {
  const page = { arguments: [{ argument: "argument/nowhere" }, { argument: "argument/json" }] }
  expect(argumentsNamed(rooted(), page)).toEqual([JSON_LINE])
})

test("a page stating neither how it is said nor what it is for is no argument here", () => {
  expect(argumentsNamed(rooted(), { arguments: [{ argument: "argument/unsaid" }] })).toEqual([])
})

test("a command naming no argument is answered with none", () => {
  expect(argumentsNamed(rooted(), { taking: [] })).toEqual([])
  expect(argumentsNamed(rooted(), {})).toEqual([])
  expect(argumentsNamed(rooted(), null)).toEqual([])
})
