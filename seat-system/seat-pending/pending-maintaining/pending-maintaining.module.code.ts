import { watch } from "node:fs"
import { dirname, join } from "node:path"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { messagesDirRelPath } from "../../messaging/message-file/message-file.module.code.ts"
import { akashaSeatsThatExist } from "../../seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { akashaObservedOf } from "../../seat-akasha-read/seat-akasha-read.module.code.ts"
import { akashaSeatsDirIn } from "../../seat-page-akasha/seat-page-akasha.module.code.ts"
import { setPending } from "../../seat-turn-pending/seat-turn-pending.module.code.ts"
import {
  pendingFromFiles,
  type SeatPending,
} from "../pending-from-files/pending-from-files.module.code.ts"

const STORE_SETTLE_MS = 250

const TRANSCRIPT_SETTLE_MS = 25

const TRANSCRIPT_KEY = "transcript-path"

function stamp(found: readonly SeatPending[]): number {
  let written = 0
  for (const one of found) {
    if (setPending(one.seat, one.values)) written += 1
  }
  return written
}

function storesWatched(): readonly string[] {
  return [akashaSeatsDirIn(akashaRoot()), join(akashaRoot(), messagesDirRelPath())]
}

function transcriptsWatched(): readonly string[] {
  const found = new Set<string>()
  for (const [id] of akashaSeatsThatExist()) {
    const path = akashaObservedOf(id)?.[TRANSCRIPT_KEY]
    if (typeof path === "string" && path !== "") found.add(dirname(path))
  }
  return [...found]
}

function fromFiles(): number {
  try {
    return stamp(pendingFromFiles())
  } catch (err) {
    process.stderr.write(`maintain-seat-pending: the file run failed — ${String(err)}\n`)
    return 0
  }
}

function settled(settleMs: number): () => boolean {
  let settling: ReturnType<typeof setTimeout> | null = null
  return () => {
    if (settling !== null) clearTimeout(settling)
    settling = setTimeout(() => {
      settling = null
      fromFiles()
    }, settleMs)
    return true
  }
}

function follow(dir: string, deep: boolean, nudge: () => boolean): boolean {
  try {
    watch(dir, { recursive: deep }, () => {
      nudge()
    })
    return true
  } catch {
    process.stderr.write(`maintain-seat-pending: nothing is at ${dir}, so it is not followed\n`)
    return false
  }
}

function main(argv: readonly string[]): number {
  fromFiles()
  if (argv.includes("--once")) return 0
  let followed = 0
  const nudgeStores = settled(STORE_SETTLE_MS)
  const nudgeTranscripts = settled(TRANSCRIPT_SETTLE_MS)
  for (const dir of storesWatched()) {
    if (follow(dir, true, nudgeStores)) followed += 1
  }
  for (const dir of transcriptsWatched()) {
    if (follow(dir, false, nudgeTranscripts)) followed += 1
  }
  if (followed === 0) {
    process.stderr.write(
      "maintain-seat-pending: no store could be followed, so nothing would reach it\n"
    )
    return 1
  }
  process.stderr.write(`maintain-seat-pending: following ${String(followed)} folder(s)\n`)
  return 0
}

if (import.meta.main) {
  process.exitCode = main(process.argv.slice(2))
}
