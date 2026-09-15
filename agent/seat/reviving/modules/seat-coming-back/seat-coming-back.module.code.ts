import { seatPathForName } from "akasha/agent/seat/page/modules/seat-reading/seat-reading.module.code.ts"
import { dataError } from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { landedMechanically } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { refusalsIn } from "akasha/command/modules/applying/applying.module.code.ts"
import { told } from "akasha/git/modules/running/git-running.module.code.ts"

const PUT = "change-mechanical-file/add-file"

const HEAD = "HEAD"

export interface Held {
  readonly at: string
  readonly commit: string
  readonly body: string
}

export type Landing = (
  done: string[],
  root: string,
  changes: readonly Asking[],
  message: string
) => ReturnType<typeof landedMechanically>

export function tookAway(root: string, path: string): string | null {
  const at = told(root, ["log", "--format=%H", "--diff-filter=D", "-1", HEAD, "--", path])
  const one = at === null ? "" : at.trim()
  return one === "" ? null : one
}

export function heldBefore(root: string, path: string): Held | null {
  const commit = tookAway(root, path)
  if (commit === null) return null
  const body = told(root, ["show", `${commit}^:${path}`])
  return body === null || body === "" ? null : { at: path, commit, body }
}

export function saidOfBack(name: string, commit: string): string {
  return `${name} comes back from ${commit}, the commit that took its page away`
}

export function noHistory(name: string): string {
  return (
    `\`${name}\` names no seat, and no commit here took a page of that name away, ` +
    "so there is nothing to bring back"
  )
}

export async function seatBackFromHistory(
  root: string,
  name: string,
  done: string[] = [],
  landing: Landing = landedMechanically
): Promise<Held | null> {
  const held = heldBefore(root, seatPathForName(name))
  if (held === null) return null
  const asked: readonly Asking[] = [{ at: PUT, given: { at: held.at, body: held.body } }]
  const refused = refusalsIn(await landing(done, root, asked, saidOfBack(name, held.commit)))
  if (refused.length > 0) throw dataError(refused.join("\n"))
  return held
}
