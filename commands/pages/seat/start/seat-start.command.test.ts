import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { account } from "akasha/commands/arguments/pages/account.argument.ts"
import { anthropicAuthToken } from "akasha/commands/arguments/pages/anthropic-auth-token.argument.ts"
import { anthropicBaseUrl } from "akasha/commands/arguments/pages/anthropic-base-url.argument.ts"
import { flex } from "akasha/commands/arguments/pages/flex.argument.ts"
import { initiative } from "akasha/commands/arguments/pages/initiative.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { persona } from "akasha/commands/arguments/pages/persona.argument.ts"
import { principal } from "akasha/commands/arguments/pages/principal.argument.ts"
import { promptFile } from "akasha/commands/arguments/pages/prompt-file.argument.ts"
import { role } from "akasha/commands/arguments/pages/role.argument.ts"
import { seatDomain } from "akasha/commands/arguments/pages/seat-domain.argument.ts"
import { seatModel } from "akasha/commands/arguments/pages/seat-model.argument.ts"
import { seatPrompt } from "akasha/commands/arguments/pages/seat-prompt.argument.ts"
import { startMode } from "akasha/commands/arguments/pages/start-mode.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { seatStart } from "akasha/commands/pages/seat/start/seat-start.command.code.ts"
import { seatStart as page } from "akasha/commands/pages/seat/start/seat-start.command.ts"
import { STATED_PARENT } from "akasha/seat-system/seat-stated-parent-refusal/seat-stated-parent-refusal.module.code.ts"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = {
  root: REPO,
  calledAs: "akasha seat start",
  from: REPO,
  writer: null,
  agentId: null,
}

const PART = "argument/"

const PAGES: readonly Argument[] = [
  json,
  startMode,
  promptFile,
  seatPrompt,
  persona,
  role,
  seatDomain,
  principal,
  flex,
  initiative,
  account,
  seatModel,
  anthropicBaseUrl,
  anthropicAuthToken,
]

const SPELLINGS: readonly string[] = page.arguments.map((one) => {
  const held = PAGES.find((each) => each.slug === one.argument.slice(PART.length))
  if (held === undefined) {
    throw new Error(`\`${one.argument}\` is declared and no page here is named for it`)
  }
  return held.said
})

const NAME = "scribe"

const OTHER = "quartermaster"

const ID = "0199a1b2-c3d4-7e5f-8091-a2b3c4d5e6f7"

const MISSPELLED = `${persona.said}-ish`

const TYPED_NAME = "SPELLS what the seat is"

const STATED_ABOVE = "AGENT_ID"

async function refusalsOf(argv: readonly string[]): Promise<readonly string[]> {
  const answer = await seatStart(argv, GIVEN)
  expect(answer.code).toBe(1)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

function says(said: readonly string[], held: string): boolean {
  return said.some((one) => one.includes(held))
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(SPELLINGS.length).toBe(page.arguments.length)
  expect(new Set(SPELLINGS).size).toBe(SPELLINGS.length)
})

test("a flag this takes nothing of is refused, naming every spelling in the order declared", async () => {
  const said = await refusalsOf([MISSPELLED])
  expect(said[0]).toContain(MISSPELLED)
  expect(said[0]).toContain(SPELLINGS.join("`, `"))
})

test("a lone word is read as a typed name", async () => {
  const said = await refusalsOf([NAME])
  expect(said[0]).toContain(TYPED_NAME)
  expect(says(said, NAME)).toBe(true)
})

test("a word typed before the flags is read as a typed name", async () => {
  const said = await refusalsOf([NAME, persona.said, "athena"])
  expect(said[0]).toContain(TYPED_NAME)
})

test("a word typed after the flags is read as a typed name too", async () => {
  const said = await refusalsOf([persona.said, "athena", NAME])
  expect(said[0]).toContain(TYPED_NAME)
})

test("a mistyped flag is refused as a flag rather than read as a name", async () => {
  const said = await refusalsOf([MISSPELLED, "athena"])
  expect(said.length).toBe(2)
  expect(says(said, TYPED_NAME)).toBe(false)
})

test("two words are refused each on their own rather than read as a name", async () => {
  const said = await refusalsOf([NAME, OTHER])
  expect(said.length).toBe(2)
  expect(says(said, TYPED_NAME)).toBe(false)
})

test("a stated parent is refused with the environment it is read from instead", async () => {
  const said = await refusalsOf([STATED_PARENT, ID, persona.said, "athena"])
  expect(said[0]).toContain(STATED_ABOVE)
  expect(says(said, TYPED_NAME)).toBe(false)
})

test("a parent stated with an equals sign is refused the same way", async () => {
  const said = await refusalsOf([`${STATED_PARENT}=${ID}`])
  expect(said[0]).toContain(STATED_ABOVE)
  expect(says(said, TYPED_NAME)).toBe(false)
})

test("a flag opening with one dash is no typed name", async () => {
  const said = await refusalsOf(["-x"])
  expect(says(said, TYPED_NAME)).toBe(false)
})

test("an argument carrying a value is refused where no value follows it", async () => {
  const said = await refusalsOf([persona.said])
  expect(said).toContain(`\`${persona.said}\` takes a value, and none follows it`)
})
