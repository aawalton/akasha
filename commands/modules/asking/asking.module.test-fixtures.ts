import { cpSync, existsSync, rmSync } from "node:fs"
import { join } from "node:path"
import { noImportersFiled, pageFiled } from "@akasha/indexes/testing"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { appendEdits } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import type { Phase } from "akasha/checks/modules/checking/checking.module.code.ts"
import { agentPathOf } from "akasha/context/modules/warranting/warranting.module.code.ts"
import { warrantsSeeded } from "akasha/context/modules/warranting/warranting.module.test-fixtures.ts"
import { bytesOf as bytes } from "akasha/testing-system/bodying/bodying.module.code.ts"
import {
  ADMITS_CODE,
  MINTED,
  mintedId,
  minting,
} from "akasha/testing-system/minting/minting.module.code.ts"
import { put } from "akasha/testing-system/putting/putting.module.code.ts"
import { said as gitIn } from "../../../git/running/git-running.module.code.ts"
import { applyWith } from "../apply-running/apply-running.module.code.ts"
import type { Answer, Given } from "../calling/calling.module.code.ts"
import { CHANGE_APPLY_PAGE } from "../change-costing/change-costing.module.code.ts"
import { appending, textIn } from "../change-running/change-running.module.code.ts"
import { builtIn } from "../file-arguing/file-arguing.module.code.ts"
import { inputIn } from "../piping/piping.module.code.ts"
import { blobIdOf, recordRead } from "../reading/reading.module.code.ts"
import { rootOf } from "../rooting/rooting.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { mistaking } from "./asking.module.code.ts"

export const ADMITS_AT = "akasha/admits.code-check*"

export const REPO_AT = rootOf(import.meta.dir)

const TWO_AT = "akasha/two.ts"

export const UNLOADABLE_AT = "akasha/admits.code-check.code.ts"

export const PROPOSED = "proposed\n"

export const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

export const SEAT_AT = "akasha/seat-system/seats/pages/tester.seat.ts"

export const scratch = scratchWorld()

export const git = gitIn

const templates = new Map<string, string>()

function builtAt(root: string, named: Readonly<Record<string, string>>): string {
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) {
    put(root, path, body)
    recordRead(root, AGENT, { path, oid: blobIdOf(bytes(body)), seenAt: 1, carriedOid: null })
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  put(root, CHANGE_APPLY_PAGE, "export const changeApply = {}\n")
  put(root, ".git/info/exclude", `${ADMITS_AT}\n`)
  checking(root, "admits", ADMITS_CODE)
  warrantsSeeded(root)
  pageFiled(root, AGENT, SEAT_AT)
  noImportersFiled(root)
  return root
}

function templateFor(named: Readonly<Record<string, string>>): string {
  const key = JSON.stringify(named)
  const held = templates.get(key)
  if (held !== undefined && existsSync(held)) return held
  const at = builtAt(scratch.rootFor("akasha-asking-template-"), named)
  templates.set(key, at)
  return at
}

export function repoAt(root: string, named: Readonly<Record<string, string>>): string {
  cpSync(templateFor(named), root, { recursive: true })
  return root
}

export function repoWith(
  named: Readonly<Record<string, string>> = { "akasha/one.ts": "committed\n" }
): string {
  return repoAt(scratch.rootFor("akasha-asking-"), named)
}

function checksBroken(root: string): undefined {
  rmSync(join(root, UNLOADABLE_AT))
}

export function repoNoCheckLoads(): string {
  const root = repoWith()
  checksBroken(root)
  return root
}

export function checking(
  root: string,
  slug: string,
  body: string,
  phase: Phase = "patch"
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

export const bodyIn = (root: string): string => put(root, "body.txt", PROPOSED)

export function heldIn(root: string, path: string): string {
  return git(root, ["show", `HEAD:${path}`])
}

export function treeHolds(root: string, path: string): boolean {
  return git(root, ["ls-tree", "--name-only", "HEAD", path]).trim() === path
}

const APPLYING: Readonly<Record<string, string>> = {
  "--message": "message",
  "--break-the-glass": "break-the-glass",
}

const COMMITTED = "committed as "

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
  if (said.code !== 0) return said
  const then = await applyWith(applyingIn(argv), given)
  return { report: [...said.report, ...then.report], refusals: then.refusals, code: then.code }
}

const NO_AGENT_PAGE =
  "a patch is kept beside the page of the agent drafting it, and this call names no such page"

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
  const built = builtIn(argv, given, inputIn)
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

export function commitIn(root: string, said: Answer, pretty = "%B"): string {
  const line = said.report.find((one) => one.startsWith(COMMITTED))
  if (line === undefined) return ""
  return git(root, ["log", "-1", `--pretty=${pretty}`, line.slice(COMMITTED.length)])
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

export const holds = (root: string, path: string): boolean => existsSync(join(root, path))

export const applying = async (root: string): Promise<Answer> =>
  await applied(root, { report: [], refusals: [], code: 0 }, ["--message", "held"])

export function seeded(root: string): boolean {
  const held = [
    {
      kind: "replace" as const,
      path: "akasha/one.ts",
      contentFrom: "committed\n",
      contentTo: PROPOSED,
    },
  ]
  return !("why" in appendEdits(root, SEAT_AT, held))
}

export function reaching(held: number[]): () => undefined {
  return (): undefined => {
    held.push(1)
  }
}
