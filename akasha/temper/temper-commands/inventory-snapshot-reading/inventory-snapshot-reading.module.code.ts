import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { listedAt } from "@akasha/indexes"
import { askComposed } from "@akasha/pages-query/store-spelled-asking"
import { codeRoot } from "@akasha/pages-system/code-root"
import { besideAt } from "@akasha/pages-system/page-file-name"
import { assembleInventory } from "@akasha/temper-items-core/assemble-inventory"
import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import { z } from "zod"

export const SNAPSHOT_PAGE_TYPE = "temper-inventory-snapshot"
export const CHUNK_PAGE_TYPE = "temper-inventory-chunk"

const CHUNK_CEILING = 200

const SNAPSHOT_KEYS = ["slug", "id", "account-page", "captured-at", "total-value", "chunk-count"]

const CHUNK_KEYS = ["inventory", "chunk-index", "data"]

const SNAPSHOT_HEADER_SHAPE = z
  .object({
    id: z.string(),
    slug: z.string(),
    "captured-at": z.string(),
    "total-value": z.coerce.number(),
    "chunk-count": z.coerce.number(),
  })
  .passthrough()

export type SnapshotHeader = z.infer<typeof SNAPSHOT_HEADER_SHAPE>

const CHUNK_ROW_SHAPE = z
  .object({
    "chunk-index": z.coerce.number(),
    data: z.string(),
  })
  .passthrough()

export type Chunk = {
  readonly chunkIndex: number
  readonly data: string
}

async function headerFrom(
  where: Readonly<Record<string, unknown>>,
  descending: boolean
): Promise<SnapshotHeader | null> {
  const asked = await askComposed({
    "page-type": SNAPSHOT_PAGE_TYPE,
    where,
    keys: SNAPSHOT_KEYS,
    "sort-by": "captured-at",
    descending,
    limit: 1,
  })
  if (!asked.ok) throw new Error(`${SNAPSHOT_PAGE_TYPE} went unread — ${asked.why}`)
  const row = asked.answer.rows[0]
  return row === undefined ? null : SNAPSHOT_HEADER_SHAPE.parse(row.values)
}

export function latestSnapshot(accountUserId: string): Promise<SnapshotHeader | null> {
  return headerFrom({ "account-page": { is: accountUserId } }, true)
}

export function snapshotWithId(id: string): Promise<SnapshotHeader | null> {
  return headerFrom({ id: { is: id } }, false)
}

export async function snapshotChunks(inventory: string): Promise<readonly Chunk[]> {
  const asked = await askComposed({
    "page-type": CHUNK_PAGE_TYPE,
    where: { inventory: { is: inventory } },
    keys: CHUNK_KEYS,
    "sort-by": "chunk-index",
    limit: CHUNK_CEILING,
  })
  if (!asked.ok) throw new Error(`${CHUNK_PAGE_TYPE} went unread — ${asked.why}`)
  return asked.answer.rows.map((row) => {
    const parsed = CHUNK_ROW_SHAPE.parse(row.values)
    return { chunkIndex: parsed["chunk-index"], data: parsed.data }
  })
}

export async function assembleSnapshot(
  chunks: readonly Chunk[]
): Promise<InventoryDatabase | null> {
  return assembleInventory(chunks)
}

const DATA_PROPERTY = "data"

const HELD = "json"

// The chunk pages record only how the transport divided a reading; the bytes
// themselves are in the snapshot's own data file, already rejoined, so a
// reading is read from that file rather than from chunk rows.
export async function snapshotDatabase(slug: string): Promise<InventoryDatabase | null> {
  const root = codeRoot()
  const found = listedAt(root, SNAPSHOT_PAGE_TYPE, slug)[0]
  if (found === undefined) return null
  const beside = besideAt(found.path, DATA_PROPERTY, HELD)
  if (beside === null) return null
  const at = join(root, beside)
  if (!existsSync(at)) return null
  try {
    return JSON.parse(await readFile(at, "utf8")) as InventoryDatabase
  } catch {
    return null
  }
}
