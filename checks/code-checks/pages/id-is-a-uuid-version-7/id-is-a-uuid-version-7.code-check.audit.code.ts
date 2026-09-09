import { readFileSync } from "node:fs"
import { join } from "node:path"
import { everyPath } from "@akasha/indexes"
import { bodyOf, textNamed } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { foundIn } from "./id-is-a-uuid-version-7.code-check.decision.code.ts"

export function idIsAUuidVersion7(root: string): readonly Judged[] {
  const said: Judged[] = []
  for (const path of everyPath(root)) {
    if (!textNamed(path)) continue
    const bytes = readFileSync(join(root, path))
    for (const reason of foundIn(path, bodyOf({ root, path, bytes }))) {
      said.push({ path, reason })
    }
  }
  return said
}
