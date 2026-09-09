import { resolveRoots, rootFor } from "@akasha/pages/checkout-roots"
import type { Asking } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"

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

const PUT = "change-mechanical-file/add-file"

const TAKE = "change-mechanical-file/remove-file"

function rootOf(act: GatedAct): string {
  return act.root ?? rootFor(resolveRoots(), act.repo)
}

async function landing(act: GatedAct, asked: readonly Asking[]): Promise<Landed> {
  if (asked.length === 0) return { ok: true, sha: null, unpushed: null }
  const said = await runMechanicalChange(rootOf(act), asked, act.message)
  if ("refusals" in said) return { ok: false, why: said.refusals.join("\n") }
  if (said.wrong.length > 0) return { ok: false, why: said.wrong.join("\n") }
  return { ok: true, sha: said.commit, unpushed: null }
}

export async function landBodies(
  act: GatedAct,
  bodies: readonly GatedBody[],
  removing: readonly string[] = []
): Promise<Landed> {
  return await landing(act, [
    ...bodies.map((one): Asking => ({ at: PUT, given: { at: one.relPath, body: one.body } })),
    ...removing.map((relPath): Asking => ({ at: TAKE, given: { at: relPath } })),
  ])
}

export async function landRemovals(act: GatedAct, relPaths: readonly string[]): Promise<Landed> {
  return await landing(
    act,
    relPaths.map((relPath): Asking => ({ at: TAKE, given: { at: relPath } }))
  )
}
