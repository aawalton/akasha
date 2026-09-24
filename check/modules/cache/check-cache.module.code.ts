import { join } from "node:path"
import { writeFileAtomicSync } from "akasha/file/disk/modules/atomic-write/atomic-write.module.code.ts"
import { textThere } from "akasha/file/disk/modules/text-there/text-there.module.code.ts"
import { uncommittedBesideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { z } from "zod"

const CACHE = "cache"

const HELD = "jsonl"

const BREAK = "\n"

const BLANK = ""

export function cacheAt(page: string): string | null {
  return uncommittedBesideAt(page, CACHE, HELD)
}

function rowIn<T>(row: z.ZodType<T>, line: string): { readonly said: T } | null {
  try {
    const read = row.safeParse(JSON.parse(line))
    return read.success ? { said: read.data } : null
  } catch {
    return null
  }
}

export function cachedIn<T>(root: string, page: string, row: z.ZodType<T>): readonly T[] | null {
  const at = cacheAt(page)
  if (at === null) return null
  const body = textThere(join(root, at))
  if (body === null) return null
  const found: T[] = []
  for (const line of body.split(BREAK)) {
    if (line === BLANK) continue
    const read = rowIn(row, line)
    if (read === null) return null
    found.push(read.said)
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
