import { appendFileSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import type { Scratch } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { valueAlsoFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import { place } from "akasha/story/lore/place/place.page-type.ts"
import {
  loreWorld,
  toldAlso,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.test-fixtures.ts"

export const PLACE_AT = "story/world/pages/held/places/hall.place.ts"

export function toldWorld(scratch: Scratch): string {
  const root = loreWorld(scratch)
  toldAlso(root)
  valueAlsoFiled(root, place.slug, [
    {
      path: PLACE_AT,
      value: {
        id: "01a0d600-0000-7000-8000-00000000000a",
        type: `${pageType.slug}/${place.slug}`,
        slug: "hall",
      },
    },
  ])
  return root
}

export function readNow(root: string, agentId: string, path: string): undefined {
  const oid = blobIdOf(readFileSync(join(root, path)))
  recordRead(root, agentId, { path, oid, seenAt: 1, carriedOid: null })
}

export function rewritten(root: string, path: string): undefined {
  appendFileSync(join(root, path), "\n")
}
