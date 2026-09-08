import { textIn } from "@akasha/indexes/indexing/testing"
import { stating } from "../change-answer/change-answer.module.code.ts"
import type { Answer } from "../change-answer/change-answer.module.types.ts"
import { worldAt } from "../change-shadow/change-shadow.module.code.ts"
import { guardedBy } from "./change-guarding.module.code.ts"
import type { Guard } from "./change-guarding.module.types.ts"

export function tookAway(root: string, path: string, guards: readonly Guard[]): Answer {
  const was = textIn(root)(path) ?? ""
  return guardedBy(worldAt(root, textIn(root)), stating([{ kind: "remove", path }]), guards)
}
