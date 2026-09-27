import {
  listedAnywhere,
  listedById,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Picking } from "akasha/page/service/modules/kinds-gathering/kinds-gathering.module.code.ts"
import type { Test } from "akasha/page/service/modules/where-testing/where-testing.module.code.ts"

const TYPE = "type"

const SLUG = "slug"

const ID = "id"

const SLASH = "/"

export type Where = Readonly<Record<string, Test>>

export function namedBy(test: Test | undefined): readonly string[] | null {
  if (test === undefined) return null
  const named = test.is === undefined ? test.in : [test.is]
  return named === undefined ? null : named.filter((one) => !one.includes(SLASH))
}

function byId(reading: Reading, ids: readonly string[]): readonly string[] {
  const found: string[] = []
  for (const id of ids) {
    const listed = listedById(reading, id)
    if (listed !== null) found.push(listed.path)
  }
  return found
}

export function pickingFor(reading: Reading, where: Where | undefined): Picking | null {
  if (where === undefined) return null
  const types = namedBy(where[TYPE])
  const ids = namedBy(where[ID])
  const slugs = namedBy(where[SLUG])
  if (types === null && ids === null && slugs === null) return null
  const identified = ids === null ? null : byId(reading, ids)
  return (kind) => {
    if (types !== null && !types.includes(kind)) return []
    if (identified !== null) return identified.filter((path) => partedIn(path)?.pageType === kind)
    if (slugs === null) return null
    return slugs.flatMap((slug) => listedAnywhere(reading, kind, slug).map((one) => one.path))
  }
}
