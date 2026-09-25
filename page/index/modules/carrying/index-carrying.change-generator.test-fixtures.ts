import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { indexAt } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const BYTES = new TextEncoder()

export const AT = indexAt("page", "id/held.jsonl")

export const OTHER_AT = indexAt("path", "akasha/a.domain.ts.jsonl")

export const LINE = '{"path":"akasha/a.domain.ts","id":"01a09209-0000-7000-8000-00000000000c"}\n'

export function worldOf(root: string): string {
  nothingFiled(root)
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
