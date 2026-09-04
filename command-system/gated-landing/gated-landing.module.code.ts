import { resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { landedMechanically } from "../asking/asking.module.code.ts"

export type GatedRepo = "akasha"

export interface GatedBody {
  readonly relPath: string
  readonly body: string
}

export interface GatedAct {
  readonly repo: GatedRepo
  readonly writer: string
  readonly message: string
  readonly root?: string
}

export type Landed =
  | { readonly ok: true; readonly sha: string | null; readonly unpushed: string | null }
  | { readonly ok: false; readonly why: string }

interface Change {
  readonly path: string
  readonly body: Uint8Array | null
}

function rootOf(act: GatedAct): string {
  return act.root ?? rootFor(resolveRoots(), act.repo)
}

// The landing reports the commit in its own words. The older `commit: <sha>` line came from the
// ops-cli commands this no longer calls, and is read here too so an older report is still understood.
const COMMITTED = /(?:committed as|^commit:)\s+([0-9a-f]{7,40})/m

export function shaIn(output: string): string | null {
  const said = COMMITTED.exec(output)
  return said === null ? null : (said[1] as string)
}

// This runs on the workstation, so the bytes go into the landing in process rather than out to the
// pages service or through a command line. A body of null is how a landing is told to take a path
// away, so one call carries both what is written and what goes. A path is read against the root,
// so it is named relative to the root rather than absolute.
async function landing(act: GatedAct, changes: readonly Change[]): Promise<Landed> {
  if (changes.length === 0) return { ok: true, sha: null, unpushed: null }
  const said = await landedMechanically(rootOf(act), act.writer, changes, act.message)
  if (said.code !== 0) {
    return { ok: false, why: said.refusals.join("\n") || said.report.join("\n") }
  }
  return { ok: true, sha: shaIn(said.report.join("\n")), unpushed: null }
}

export function landBodies(
  act: GatedAct,
  bodies: readonly GatedBody[],
  removing: readonly string[] = []
): Landed {
  return landing(act, [
    ...bodies.map((one) => ({ path: one.relPath, body: new TextEncoder().encode(one.body) })),
    ...removing.map((relPath) => ({ path: relPath, body: null })),
  ])
}

export function landRemovals(act: GatedAct, relPaths: readonly string[]): Landed {
  return landing(
    act,
    relPaths.map((relPath) => ({ path: relPath, body: null }))
  )
}
