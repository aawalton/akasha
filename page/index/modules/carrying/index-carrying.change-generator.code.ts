import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { underIndex } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { referencesFiled } from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { shapesFiled } from "akasha/page/type/page-property/modules/property-shape/property-shape.module.code.ts"

type Carried = {
  readonly edits: readonly FileChange[]
  readonly said: readonly string[]
}

const NOTHING_CARRIED: Carried = { edits: [], said: [] }

export function carriedOver(change: Change, shadow: Shadow): Carried {
  const edits: FileChange[] = []
  for (const [path, body] of shadow.filed()) {
    const shapes = shapesFiled(path)
    const beside = referencesFiled(path) || shapes
    if (!beside && !underIndex(path)) continue
    const was = textOf(change.after(path))
    if (was === body) continue
    if (shapes && was === null) continue
    if (body === null) {
      edits.push({ kind: "remove", path })
      continue
    }
    edits.push(
      was === null
        ? { kind: "add", path, content: body }
        : { kind: "replace", path, contentFrom: was, contentTo: body }
    )
  }
  return { edits, said: [] }
}

export function generateChange(change: Change): Carried {
  try {
    const cast = shadowFor(change)
    if ("refused" in cast) return NOTHING_CARRIED
    return carriedOver(change, cast.shadow)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return { edits: [], said: [`no index answer was carried — ${why}`] }
  }
}
