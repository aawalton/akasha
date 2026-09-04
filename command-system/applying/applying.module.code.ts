import { dropPatch, patchAt, patchIn } from "@akasha/agents/patch-keeping"
import type { Judging } from "@akasha/checks/judging"
import { said as gitSaid } from "@akasha/git/git-running"
import { formattingIn } from "../asking/asking.module.code.ts"
import { type Bodies, rebasedOnto } from "../drafting/drafting.module.code.ts"
import { type FileEdit, landing, type Refused } from "../landing/landing.module.code.ts"
import { dropBlobs } from "../patching/patching.module.code.ts"
import { blobIdOf, type Reading, readingIn, recordRead } from "../reading/reading.module.code.ts"

const BYTES = new TextEncoder()

const NO_PAGE = "a path that is no page keeps no patch"

const NO_PATCH = "no patch is kept for this agent, so nothing is there to apply"

const KEPT_AS_IT_WAS = "nothing was applied — the patch is as the patch was"

const CLASHED = "nothing was applied — a patch carrying a conflict does not apply"

export type Applied = {
  readonly base: string
  readonly landed: readonly string[]
  readonly formatted: readonly string[]
  readonly commit: string | null
}

function bytesOf(body: string | null): Uint8Array | null {
  return body === null ? null : BYTES.encode(body)
}

function editsOf(held: Bodies): readonly FileEdit[] {
  return [...held].map(([path, one]) => ({ path, body: bytesOf(one.body) }))
}

export function warrantedAgain(
  root: string,
  agentId: string,
  held: Bodies,
  moved: readonly string[]
): readonly string[] {
  const again: string[] = []
  for (const [path, one] of held) {
    if (moved.includes(path) || one.was === null) continue
    const oid = blobIdOf(BYTES.encode(one.was))
    recordRead(root, agentId, { path, oid, seenAt: Date.now(), mechanicalOid: null })
    again.push(path)
  }
  return again.sort()
}

function asReadOf(root: string, agentId: string, held: Bodies): readonly Reading[] {
  const out: Reading[] = []
  for (const path of held.keys()) {
    const seen = readingIn(root, agentId, path)
    if (seen !== null) out.push(seen)
  }
  return out
}

function recordedAsLanded(root: string, agentId: string, changes: readonly FileEdit[]): undefined {
  for (const one of changes) {
    if (one.body === null) continue
    recordRead(root, agentId, {
      path: one.path,
      oid: blobIdOf(one.body),
      seenAt: Date.now(),
      mechanicalOid: null,
    })
  }
}

export function applied(
  root: string,
  page: string,
  agentId: string | null,
  message: string,
  judging: Judging,
  writer: string | null = null
): Applied | Refused {
  const at = patchAt(page)
  if (at === null) return { refusals: [NO_PAGE] }
  const patch = patchIn(root, page)
  if (patch === null) return { refusals: [NO_PATCH] }
  const head = gitSaid(root, ["rev-parse", "HEAD"]).trim()
  const said = rebasedOnto(root, head, patch)
  if ("why" in said) return { refusals: [said.why, KEPT_AS_IT_WAS] }
  if (said.clashed.length > 0) {
    return {
      refusals: [
        ...said.clashed.map((one) => `${one} — the patch carries a conflict here`),
        CLASHED,
      ],
    }
  }
  const formatting = formattingIn(root, editsOf(said.held))
  if (agentId !== null) warrantedAgain(root, agentId, said.held, said.moved)
  const asRead = agentId === null ? [] : asReadOf(root, agentId, said.held)
  const done = landing(root, formatting.changes, message, judging, writer, head, asRead, [])
  if ("refusals" in done) return done
  if (agentId !== null) recordedAsLanded(root, agentId, formatting.changes)
  dropPatch(root, page)
  dropBlobs(root, at)
  return {
    base: done.base,
    landed: [...done.wrote, ...done.took].sort(),
    formatted: [...formatting.formatted].sort(),
    commit: done.commit,
  }
}
