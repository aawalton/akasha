import { writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import {
  assembleSnapshot,
  latestSnapshot,
  SNAPSHOT_PAGE_TYPE,
  type SnapshotHeader,
  snapshotChunks,
  snapshotWithId,
} from "@tools/lib/temper-inventory/snapshot-read"
import { USER_ID } from "@tools/lib/user-id"

const INPUT = 1

const DATA = 2

const OPERATIONAL = 3

const LATEST = "--latest"

const OUT = "--out"

const JSON_FLAG = "--json"

const SPACES = 2

export type Read =
  | {
      readonly snapshotId: string | null
      readonly latest: boolean
      readonly outPath: string | null
      readonly json: boolean
    }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let snapshotId: string | null = null
  let latest = false
  let outPath: string | null = null
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === LATEST) {
      latest = true
      continue
    }
    if (one === JSON_FLAG) {
      json = true
      continue
    }
    if (one === OUT) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined) {
        refusals.push(`\`${OUT}\` names the file written to, and no file followed it`)
        continue
      }
      outPath = value
      continue
    }
    if (one.startsWith("--")) {
      refusals.push(
        `\`${one}\` is no flag this takes — it takes \`${LATEST}\`, \`${OUT}\` and \`${JSON_FLAG}\``
      )
      continue
    }
    if (snapshotId !== null) {
      refusals.push(
        `\`${one}\` follows the snapshot already named, and one call joins one snapshot`
      )
      continue
    }
    snapshotId = one
  }
  if (snapshotId !== null && latest) {
    refusals.push(`a call names a snapshot or says \`${LATEST}\`, and this said both`)
  }
  if (snapshotId === null && !latest) {
    refusals.push(`name the snapshot joined back together, or say \`${LATEST}\` for the newest one`)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { snapshotId, latest, outPath, json }
}

type Found = { readonly header: SnapshotHeader } | { readonly why: string; readonly code: number }

async function headerFor(read: Exclude<Read, { refused: readonly string[] }>): Promise<Found> {
  let header: SnapshotHeader | null
  try {
    header = read.latest
      ? await latestSnapshot(USER_ID)
      : await snapshotWithId(read.snapshotId ?? "")
  } catch (thrown) {
    return { why: whyOf(thrown), code: OPERATIONAL }
  }
  if (header !== null) return { header }
  return {
    why: read.latest
      ? `the account ${USER_ID} holds no ${SNAPSHOT_PAGE_TYPE} page, so there is none to join`
      : `no ${SNAPSHOT_PAGE_TYPE} page carries the id ${read.snapshotId ?? ""}`,
    code: DATA,
  }
}

type Joined =
  | { readonly db: InventoryDatabase; readonly chunkCount: number }
  | { readonly why: string; readonly code: number }

async function joinedFrom(header: SnapshotHeader): Promise<Joined> {
  let chunkCount = 0
  let db: InventoryDatabase | null
  try {
    const chunks = await snapshotChunks(header.slug)
    chunkCount = chunks.length
    db = await assembleSnapshot(chunks)
  } catch (thrown) {
    return { why: whyOf(thrown), code: OPERATIONAL }
  }
  if (db === null) {
    return {
      why:
        `snapshot ${header.id} did not join back together — ${String(chunkCount)} chunk(s) ` +
        `stand where its header names ${String(header["chunk-count"])}`,
      code: DATA,
    }
  }
  return { db, chunkCount }
}

export async function temperInventorySnapshot(
  argv: readonly string[] = [],
  given?: Given
): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  const root = given === undefined ? process.cwd() : resolve(given.root)

  const found = await headerFor(read)
  if ("why" in found) return refused(found.why, found.code)

  const joined = await joinedFrom(found.header)
  if ("why" in joined) return refused(joined.why, joined.code)

  const said = read.json ? JSON.stringify(joined.db) : JSON.stringify(joined.db, null, SPACES)
  if (read.outPath === null) return { report: said.split("\n"), refusals: [], code: 0 }

  const at = resolve(root, read.outPath)
  try {
    await writeFile(at, `${said}\n`, "utf8")
  } catch (thrown) {
    return refused(`the record was not written to ${at} — ${whyOf(thrown)}`, OPERATIONAL)
  }
  return {
    report: [
      `wrote snapshot ${found.header.id} into ${at}, ` +
        `joined from ${String(joined.chunkCount)} chunk(s)`,
    ],
    refusals: [],
    code: 0,
  }
}
