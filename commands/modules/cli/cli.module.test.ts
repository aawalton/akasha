import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  DATA,
  INPUT,
  OK,
  UNCLASSIFIED,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { answering, outsideOf, saidOf } from "akasha/commands/modules/cli/cli.module.code.ts"
import { COMMAND_TYPE_AT } from "akasha/commands/modules/cli/cli.module.test-fixtures.ts"
import {
  CLAUDE_AUTHOR,
  forgetCommitAuthor,
} from "akasha/commands/modules/commit-author/commit-author.module.code.ts"
import { MARKED } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { indexNamed } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

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
  forgetCommitAuthor()
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
  const said = await answering([], { AKASHA_ROOT: "/nowhere-at-all" }, AT, "/nowhere")
  expect(said.code).toBe(INPUT)
  expect(said.err[0]).toContain("takes a command")
})

test("a name no command carries is a caller's mistake too", async () => {
  const root = scratch.rootFor("akasha-cli-")
  listedFiled(root, COMMAND, "read", [{ path: "akasha/r.command.ts", id: ID }])
  valueAlsoFiled(root, COMMAND, [
    { path: "akasha/r.command.ts", value: { id: ID, pageTypeSlug: COMMAND, slug: "read" } },
  ])
  idFiled(root, COMMAND_TYPE, [{ path: COMMAND_TYPE_AT, id: COMMAND_TYPE }])
  const said = await answering(["held"], { AKASHA_ROOT: root }, AT, "/nowhere")
  expect(said.code).toBe(INPUT)
  expect(said.err[0]).toContain("is no command akasha carries")
})

test("a name looked for where there is no index says nothing was read, not that none is carried", async () => {
  const said = await answering(["held"], { AKASHA_ROOT: "/nowhere-at-all" }, AT, "/nowhere")
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
  const said = await answering([], hostile, AT, "/nowhere")
  expect(said.code).toBe(UNCLASSIFIED)
  expect(said.err[0]).toStartWith("akasha: ")
})

test("the codes are the ones the outer cli uses", () => {
  expect(OK).toBe(0)
  expect(INPUT).toBe(1)
  expect(UNCLASSIFIED).toBe(70)
})
