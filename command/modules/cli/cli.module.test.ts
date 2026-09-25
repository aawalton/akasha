import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  DATA,
  INPUT,
  OK,
  UNCLASSIFIED,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import {
  outsideOf,
  saidOf,
  scrubbedCode,
  unclassifying,
} from "akasha/command/modules/cli/cli.module.code.ts"
import { COMMAND_TYPE_AT } from "akasha/command/modules/cli/cli.module.test-fixtures.ts"
import { CLAUDE_AUTHOR } from "akasha/command/modules/commit-author/commit-author.module.code.ts"
import { MARKED } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { indexNamed } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import { LEFT_OUT } from "akasha/story/lore-disclosure/modules/lore-scrubbing/lore-scrubbing.module.code.ts"
import { ASKED } from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"
import {
  GAME_MASTER_SEAT,
  LORE_AT,
  loreWorld,
  OTHER_SEAT,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.test-fixtures.ts"

const HELD_FACT = "Seven lanterns burn beneath the northern tide"

const COMMAND = "command"

const COMMAND_TYPE = "01a04bdd-596d-7b81-9204-1a882f474a5f"

const ID = "01a04bf0-0000-7000-8000-00000000bbbb"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const ROOT_AT = scratch.rootFor("akasha-cli-")

writeFileSync(join(ROOT_AT, MARKED), "")

const AT = join(ROOT_AT, "thrumming/cli/thrum-cli.module.code.ts")

test("the root a call is answered against is the one rooting reads", () => {
  expect(outsideOf({}, AT, "/nowhere").root).toBe(ROOT_AT)
})

test("the writer a call carries is the one commit-author answers", () => {
  expect(outsideOf({}, AT, "/nowhere").writer).toBe(CLAUDE_AUTHOR)
})

test("an agent is nobody when nothing names one", () => {
  expect(outsideOf({}, AT, "/nowhere").agentId).toBeNull()
})

test("an empty named agent is treated as none named", () => {
  expect(outsideOf({ AGENT_ID: "" }, AT, "/nowhere").agentId).toBeNull()
})

test("a named agent is carried in", () => {
  expect(outsideOf({ AGENT_ID: "01a0-one" }, AT, "/nowhere").agentId).toBe("01a0-one")
})

test("a subagent acting under the seat that named it is the agent carried in", () => {
  const said = outsideOf({ AGENT_ID: "01a0-one", ACTING_AGENT_ID: "01a0-one--sub" }, AT, "/nowhere")
  expect(said.agentId).toBe("01a0-one--sub")
})

test("an acting name another seat's id begins is not the agent carried in", () => {
  const said = outsideOf({ AGENT_ID: "01a0-one", ACTING_AGENT_ID: "01a0-two--sub" }, AT, "/nowhere")
  expect(said.agentId).toBe("01a0-one")
})

test("an acting name with no seat named names nobody", () => {
  expect(outsideOf({ ACTING_AGENT_ID: "01a0-one--sub" }, AT, "/nowhere").agentId).toBeNull()
})

test("the name it was invoked by is carried in", () => {
  const said = outsideOf({}, AT, "/nowhere")
  expect(said.calledAs).toBe("akasha")
  expect(said.from).toBe("/nowhere")
})

test("what was done and what refused it are answered apart", () => {
  const said = saidOf({ report: ["wrote one"], refusals: ["refused two"], code: INPUT })
  expect(said.out).toEqual(["wrote one"])
  expect(said.err).toEqual(["refused two"])
  expect(said.code).toBe(INPUT)
})

test("naming no command is a caller's mistake rather than an unclassified failure", async () => {
  const said = await unclassifying([], { AKASHA_ROOT: "/nowhere-at-all" }, AT, "/nowhere")
  expect(said.code).toBe(INPUT)
  expect(said.err[0]).toContain("takes a command")
})

test("a name no command carries is a caller's mistake too", async () => {
  const root = scratch.rootFor("akasha-cli-")
  listedFiled(root, COMMAND, "read", [{ path: "akasha/r.command.ts", id: ID }])
  valueAlsoFiled(root, COMMAND, [
    {
      path: "akasha/r.command.ts",
      value: { id: ID, type: `${pageType.slug}/${COMMAND}`, slug: "read" },
    },
  ])
  idFiled(root, COMMAND_TYPE, [{ path: COMMAND_TYPE_AT, id: COMMAND_TYPE }])
  const said = await unclassifying(["held"], { AKASHA_ROOT: root }, AT, "/nowhere")
  expect(said.code).toBe(INPUT)
  expect(said.err[0]).toContain("is no command akasha carries")
})

test("a name looked for where there is no index says nothing was read, not that none is carried", async () => {
  const said = await unclassifying(["held"], { AKASHA_ROOT: "/nowhere-at-all" }, AT, "/nowhere")
  expect(said.code).toBe(DATA)
  expect(said.err[0]).toContain("was looked for and not read")
  expect(said.err[0]).toContain(`No index is at \`${indexNamed()}\``)
  expect(said.err[0]).not.toContain("is no command akasha carries")
})

test("a failure of no known kind says so rather than claiming one", async () => {
  const hostile = {
    get AKASHA_ROOT(): string {
      throw new Error("the environment itself failed")
    },
  }
  const said = await unclassifying([], hostile, AT, "/nowhere")
  expect(said.code).toBe(UNCLASSIFIED)
  expect(said.err[0]).toStartWith("akasha: ")
})

function heldWorld(): { readonly root: string; readonly at: string } {
  const root = loreWorld(scratch)
  const lore = join(root, LORE_AT)
  mkdirSync(dirname(lore), { recursive: true })
  writeFileSync(lore, `export const sealed = { facts: ["${HELD_FACT}"] }\n`)
  const at = join(root, "thrumming/cli/thrum-cli.module.code.ts")
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(
    at,
    `console.log(${JSON.stringify(HELD_FACT)}); console.log(process.argv[2]); process.exit(4)\n`
  )
  return { root, at }
}

test("a call by no agent is not run again under the scrubber", async () => {
  const { root, at } = heldWorld()
  const sinks = { out: () => undefined, err: () => undefined }
  expect(await scrubbedCode(["held"], { AKASHA_ROOT: root }, at, sinks)).toBeNull()
})

test("a call by a seat that is no game master's is not run again under the scrubber", async () => {
  const { root, at } = heldWorld()
  const sinks = { out: () => undefined, err: () => undefined }
  const env = { AKASHA_ROOT: root, AGENT_ID: OTHER_SEAT }
  expect(await scrubbedCode(["held"], env, at, sinks)).toBeNull()
})

test("a game master's call is run again with the same words, and prints no withheld lore", async () => {
  const { root, at } = heldWorld()
  const out: string[] = []
  const err: string[] = []
  const sinks = { out: (text: string) => out.push(text), err: (text: string) => err.push(text) }
  const env = { AKASHA_ROOT: root, AGENT_ID: GAME_MASTER_SEAT }
  expect(await scrubbedCode(["held"], env, at, sinks)).toBe(4)
  expect(out.join("")).toBe(`${LEFT_OUT}\nheld\n`)
  expect(err.join("")).toContain(ASKED)
})

test("the codes are the ones the outer cli uses", () => {
  expect(OK).toBe(0)
  expect(INPUT).toBe(1)
  expect(UNCLASSIFIED).toBe(70)
})
