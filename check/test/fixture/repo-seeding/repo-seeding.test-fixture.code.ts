import { cpSync, existsSync } from "node:fs"
import { blobIdOf, recordRead } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.types.ts"
import type { Phase } from "akasha/check/modules/checking/checking.module.code.ts"
import { bytesOf as bytes } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import {
  ADMITS_CODE,
  MINTED,
  mintedId,
  minting,
} from "akasha/check/test/fixture/minting/minting.test-fixture.code.ts"
import { put } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import { answeredWith, OK } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { applyWith } from "akasha/command/modules/apply-running/apply-running.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { CHANGE_APPLY_SLUG } from "akasha/command/modules/change-costing/change-costing.module.code.ts"
import {
  appending,
  textIn,
} from "akasha/command/modules/change-running/change-running.module.code.ts"
import { builtIn } from "akasha/command/modules/file-arguing/file-arguing.module.code.ts"
import { inputIn } from "akasha/command/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { agentPathOf } from "akasha/domain/context/modules/warranting/warranting.module.code.ts"
import { warrantsSeeded } from "akasha/domain/context/modules/warranting/warranting.module.test-fixtures.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/modules/filing/index-filing.module.code.ts"
import { pageFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { INDEX_AT } from "akasha/page/index/modules/surface/index-surface.module.code.ts"

export const ADMITS_AT = "akasha/admits.check-code*"

export const REPO_AT = rootOf(import.meta.dir)

const TWO_AT = "akasha/two.ts"

export const PROPOSED = "proposed\n"

export const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

const SEAT_AT = "akasha/agent/seat/pages/tester.seat.ts"

const SEAT = "seat"

const TESTER = "tester"

const ADMITS = "admits"

const COMMAND = "command"

const APPLY_AT = "akasha/change-apply.command.ts"

const APPLY_ID = "01a04a4a-0002-7000-8000-00000000000b"

export const scratch = scratchWorld()

export const git = gitIn

const EXCLUDE_AT = ".git/info/exclude"

export function excludingIndex(root: string, said = ""): undefined {
  put(root, EXCLUDE_AT, `${said}${INDEX_AT}/\n`)
}

const templates = new Map<string, string>()

function builtAt(root: string, named: Readonly<Record<string, string>>): string {
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) put(root, path, body)
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  put(root, APPLY_AT, "export const changeApply = {}\n")
  excludingIndex(root, `${ADMITS_AT}\n`)
  checking(root, ADMITS, ADMITS_CODE)
  warrantsSeeded(root)
  pageFiled(root, AGENT, SEAT_AT)
  listedFiled(root, SEAT, TESTER, [{ path: SEAT_AT, id: AGENT }])
  valueAlsoFiled(root, SEAT, [
    { path: SEAT_AT, value: { id: AGENT, pageTypeSlug: SEAT, slug: TESTER } },
  ])
  listedFiled(root, COMMAND, CHANGE_APPLY_SLUG, [{ path: APPLY_AT, id: APPLY_ID }])
  for (const [path, body] of Object.entries(named)) {
    recordRead(root, AGENT, { path, oid: blobIdOf(bytes(body)), seenAt: 1, carriedOid: null })
  }
  return root
}

function templateFor(named: Readonly<Record<string, string>>): string {
  const key = JSON.stringify(named)
  const held = templates.get(key)
  if (held !== undefined && existsSync(held)) return held
  const at = builtAt(scratch.rootFor("akasha-repo-seeding-template-"), named)
  templates.set(key, at)
  return at
}

function repoAt(root: string, named: Readonly<Record<string, string>>): string {
  cpSync(templateFor(named), root, { recursive: true })
  return root
}

export function repoWith(
  named: Readonly<Record<string, string>> = { "akasha/one.ts": "committed\n" }
): string {
  return repoAt(scratch.rootFor("akasha-repo-seeding-"), named)
}

export function checking(
  root: string,
  slug: string,
  body: string,
  phase: Phase = "change"
): undefined {
  minting(root, slug, mintedId(slug), MINTED, body, phase)
}

export const REFUSES_TAKING =
  "export function refusesTaking(change) {\n" +
  "  return change.changed\n" +
  "    .filter((path) => change.after(path) === null)\n" +
  '    .map((path) => ({ path, reason: "a check judged this going away" }))\n' +
  "}\n"

export const givenIn = (root: string) => ({
  root,
  calledAs: "akasha change apply",
  from: root,
  writer: null,
  agentId: AGENT,
})

const APPLYING: Readonly<Record<string, string>> = {
  "--message": "message",
  "--break-the-glass": "break-the-glass",
}

function applyingIn(argv: readonly string[]): Readonly<Record<string, string>> {
  const said: Record<string, string> = {}
  for (const [at, one] of argv.entries()) {
    const key = APPLYING[one]
    if (key !== undefined) said[key] = argv[at + 1] ?? ""
  }
  return said
}

export async function applied(
  root: string,
  said: Answer,
  argv: readonly string[] = [],
  given: Given = givenIn(root)
): Promise<Answer> {
  if (said.code !== OK) return said
  const then = await applyWith(applyingIn(argv), given)
  return answeredWith([...said.report, ...then.report], then.refusals, then.code)
}

const NO_AGENT_PAGE =
  "the edits are kept beside the page of the agent drafting them, and this call names no such page"

function rowsOver(root: string, changes: readonly FileChange[]): readonly FileChange[] {
  const held = textIn(root)
  return changes.map((one): FileChange => {
    if (one.kind !== "add") return one
    const was = held(one.path)
    if (was === null || was === "") return one
    return { kind: "replace", path: one.path, contentFrom: was, contentTo: one.content }
  })
}

export async function landedFrom(argv: readonly string[], given: Given): Promise<Answer> {
  const built = builtIn(argv, given, inputIn, null)
  if ("code" in built) return built
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null) return mistaking([NO_AGENT_PAGE])
  const edits = rowsOver(given.root, built.changes)
  return await appending(given.root, page, given.agentId, true, () =>
    Promise.resolve({ edits, refused: null })
  )
}

export async function wroteWith(
  root: string,
  argv: readonly string[],
  given: Given = givenIn(root)
): Promise<Answer> {
  return await applied(root, await landedFrom(argv, given), argv, given)
}

export async function drafting(
  root: string,
  said: readonly string[],
  body: string = PROPOSED,
  given: Given = givenIn(root)
): Promise<Answer> {
  const from = put(root, "body.txt", body)
  return await landedFrom(["--file-path", TWO_AT, "--content-file", from, ...said], given)
}

export async function wrote(
  root: string,
  said: readonly string[],
  body: string = PROPOSED,
  given: Given = givenIn(root)
): Promise<Answer> {
  return await applied(root, await drafting(root, said, body, given), said, given)
}

export const THREE_AT = "akasha/three.ts"
