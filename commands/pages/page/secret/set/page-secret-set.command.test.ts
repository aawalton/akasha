import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { commitMessage } from "akasha/commands/arguments/pages/commit-message.argument.ts"
import { filePath } from "akasha/commands/arguments/pages/file-path.argument.ts"
import { keepLastNewline } from "akasha/commands/arguments/pages/keep-last-newline.argument.ts"
import { key } from "akasha/commands/arguments/pages/key.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { pageSecretSet } from "akasha/commands/pages/page/secret/set/page-secret-set.command.code.ts"
import { pageSecretSet as page } from "akasha/commands/pages/page/secret/set/page-secret-set.command.ts"
import { listedById } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const CALLED_AS = "akasha page secret set"

const ROOT = rootOf(process.cwd())

const GIVEN: Given = { root: ROOT, calledAs: CALLED_AS, from: ".", writer: null, agentId: null }

const PART = "argument/"

const PAGES: readonly Argument[] = [filePath, key, commitMessage, keepLastNewline]

type Declared = { readonly said: string; readonly required: boolean }

const DECLARED: readonly Declared[] = page.arguments.map((one) => {
  const slug = one.argument.slice(PART.length)
  const held = PAGES.find((each) => each.slug === slug)
  if (held === undefined) {
    throw new Error(`\`${one.argument}\` is declared by the page and no page here is named for it`)
  }
  return { said: held.said, required: "required" in one && one.required === true }
})

const REQUIRED = DECLARED.filter((one) => one.required)

const OPTIONAL = DECLARED.filter((one) => !one.required)

async function refusalsOf(argv: readonly string[]): Promise<readonly string[]> {
  const answer = await pageSecretSet(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

async function refusalOf(argv: readonly string[]): Promise<string> {
  return (await refusalsOf(argv)).join("\n")
}

test("each argument the page declares is one this test carries the argument page for", () => {
  expect(DECLARED.length).toBe(page.arguments.length)
  expect(REQUIRED.map((one) => one.said)).toEqual([filePath.said, key.said])
})

test("a flag this takes nothing of is refused, naming every argument it does take", async () => {
  const said = (await refusalsOf(["--nope", "x"]))[0] ?? ""
  expect(said).toContain("--nope")
  for (const one of DECLARED) expect(said).toContain(`\`${one.said}\``)
})

test("a word off any flag is refused rather than taken as a value", async () => {
  const said = (await refusalsOf(["hello"]))[0] ?? ""
  expect(said).toContain("hello")
  expect(said).toContain(`\`${filePath.said}\``)
})

test("every argument the page marks required is asked for by name when nothing says it", async () => {
  const said = await refusalsOf([])
  expect(said.length).toBe(REQUIRED.length)
  for (const one of REQUIRED) {
    expect(said.some((each) => each.includes(`\`${one.said}\``))).toBe(true)
  }
})

test("no argument the page leaves optional is asked for", async () => {
  const said = await refusalOf([])
  for (const one of OPTIONAL) expect(said).not.toContain(one.said)
})

test("an argument said twice is refused", async () => {
  const said = await refusalOf([key.said, "a", key.said, "b"])
  expect(said).toContain(`\`${key.said}\``)
  expect(said).toContain("twice")
})

test("an argument carrying a value is refused where no value follows it", async () => {
  const said = await refusalOf([filePath.said])
  expect(said).toContain(`\`${filePath.said}\``)
  expect(said).toContain("value")
})

test("an argument joined to an empty value is refused", async () => {
  const said = await refusalOf([`${filePath.said}=`, key.said, "a"])
  expect(said).toContain(`${filePath.said}=`)
})

test("the argument carrying no value is refused one", async () => {
  const said = await refusalOf([`${keepLastNewline.said}=x`, filePath.said, "a.ts", key.said, "a"])
  expect(said).toContain(`\`${keepLastNewline.said}\``)
  expect(said).toContain("carries no value")
})

const NOWHERE = "commands/pages/page/secret/set/nowhere.command.ts"

test("the path taken is the path the page is looked for at", async () => {
  const said = await refusalOf([filePath.said, NOWHERE, key.said, "alpha"])
  expect(said).toContain(NOWHERE)
})

const AT = listedById(ROOT, page.id)?.path ?? ""

test("the key taken is weighed against the secrets the page's page type declares", async () => {
  expect(AT).not.toBe("")
  const said = await refusalOf([filePath.said, AT, key.said, "zzz-no-such-secret"])
  expect(said).toContain("zzz-no-such-secret")
  expect(said).toContain(AT)
})

test("the message a call names is taken rather than refused as no argument", async () => {
  const said = await refusalOf([
    filePath.said,
    NOWHERE,
    key.said,
    "alpha",
    commitMessage.said,
    "carrying one secret",
  ])
  expect(said).not.toContain(commitMessage.said)
  expect(said).toContain(NOWHERE)
})
