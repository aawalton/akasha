import { join } from "node:path"
import { writeFileAtomicSync } from "akasha/file/disk/modules/atomic-write/atomic-write.module.code.ts"
import { textThere } from "akasha/file/disk/modules/text-there/text-there.module.code.ts"
import { uncommittedBesideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const CACHE = "cache"

const HELD = "jsonl"

const BREAK = "\n"

const BLANK = ""

export function cacheAt(page: string): string | null {
  return uncommittedBesideAt(page, CACHE, HELD)
}

export function cachedIn(root: string, page: string): readonly unknown[] | null {
  const at = cacheAt(page)
  if (at === null) return null
  const body = textThere(join(root, at))
  if (body === null) return null
  const found: unknown[] = []
  for (const line of body.split(BREAK)) {
    if (line === BLANK) continue
    try {
      found.push(JSON.parse(line))
    } catch {
      return null
    }
  }
  return found
}

export function cacheKept(root: string, page: string, rows: Iterable<unknown>): string | null {
  const at = cacheAt(page)
  if (at === null) return null
  const body = [...rows].map((one) => `${JSON.stringify(one)}${BREAK}`).join(BLANK)
  const full = join(root, at)
  if (textThere(full) === body) return at
  writeFileAtomicSync(full, body)
  return at
}
