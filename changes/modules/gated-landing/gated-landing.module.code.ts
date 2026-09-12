import type { Asking } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { landedMechanically } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { partWay } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { resolveRoots, rootFor } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"

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

function alsoLanded(done: readonly string[]): string {
  return partWay(done)
    .map((one) => `\n${one}`)
    .join("")
}

async function landing(act: GatedAct, asked: readonly Asking[]): Promise<Landed> {
  if (asked.length === 0) return { ok: true, sha: null, unpushed: null }
  const done: string[] = []
  let said: Awaited<ReturnType<typeof landedMechanically>>
  try {
    said = await landedMechanically(done, rootOf(act), asked, act.message)
  } catch (thrown) {
    return { ok: false, why: `${whyOf(thrown)}${alsoLanded(done)}` }
  }
  if ("refusals" in said) return { ok: false, why: said.refusals.join("\n") }
  if (said.wrong.length > 0) {
    return { ok: false, why: `${said.wrong.join("\n")}${alsoLanded(done)}` }
  }
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
