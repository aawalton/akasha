import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { DATA } from "akasha/command/modules/answering/command-answering.module.code.ts"
import {
  unfresh,
  workedOnly,
} from "akasha/command/modules/change-freshness/change-freshness.module.code.ts"
import {
  AGAIN_WRITTEN,
  type Landed,
  type Refused,
} from "akasha/command/modules/landing/landing.module.code.ts"
import { baseOf } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import type { Facing } from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"

export const REWORKED_AT_MOST = 5

type Worked = {
  readonly changes: readonly FileChange[]
  readonly facing: Facing | null
}

type Reworking<P extends Worked> = {
  readonly head: string
  readonly prepared: P
  readonly ended: Landed | Refused
}

function refusedIn<P extends Worked>(said: P | Refused): said is Refused {
  return "refusals" in said
}

function editedIn(changes: readonly FileChange[]): readonly string[] {
  return changes.flatMap((one) => (one.kind === "move" ? [] : [one.path]))
}

function staleOnlyWorked(ended: Landed | Refused): boolean {
  return "refusals" in ended && workedOnly(ended.refusals)
}

export async function reworked<P extends Worked>(
  root: string,
  first: Reworking<P>,
  preparedAt: (head: string) => P | Refused,
  landedOn: (head: string, prepared: P) => Promise<Landed | Refused>,
  most: number = REWORKED_AT_MOST
): Promise<Reworking<P>> {
  let held = first
  for (let tries = 0; tries < most && staleOnlyWorked(held.ended); tries++) {
    const head = baseOf(root)
    const prepared = preparedAt(head)
    if (refusedIn(prepared)) return { ...held, ended: prepared }
    const paths = editedIn(prepared.changes)
    const own = unfresh(root, first.head, head, paths, [], AGAIN_WRITTEN, prepared.facing)
    if (own !== null && !workedOnly(own)) {
      return { ...held, ended: { refusals: own, code: DATA, moved: true } }
    }
    held = { head, prepared, ended: await landedOn(head, prepared) }
  }
  return held
}
