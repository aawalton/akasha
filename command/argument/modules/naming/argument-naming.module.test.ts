import { afterAll, expect, test } from "bun:test"
import { argument } from "akasha/command/argument/argument.page-type.ts"
import { argumentsNamed } from "akasha/command/argument/modules/naming/argument-naming.module.code.ts"
import { dryRun as dryRunArgument } from "akasha/command/argument/pages/dry-run.argument.ts"
import { json as jsonArgument } from "akasha/command/argument/pages/json.argument.ts"
import { node as nodeArgument } from "akasha/command/argument/pages/node.argument.ts"
import {
  ANSWERS,
  argumentsFiled,
  rootWith,
  sweep,
} from "akasha/command/modules/calling/calling.module.test-fixtures.ts"

afterAll(sweep)

const JSON_LINE = {
  said: "--json",
  takes: "answer as JSON rather than as the lines a reader takes",
}

const DRY_RUN = { said: "--dry-run", takes: "judge what the act would land and write nothing" }

const NODE = { said: "--node", takes: "the node acted on, as the node table names it" }

const RULE = { said: "--rule", takes: "the rule acted on" }

const DRY_RUN_AT = `${argument.slug}/${dryRunArgument.slug}` as const

const JSON_AT = `${argument.slug}/${jsonArgument.slug}` as const

const NODE_AT = `${argument.slug}/${nodeArgument.slug}` as const

function rooted(): string {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  argumentsFiled(root, [
    { slug: "json", ...JSON_LINE },
    { slug: "dry-run", ...DRY_RUN },
    { slug: "node", ...NODE, placeholder: "id" },
    { slug: "rule", ...RULE },
    { slug: "unsaid" },
  ])
  return root
}

test("an argument taken at its flag is written down as that flag and its placeholder", () => {
  expect(argumentsNamed(rooted(), { arguments: [{ argument: NODE_AT }] })).toEqual([
    { said: "--node <id>", takes: NODE.takes },
  ])
})

test("an argument stating no placeholder is written down as its flag alone", () => {
  expect(argumentsNamed(rooted(), { arguments: [{ argument: "argument/rule" }] })).toEqual([RULE])
})

test("an argument taken as a word is written down as its placeholder alone", () => {
  const page = { arguments: [{ argument: NODE_AT, saidAs: "word" }] }
  expect(argumentsNamed(rooted(), page)).toEqual([{ said: "<id>", takes: NODE.takes }])
})

test("a word argument stating no placeholder is written down by its slug", () => {
  const page = { arguments: [{ argument: "argument/rule", saidAs: "word" }] }
  expect(argumentsNamed(rooted(), page)).toEqual([{ said: "<rule>", takes: RULE.takes }])
})

test("an argument taken either way is written down as a word and then at its flag", () => {
  const page = { arguments: [{ argument: NODE_AT, saidAs: "flag-or-word" }] }
  expect(argumentsNamed(rooted(), page)).toEqual([
    { said: "<id>", takes: NODE.takes },
    { said: "--node <id>", takes: NODE.takes },
  ])
})

test("an argument is read by the slug after the page type, as how it is said and what it is for", () => {
  expect(argumentsNamed(rooted(), { arguments: [{ argument: JSON_AT }] })).toEqual([JSON_LINE])
})

test("the arguments are answered in the order the command names them", () => {
  const page = { arguments: [{ argument: DRY_RUN_AT }, { argument: JSON_AT }] }
  expect(argumentsNamed(rooted(), page)).toEqual([DRY_RUN, JSON_LINE])
})

test("an argument name reaching no page is answered with nothing in its place", () => {
  const page = { arguments: [{ argument: "argument/nowhere" }, { argument: JSON_AT }] }
  expect(argumentsNamed(rooted(), page)).toEqual([JSON_LINE])
})

test("a page stating neither how it is said nor what it is for is no argument here", () => {
  expect(argumentsNamed(rooted(), { arguments: [{ argument: "argument/unsaid" }] })).toEqual([])
})

test("a command naming no argument is answered with none", () => {
  expect(argumentsNamed(rooted(), {})).toEqual([])
  expect(argumentsNamed(rooted(), null)).toEqual([])
})
