import { textIn } from "@akasha/indexes/indexing/testing"
import { stating } from "../change-answer/change-answer.module.code.ts"
import type { Answer } from "../change-answer/change-answer.module.types.ts"
import { worldAt } from "../change-shadow/change-shadow.module.code.ts"
import { guardedBy } from "./change-guarding.module.code.ts"
import type { Guard } from "./change-guarding.module.types.ts"

export function heldAt(root: string, path: string): (one: string) => string | null {
  const text = textIn(root)
  return (one) => (one === path ? (text(one) ?? "export const held = 1\n") : text(one))
}

export function tookAway(root: string, path: string, guards: readonly Guard[]): Answer {
  return guardedBy(worldAt(root, heldAt(root, path)), stating([{ kind: "remove", path }]), guards)
}

export function carriedOff(
  root: string,
  pathFrom: string,
  pathTo: string,
  guards: readonly Guard[]
): Answer {
  return guardedBy(
    worldAt(root, heldAt(root, pathFrom)),
    stating([{ kind: "move", pathFrom, pathTo }]),
    guards
  )
}
