import { afterAll, expect, test } from "bun:test"
import { execFileSync, spawnSync } from "node:child_process"
import { appendFileSync, cpSync, mkdirSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  AUTHOR,
  answering,
  INPUT,
  OK,
  OPERATIONAL,
  outsideOf,
  rootOf,
  saidOf,
  UNCLASSIFIED,
} from "./cli.module.code.ts"
import { minting, REFUSES_CODE } from "./minting.module.code.ts"
import { scratchWorld } from "./scratching.module.code.ts"

const AT = "/somewhere/akasha/command-system/cli.module.code.ts"

const DISPATCHER = "akasha/command-system/cli.module.code.ts"

const CHECKING_AT = "akasha/checks-system/checking.module.code.ts"

const IDENTITY_AT = ".git/data/index/identity"

const CARRIED = ["package.json", "tsconfig.json", "tsconfig.base.json"]

const ID = "01a04bf0-0000-7000-8000-00000000bbbb"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function git(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], { encoding: "utf8" })
}

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
  cpSync(join(from, IDENTITY_AT, "command"), join(root, IDENTITY_AT, "command"), {
    recursive: true,
  })
  return root
}

function ran(
  root: string,
  argv: readonly string[]
): { readonly said: string; readonly code: number } {
  const held = spawnSync(process.execPath, [join(root, DISPATCHER), ...argv], {
    encoding: "utf8",
    cwd: root,
    env: { ...process.env, AKASHA_ROOT: root },
  })
  return { said: `${held.stdout}${held.stderr}`, code: held.status ?? UNCLASSIFIED }
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

test("the root is the folder two above the dispatcher when nothing states one", () => {
  expect(rootOf(AT)).toBe("/somewhere")
})

test("a stated root wins over where the dispatcher stands", () => {
  const said = outsideOf([], { AKASHA_ROOT: "/elsewhere" }, AT, "/nowhere")
  expect(said.root).toBe("/elsewhere")
})

test("an empty stated root is treated as none stated", () => {
  const said = outsideOf([], { AKASHA_ROOT: "" }, AT, "/nowhere")
  expect(said.root).toBe("/somewhere")
})

test("a commit is authored by akasha when nothing states a writer", () => {
  expect(outsideOf([], {}, AT, "/nowhere").writer).toBe("Akasha <akasha@alanwalton.com>")
})

test("an empty stated writer is treated as none stated", () => {
  expect(outsideOf([], { AKASHA_WRITER: "" }, AT, "/nowhere").writer).toBe(AUTHOR)
})

test("a stated writer wins over akasha", () => {
  const said = outsideOf([], { AKASHA_WRITER: "Someone <one@two.three>" }, AT, "/nowhere")
  expect(said.writer).toBe("Someone <one@two.three>")
})

test("an agent is nobody when nothing names one", () => {
  expect(outsideOf([], {}, AT, "/nowhere").agentId).toBeNull()
})

test("an empty named agent is treated as none named", () => {
  expect(outsideOf([], { AGENT_ID: "" }, AT, "/nowhere").agentId).toBeNull()
})

test("a named agent is carried in", () => {
  expect(outsideOf([], { AGENT_ID: "01a0-one" }, AT, "/nowhere").agentId).toBe("01a0-one")
})

test("the name it was invoked by is carried in", () => {
  const said = outsideOf([], {}, AT, "/nowhere")
  expect(said.calledAs).toBe("akasha")
  expect(said.from).toBe("/nowhere")
})

test("what was done and what refused it are answered apart", () => {
  const said = saidOf({ report: ["wrote one"], refusals: ["refused two"], code: INPUT })
  expect(said.out).toEqual(["wrote one"])
  expect(said.err).toEqual(["refused two"])
  expect(said.code).toBe(INPUT)
})

test("naming no command is a caller's mistake rather than an unclassified failure", () => {
  const said = answering([], { AKASHA_ROOT: "/nowhere-at-all" }, AT, "/nowhere")
  expect(said.code).toBe(INPUT)
  expect(said.err[0]).toContain("takes a command")
})

test("a name no command carries is a caller's mistake too", () => {
  const root = scratch.rootFor("akasha-cli-")
  const dir = join(root, IDENTITY_AT, "command", "slug")
  mkdirSync(dir, { recursive: true })
  writeFileSync(
    join(dir, "read.jsonl"),
    `${JSON.stringify({ path: "akasha/r.command.ts", id: ID })}\n`
  )
  const said = answering(["held"], { AKASHA_ROOT: root }, AT, "/nowhere")
  expect(said.code).toBe(INPUT)
  expect(said.err[0]).toContain("is no command akasha carries")
})

test("a name looked for where no index stands says nothing was read, not that none is carried", () => {
  const said = answering(["held"], { AKASHA_ROOT: "/nowhere-at-all" }, AT, "/nowhere")
  expect(said.code).toBe(INPUT)
  expect(said.err[0]).toContain("was looked for and not read")
  expect(said.err[0]).toContain("No index stands at `.git/data/index`")
  expect(said.err[0]).not.toContain("is no command akasha carries")
})

test("a failure of no known kind says so rather than claiming one", () => {
  const said = answering([], {}, undefined as unknown as string, "/nowhere")
  expect(said.code).toBe(UNCLASSIFIED)
  expect(said.err[0]).toStartWith("akasha: ")
})

test("the codes are the ones the outer cli uses", () => {
  expect(OK).toBe(0)
  expect(INPUT).toBe(1)
  expect(UNCLASSIFIED).toBe(70)
})

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

  const editing = ran(root, ["edit", "-h"])
  expect(editing.code).toBe(OK)
  expect(editing.said).toContain("--old-file <file>")
  expect(editing.said).toContain("--message <text>")
}, 60000)
