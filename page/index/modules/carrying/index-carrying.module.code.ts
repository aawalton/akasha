import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { indexAt } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { carriedFiled } from "akasha/page/modules/carried/page-carried.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { referencesFiled } from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { shapesFiled } from "akasha/page/type/page-property/modules/property-shape/property-shape.module.code.ts"

const INDEX = "index"

const NAME = "name"

const TRACKED = "tracked"

export type Carried = {
  readonly edits: readonly FileChange[]
  readonly said: readonly string[]
}

const NOTHING_CARRIED: Carried = { edits: [], said: [] }

export function heldByGit(shadow: Shadow): readonly string[] {
  const found: string[] = []
  for (const listed of shadow.index.everyOfType(INDEX)) {
    const value = shadow.pageOf(listed.path)
    if (value === null || value[TRACKED] !== true) continue
    const name = value[NAME]
    if (typeof name === "string") found.push(indexAt(name))
  }
  return found.sort()
}

export function carriedOver(change: Change, shadow: Shadow): Carried {
  const under = heldByGit(shadow).map((one) => `${one}/`)
  const edits: FileChange[] = []
  for (const [path, body] of shadow.filed()) {
    const shapes = shapesFiled(path)
    const beside = referencesFiled(path) || carriedFiled(path) || shapes
    if (!beside && !under.some((one) => path.startsWith(one))) continue
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

export function filingsFor(change: Change): Carried {
  try {
    const cast = shadowFor(change)
    if ("refused" in cast) return NOTHING_CARRIED
    return carriedOver(change, cast.shadow)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return { edits: [], said: [`no index answer was carried — ${why}`] }
  }
}
