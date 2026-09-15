import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/index/modules/filing/index-filing.module.code.ts"
import { nothingFiled } from "akasha/pages/index/modules/reading/index-reading.module.test-fixtures.ts"
import { indexAt } from "akasha/pages/index/modules/surface/index-surface.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/modules/shadow/shadow.module.code.ts"
import { shadowAt } from "akasha/pages/modules/shadow/shadow.module.code.ts"

const INDEX = "index"

const HELD = "01a09209-0000-7000-8000-00000000000a"

const AWAY = "01a09209-0000-7000-8000-00000000000b"

const BYTES = new TextEncoder()

export const AT = indexAt("identity", "page/id/held.jsonl")

export const AWAY_AT = indexAt("path", "akasha/a.domain.ts.jsonl")

export const LINE = '{"path":"akasha/a.domain.ts","id":"01a09209-0000-7000-8000-00000000000c"}\n'

function indexPageIn(root: string, slug: string, id: string, value: object): undefined {
  const path = `akasha/${slug}.index.ts`
  listedFiled(root, INDEX, slug, [{ path, id }])
  valueAlsoFiled(root, INDEX, [{ path, value: { id, pageTypeSlug: INDEX, slug, ...value } }])
}

export function worldOf(root: string, value: object): string {
  nothingFiled(root)
  indexPageIn(root, "index-identity", HELD, value)
  indexPageIn(root, "index-path", AWAY, { name: "path" })
  return root
}

export function shadowOf(root: string, filed: ReadonlyMap<string, string | null>): Shadow {
  return { ...shadowAt(root), filed: () => filed }
}

export function changeWith(
  root: string,
  held: ReadonlyMap<string, string>,
  carried: readonly string[] = []
): Change {
  const bytesHeld = (path: string): Uint8Array | null => {
    const body = held.get(path)
    return body === undefined ? null : BYTES.encode(body)
  }
  return { root, changed: [], carried, before: bytesHeld, after: bytesHeld }
}
