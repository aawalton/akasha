import { expect } from "bun:test"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { textIn } from "@akasha/code/body-text"
import { patchIn } from "akasha/agents/modules/patch-keeping/patch-keeping.module.code.ts"
import { bytesOf as bytes } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { said as gitSaid } from "../../../git/git-running/git-running.module.code.ts"
import type { Kind } from "../calling/calling.module.code.ts"
import { blobsIn, bodyOf } from "../patching/patching.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { writing } from "../scratching/scratching.module.test-fixtures.ts"
import { type Draft, drafted, type Running, runningIn } from "./drafting.module.code.ts"

export const PAGE = "akasha/seat-system/seat/seats/tester.seat.ts"
export const THEIRS = "akasha/seat-system/subagents/pages/tester-a1.subagent.ts"
export const ONE = "akasha/one.page.ts"
export const TWO = "akasha/two.page.ts"
export const BIN = "akasha/three.page.bin"
export const TEN = "a\nb\nc\nd\ne\nf\ng\nh\ni\nj\n"
export const MOVED = "akasha/moved/one.page.ts"
export const FAR = "akasha/far/one.page.ts"
export const NOT_TEXT = new Uint8Array([0xff, 0xfe, 0x01, 0x02])
export const ALSO_NOT_TEXT = new Uint8Array([0x80, 0x81, 0x03])
export const THEN_NOT_TEXT = new Uint8Array([0xc0, 0xaf, 0x07])

const WHO = ["-c", "user.email=t@t", "-c", "user.name=t", "-c", "commit.gpgsign=false"]

export const NOTHING_RUNS: Running = {
  checks: false,
  writerOwesReading: false,
  readersOweReading: false,
}

export const BOTH_RUN: Running = { checks: true, writerOwesReading: true, readersOweReading: true }

export const CHECKS_RUN: Running = {
  checks: true,
  writerOwesReading: false,
  readersOweReading: false,
}

export const RESTATED: Running = {
  checks: true,
  writerOwesReading: true,
  readersOweReading: false,
}

export const kindOf = (
  runsChecks: boolean,
  writerOwesReading: boolean,
  readersOweReading: boolean
): Kind => ({ slug: "held", runsChecks, writerOwesReading, readersOweReading })

export const scratch = scratchWorld()

function bytesOr(held: string | null): Uint8Array | null {
  return held === null ? null : bytes(held)
}

export function textOr(held: Uint8Array | null | undefined): string | null {
  return held === null || held === undefined ? null : textIn(held)
}

export function draft(path: string, was: string | null, body: string | null): Draft {
  return { path, was: bytesOr(was), body: bytesOr(body) }
}

export function landed(root: string, bodies: Readonly<Record<string, string>>): undefined {
  const paths = Object.keys(bodies)
  for (const path of paths) writing(root, path, bodies[path] ?? "")
  gitSaid(root, ["add", "--", ...paths])
  gitSaid(root, [...WHO, "commit", "-q", "-m", "landed", "--", ...paths])
}

export function landedBytes(root: string, path: string, body: Uint8Array): undefined {
  const at = join(root, path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
  gitSaid(root, ["add", "--", path])
  gitSaid(root, [...WHO, "commit", "-q", "-m", "landed", "--", path])
}

export function renamed(root: string, from: string, to: string, body: string): undefined {
  rmSync(join(root, from))
  writing(root, to, body)
  gitSaid(root, ["add", "-A", "--", from, to])
  gitSaid(root, [...WHO, "commit", "-q", "-m", "moved", "--", from, to])
}

export function repoAt(): string {
  const root = scratch.rootFor("drafting-")
  gitSaid(root, ["init", "-q", "-b", "main", "."])
  landed(root, { [ONE]: TEN })
  return root
}

export function swapped(was: string, from: string, to: string): string {
  return was.replace(`${from}\n`, `${to}\n`)
}

export function refs(root: string): string {
  return gitSaid(root, ["for-each-ref", "--format=%(refname)", "refs/akasha/patch"])
}

export function folding(root: string, running: Running, next: Running | null): Running {
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))], running)
  if (next !== null) drafted(root, PAGE, [draft(TWO, null, "fresh\n")], next)
  return runningIn(patchIn(root, PAGE))
}

export function draftedBytes(root: string, path: string): Uint8Array | null {
  const patch = patchIn(root, PAGE)
  if (patch === null) return null
  const blobs = blobsIn(patch).get(path)
  return blobs === undefined ? null : bodyOf(root, blobs.result)
}

export function draftedBody(root: string, path: string): string | null {
  return textOr(draftedBytes(root, path))
}

export function clashing(root: string): undefined {
  drafted(root, PAGE, [draft(ONE, TEN, swapped(TEN, "b", "B"))])
  landed(root, { [ONE]: swapped(TEN, "b", "X") })
  const said = drafted(root, PAGE, [draft(TWO, null, "fresh\n")])
  if ("why" in said) throw new Error(said.why)
  expect(said.clashed).toEqual([ONE])
}
