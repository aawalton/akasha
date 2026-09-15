import { stating } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { guardedBy } from "akasha/change/modules/guarding/change-guarding.module.code.ts"
import type { Guard } from "akasha/change/modules/guarding/change-guarding.module.types.ts"
import { worldAt } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { textIn } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

export function heldAt(root: string, path: string): (one: string) => string | null {
  const text = textIn(root)
  return (one) => (one === path ? (text(one) ?? "export const held = 1\n") : text(one))
}

export function moving(moves: readonly (readonly [string, string])[]): Answer {
  return stating(moves.map(([pathFrom, pathTo]) => ({ kind: "move", pathFrom, pathTo })))
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
