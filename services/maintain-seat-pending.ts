export const tool = {
  summary: "Keep every seat's pending components true as the stores behind them change",
  repos: ["akasha"],
} as const

import { watch } from "node:fs"
import { join } from "node:path"
import { messagesDirRelPath } from "../tools/lib/message-file.ts"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { akashaSeatsDirIn } from "../tools/lib/seat-page-akasha.ts"
import { type SeatPending, pendingFromFiles } from "../tools/lib/seat-pending-batch.ts"
import { setPending } from "../tools/lib/seat-turn-pending.ts"

const HELP = `bun services/maintain-seat-pending.ts — keep every seat's pending components true

A seat is drawn blue while something it arranged is still to come, and that reading is taken
from the seat's own page rather than worked out when somebody asks. Five components stand on
the page and the page is the only authority; this is what keeps three of them true between
one turn end and the next.

TURN END IS THE BASELINE, NOT THE MECHANISM. Every turn end rewrites all five from its own
reads, so a seat that has just finished a turn is already right. What this covers is the
stretch after that, where a child exits or a message is claimed and the seat itself is not
running to notice.

THREE COMPONENTS, NOT FIVE. \`running-task\` comes from the stop hook's own payload and
\`reminder\` from a page only the seat itself writes, so nothing outside a turn can see
either change — and nothing needs to, because both clear by starting the seat, which
stamps it working.

ALL THREE BATCH, AND THAT IS WHY THIS IS ONE PROCESS. One roster pass answers
\`live-child\` for every seat at once and one scan of the message store answers
\`send-in-flight\` for every seat at once, so the whole pass costs about six milliseconds
across the fleet rather than the ~195ms a seat that reading them one seat at a time costs.
It is cheap enough to run on every change, which is what lets a tab recolour promptly.

NOTHING IS TAKEN ON A TICK ANY MORE. \`open-question\` was the one component with no file
behind it: it was read on a thirty-second tick because there was nothing to watch, and at
about 170ms a seat it was also the slow one. The questions system it counted is gone, so
every component left is file-backed and a file change is the only thing that moves this.

WHAT IS WRITTEN IS ONE COMPONENT, NEVER THE ANSWER. Nothing here decides whether a seat is
pending; it maintains the components it owns and the reading is taken from all five when
somebody asks. A process that wrote the answer would be a second authority over it, which is
the fault this whole shape exists to remove.

RUNNING IT TWICE CHANGES NOTHING, and a pass stopped part-way leaves every seat it reached
correct and every seat it did not reach as it was.

Usage:
  bun ~/repos/akasha/services/maintain-seat-pending.ts [--once]

  --once  Take one pass and exit, rather than staying up.
  --help  This.
`

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
  if (argv.includes("--help")) {
    process.stdout.write(HELP)
    return 0
  }
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
      process.stderr.write(`maintain-seat-pending: nothing stands at ${dir}, so it is not followed\n`)
    }
  }
  if (standing === 0) {
    process.stderr.write("maintain-seat-pending: no store could be followed, so nothing would reach it\n")
    return 1
  }
  process.stderr.write(`maintain-seat-pending: following ${String(standing)} store(s)\n`)
  return 0
}

process.exitCode = main(process.argv.slice(2))
