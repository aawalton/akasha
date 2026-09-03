import { watch } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { messagesDirRelPath } from "@tools/lib/message-file"
import { setPending } from "@tools/lib/seat-turn-pending"
import { akashaSeatsDirIn } from "../../seat-page-akasha/seat-page-akasha.module.code.ts"
import {
  pendingFromFiles,
  type SeatPending,
} from "../pending-from-files/pending-from-files.module.code.ts"

const SETTLE_MS = 250

function stamp(found: readonly SeatPending[]): void {
  for (const one of found) setPending(one.seat, one.values)
}

// THE STORE WATCHED IS THE STORE READ. This watched the old seat directory while the pass it
// triggers reads akasha, so a seat's values could change without anything here noticing: the watch
// fired only when a store nothing writes was touched, which is never.
function storesWatched(): readonly string[] {
  return [akashaSeatsDirIn(akashaRoot()), join(akashaRoot(), messagesDirRelPath())]
}

function fromFiles(): void {
  try {
    stamp(pendingFromFiles())
  } catch (err) {
    process.stderr.write(`maintain-seat-pending: the file pass failed — ${String(err)}\n`)
  }
}

let settling: ReturnType<typeof setTimeout> | null = null

function nudge(): void {
  if (settling !== null) clearTimeout(settling)
  settling = setTimeout(() => {
    settling = null
    fromFiles()
  }, SETTLE_MS)
}

function main(argv: readonly string[]): number {
  fromFiles()
  if (argv.includes("--once")) return 0
  let standing = 0
  for (const dir of storesWatched()) {
    try {
      watch(dir, { recursive: true }, () => {
        nudge()
      })
      standing += 1
    } catch {
      process.stderr.write(
        `maintain-seat-pending: nothing stands at ${dir}, so it is not followed\n`
      )
    }
  }
  if (standing === 0) {
    process.stderr.write(
      "maintain-seat-pending: no store could be followed, so nothing would reach it\n"
    )
    return 1
  }
  process.stderr.write(`maintain-seat-pending: following ${String(standing)} store(s)\n`)
  return 0
}

if (import.meta.main) {
  process.exitCode = main(process.argv.slice(2))
}
