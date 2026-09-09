import { readFileSync } from "node:fs"
import { join } from "node:path"
import { everyPath } from "@akasha/indexes"
import { bodyOf } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { foundIn, runsFromText } from "./calculation-imports-only-types.code-check.decision.code.ts"

export function calculationImportsOnlyTypes(root: string): readonly Judged[] {
  const said: Judged[] = []
  for (const path of everyPath(root)) {
    if (!runsFromText(path)) continue
    const bytes = readFileSync(join(root, path))
    for (const reason of foundIn(path, bodyOf({ root, path, bytes }))) {
      said.push({ path, reason })
    }
  }
  return said
}
