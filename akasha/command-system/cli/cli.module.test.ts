import { afterAll, expect, test } from "bun:test"
import { appendFileSync, cpSync, readFileSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { indexNamed } from "@akasha/indexes"
import { idCopied, identitiesCopied, idFiled, listedFiled } from "@akasha/indexes/testing"
import { minting, REFUSES_CODE } from "@akasha/testing-system/minting"
import { ran as running } from "@akasha/utils-run/running"
import { AUTHOR } from "../committing/committing.module.code.ts"
import { rootOf } from "../rooting/rooting.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import {
  answering,
  DATA,
  INPUT,
  OK,
  OPERATIONAL,
  outsideOf,
  saidOf,
  UNCLASSIFIED,
} from "./cli.module.code.ts"

const AT = "/somewhere/akasha/command-system/cli.module.code.ts"

const DISPATCHER = "akasha/command-system/cli/cli.module.code.ts"

const CHECKING_AT = "akasha/checks/modules/checking/checking.module.code.ts"

const COMMAND = "command"

const COMMAND_TYPE = "01a04bdd-596d-7b81-9204-1a882f474a5f"

const CARRIED = ["package.json", "tsconfig.json", "tsconfig.base.json"]

const ID = "01a04bf0-0000-7000-8000-00000000bbbb"

const EDITED_AT = "akasha/edited.ts"

const EDITED = "export const edited = 1;\n\nexport const beside = 1;\n"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function checkoutOf(): string {
  const from = rootOf(import.meta.path)
  const root = scratch.rootFor("akasha-cli-")
  cpSync(join(from, "akasha"), join(root, "akasha"), { recursive: true })
  for (const one of CARRIED) cpSync(join(from, one), join(root, one))
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  minting(root, "refuses", ID, "a check refusing everything", REFUSES_CODE)
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  symlinkSync(join(from, "node_modules"), join(root, "node_modules"))
  identitiesCopied(from, root, COMMAND)
  idCopied(from, root, COMMAND_TYPE)
  return root
}

function ran(
  root: string,
  argv: readonly string[],
  stdin?: Uint8Array
): { readonly said: string; readonly code: number } {
  const held = running([process.execPath, join(root, DISPATCHER), ...argv], {
    cwd: root,
    env: { ...process.env, AKASHA_ROOT: root },
    ...(stdin === undefined ? {} : { stdin }),
  })
  return { said: `${held.out}${held.err}`, code: held.code }
}

function heredoc(
  root: string,
  argv: readonly string[],
  body: string
): { readonly said: string; readonly code: number } {
  const named = [process.execPath, join(root, DISPATCHER), ...argv]
    .map((one) => `'${one.replaceAll("'", "'\\''")}'`)
    .join(" ")
  const held = running(["bash", "-c", `${named} <<'AKASHA'\n${body}AKASHA\n`], {
    cwd: root,
    env: { ...process.env, AKASHA_ROOT: root },
  })
  return { said: `${held.out}${held.err}`, code: held.code }
}

const GLASS = ["--break-the-glass", "the check minted for this checkout refuses everything"]

function bodyIn(root: string): string {
  writeFileSync(join(root, EDITED_AT), EDITED)
  git(root, ["add", "--", EDITED_AT])
  git(root, ["commit", "--quiet", "-m", "a body to edit", "--", EDITED_AT])
  return root
}

function stated(root: string, name: string, was: string, now: string): readonly string[] {
  const old = join(root, `${name}.old`)
  const put = join(root, `${name}.new`)
  writeFileSync(old, was)
  writeFileSync(put, now)
  return ["--old-file", old, "--new-file", put]
}

test("the glass carries a change past checks that cannot be loaded at all", () => {
  const root = checkoutOf()
  const from = join(root, "body.txt")
  writeFileSync(from, "export const held = 1\n")
  const naming = ["write", "--file-path", "akasha/held.ts", "--content-file", from]

  const judged = ran(root, [...naming, "--message", "held arrives"])
  expect(judged.code).toBe(OPERATIONAL)
  expect(judged.said).toContain("refused for the test")

  appendFileSync(join(root, CHECKING_AT), "export function judgedOver( {\n")
  git(root, ["commit", "--quiet", "-m", "the checks stop parsing", "--", CHECKING_AT])

  const gated = ran(root, [...naming, "--message", "held arrives"])
  expect(gated.code).toBe(OPERATIONAL)
  expect(gated.said).toContain(`the checks could not be loaded from ${CHECKING_AT}`)
  expect(gated.said).toContain("nothing was judged and nothing was written")

  const broke = ran(root, [
    ...naming,
    "--message",
    "held arrives",
    "--break-the-glass",
    "mid-refactor",
  ])
  expect(broke.code).toBe(OK)
  expect(broke.said).toContain("wrote akasha/held.ts")
  expect(broke.said).toContain("no check ran — the glass was broken for: mid-refactor")
  expect(broke.said).toContain(`from ${CHECKING_AT} either, so none could have run`)
  const body = git(root, ["log", "-1", "--pretty=%B"])
  expect(body).toContain("Checks-bypassed: mid-refactor")
  expect(body).toContain("Checks-unloadable: BuildMessage:")
}, 60000)

test("a substitution stated to the cli lands and says the path it edited", () => {
  const root = bodyIn(checkoutOf())

  const said = ran(root, [
    "edit",
    "--file-path",
    EDITED_AT,
    ...stated(root, "a", "export const edited = 1;", "export const edited = 2;"),
    "--message",
    "edited arrives",
    "--break-the-glass",
    "the check minted for this checkout refuses everything",
  ])
  expect(said.code).toBe(OK)
  expect(said.said).toContain(`edited ${EDITED_AT}`)
  expect(readFileSync(join(root, EDITED_AT), "utf8")).toBe(
    "export const edited = 2;\n\nexport const beside = 1;\n"
  )
  expect(git(root, ["log", "-1", "--pretty=%s"]).trim()).toBe("edited arrives")
}, 60000)

test("an edit is refused whole where the checks cannot be loaded at all", () => {
  const root = bodyIn(checkoutOf())
  appendFileSync(join(root, CHECKING_AT), "export function judgedOver( {\n")
  git(root, ["commit", "--quiet", "-m", "the checks stop parsing", "--", CHECKING_AT])

  const gated = ran(root, [
    "edit",
    "--file-path",
    EDITED_AT,
    ...stated(root, "a", "export const edited = 1;", "export const edited = 2;"),
    "--message",
    "edited arrives",
  ])
  expect(gated.code).toBe(OPERATIONAL)
  expect(gated.said).toContain(`the checks could not be loaded from ${CHECKING_AT}`)
  expect(gated.said).toContain("nothing was judged and nothing was written")
  expect(readFileSync(join(root, EDITED_AT), "utf8")).toBe(EDITED)
}, 60000)

test("a substitution naming no passage or more than one is refused by the cli", () => {
  const root = bodyIn(checkoutOf())

  const none = ran(root, [
    "edit",
    "--file-path",
    EDITED_AT,
    ...stated(root, "a", "export const nowhere = 1;", "export const nowhere = 2;"),
  ])
  expect(none.code).toBe(DATA)
  expect(none.said).toContain(`${EDITED_AT} — substitution 1 matches no passage`)

  const many = ran(root, ["edit", "--file-path", EDITED_AT, ...stated(root, "b", " = 1;", " = 2;")])
  expect(many.code).toBe(DATA)
  expect(many.said).toContain(`${EDITED_AT} — substitution 1 matches 2 passages`)

  expect(readFileSync(join(root, EDITED_AT), "utf8")).toBe(EDITED)
}, 60000)

test("a stated root wins over where the dispatcher stands", () => {
  const said = outsideOf({ AKASHA_ROOT: "/elsewhere" }, AT, "/nowhere")
  expect(said.root).toBe("/elsewhere")
})

test("an empty stated root is treated as none stated", () => {
  const said = outsideOf({ AKASHA_ROOT: "" }, AT, "/nowhere")
  expect(said.root).toBe("/somewhere")
})

test("a commit is authored by akasha when nothing states a writer", () => {
  expect(outsideOf({}, AT, "/nowhere").writer).toBe("Akasha <akasha@alanwalton.com>")
})

test("an empty stated writer is treated as none stated", () => {
  expect(outsideOf({ AKASHA_WRITER: "" }, AT, "/nowhere").writer).toBe(AUTHOR)
})

test("a stated writer wins over akasha", () => {
  const said = outsideOf({ AKASHA_WRITER: "Someone <one@two.three>" }, AT, "/nowhere")
  expect(said.writer).toBe("Someone <one@two.three>")
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
  idFiled(root, COMMAND_TYPE, [
    { path: "akasha/command-system/command/command.page-type.ts", id: COMMAND_TYPE },
  ])
  const said = await answering(["held"], { AKASHA_ROOT: root }, AT, "/nowhere")
  expect(said.code).toBe(INPUT)
  expect(said.err[0]).toContain("is no command akasha carries")
})

test("a name looked for where no index stands says nothing was read, not that none is carried", async () => {
  const said = await answering(["held"], { AKASHA_ROOT: "/nowhere-at-all" }, AT, "/nowhere")
  expect(said.code).toBe(INPUT)
  expect(said.err[0]).toContain("was looked for and not read")
  expect(said.err[0]).toContain(`No index stands at \`${indexNamed()}\``)
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

test("a body carried in by a heredoc lands as the bytes the shell never touched", () => {
  const root = checkoutOf()
  const body = 'export const piped = "$(id) `whoami`";\n'
  const said = heredoc(
    root,
    ["write", "--file-path", "akasha/piped.ts", "--message", "piped arrives", ...GLASS],
    body
  )
  expect(said.code).toBe(OK)
  expect(said.said).toContain("wrote akasha/piped.ts")
  expect(readFileSync(join(root, "akasha/piped.ts"), "utf8")).toBe(body)
}, 60000)

test("a marker payload carried in by a heredoc edits the file", () => {
  const root = bodyIn(checkoutOf())
  const said = heredoc(
    root,
    ["edit", "--file-path", EDITED_AT, "--message", "edited arrives", ...GLASS],
    "<<<<<<< old\nexport const edited = 1;\n=======\nexport const edited = 2;\n>>>>>>> new\n"
  )
  expect(said.code).toBe(OK)
  expect(said.said).toContain(`edited ${EDITED_AT}`)
  expect(readFileSync(join(root, EDITED_AT), "utf8")).toBe(
    "export const edited = 2;\n\nexport const beside = 1;\n"
  )
}, 60000)

test("a path named with nothing piped in is refused by the cli, showing the heredoc", () => {
  const root = bodyIn(checkoutOf())
  const written = ran(root, ["write", "--file-path", "akasha/piped.ts"])
  expect(written.code).toBe(INPUT)
  expect(written.said).toContain("nothing is piped in")
  expect(written.said).toContain("<<'EOF'")
  const edited = ran(root, ["edit", "--file-path", EDITED_AT])
  expect(edited.code).toBe(INPUT)
  expect(edited.said).toContain("nothing is piped in")
}, 60000)

test("a marker payload the cli cannot read is refused for what it is missing", () => {
  const root = bodyIn(checkoutOf())
  const at = ["edit", "--file-path", EDITED_AT]
  const piped = (said: string) => ran(root, at, new TextEncoder().encode(said))
  expect(piped("<<<<<<< old\nalpha\n>>>>>>> new\n").said).toContain("closed by no `=======`")
  expect(piped("<<<<<<< old\nalpha\n=======\nbeta\n").said).toContain("closed by no `>>>>>>> new`")
  expect(piped(">>>>>>> new\n").said).toContain("follows no `<<<<<<< old`")
  const one = ran(root, [...at, ...stated(root, "a", "1", "2")], new TextEncoder().encode("a\n"))
  expect(one.code).toBe(INPUT)
  expect(one.said).toContain("belongs to no path")
  expect(readFileSync(join(root, EDITED_AT), "utf8")).toBe(EDITED)
}, 60000)

test("akasha tells its own surface, and each command tells the flags it takes", () => {
  const root = checkoutOf()

  const listing = ran(root, ["--help"])
  expect(listing.code).toBe(OK)
  expect(listing.said).toContain("akasha carries these commands:")
  expect(listing.said).toContain("whole file bodies carried in")
  expect(listing.said).toContain("say `akasha <command> --help` for what one takes")

  const writing = ran(root, ["write", "--help"])
  expect(writing.code).toBe(OK)
  expect(writing.said).toContain("--content-file <file>")
  expect(writing.said).toContain("--break-the-glass <reason>")
  expect(writing.said).toContain("reads that body from standard input")

  const editing = ran(root, ["edit", "-h"])
  expect(editing.code).toBe(OK)
  expect(editing.said).toContain("--old-file <file>")
  expect(editing.said).toContain("--message <text>")
  expect(editing.said).toContain("reads its passages from standard input")
}, 60000)
