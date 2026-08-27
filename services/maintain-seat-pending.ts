export const tool = {
  summary: "Keep every seat's pending components true as the stores behind them change",
  repos: ["akasha"],
} as const

import { watch } from "node:fs"
import { join } from "node:path"
import { messagesDirRelPath } from "../tools/lib/message-file.ts"
import { akashaRoot } from "../repo/roots/roots"
import { seatDirs } from "../tools/lib/seat-presence-read.ts"
import { type SeatPending, pendingFromFiles, pendingFromQuestions } from "../tools/lib/seat-pending-batch.ts"
import { setPending } from "../tools/lib/seat-turn-pending.ts"

const HELP = `bun services/maintain-seat-pending.ts — keep every seat's pending components true

A seat is drawn blue while something it arranged is still to come, and that reading is taken
from the seat's own page rather than worked out when somebody asks. Six components stand on
the page and the page is the only authority; this is what keeps four of them true between
one turn end and the next.

TURN END IS THE BASELINE, NOT THE MECHANISM. Every turn end rewrites all six from its own
reads, so a seat that has just finished a turn is already right. What this covers is the
stretch after that, where a child exits or a message is claimed and the seat itself is not
running to notice.

FOUR COMPONENTS, NOT SIX. \`running-task\` comes from the stop hook's own payload and
\`reminder\` from a page only the seat itself writes, so nothing outside a turn can see
either change — and nothing needs to, because both clear by starting the seat, which
stamps it working.

THREE OF THE FOUR BATCH, AND THAT IS WHY THIS IS ONE PROCESS. One roster pass answers
\`live-child\` for every seat at once and one scan of the message store answers
\`send-in-flight\` for every seat at once, so the whole file-backed pass costs about six
milliseconds across the fleet rather than the ~195ms a seat that reading them one seat at a
time costs. It is cheap enough to run on every change, which is what lets a tab recolour
promptly.

THE FOURTH HAS NO FILE. \`open-question\` is a database row, so there is nothing to watch and
it is taken on a tick instead. It is also the slow one — about 170ms a seat — which is the
second reason it is not on the path a file change triggers.

WHAT IS WRITTEN IS ONE COMPONENT, NEVER THE ANSWER. Nothing here decides whether a seat is
pending; it maintains the components it owns and the reading is taken from all six when
somebody asks. A process that wrote the answer would be a second authority over it, which is
the fault this whole shape exists to remove.

RUNNING IT TWICE CHANGES NOTHING, and a pass stopped part-way leaves every seat it reached
correct and every seat it did not reach as it was.

Usage:
  bun ~/repos/akasha/services/maintain-seat-pending.ts [--once]

  --once  Take one pass over both cadences and exit, rather than staying up.
  --help  This.
`

const SETTLE_MS = 250

const QUESTION_TICK_MS = 30_000

const QUESTION_PATIENCE_MS = 15_000

function stamp(found: readonly SeatPending[]): void {
  for (const one of found) setPending(one.seat, one.values)
}

function storesWatched(): readonly string[] {
  return [...seatDirs(), join(akashaRoot(), messagesDirRelPath())]
}

function withinPatience(work: Promise<readonly SeatPending[]>): Promise<readonly SeatPending[]> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const guarded = work.catch((): readonly SeatPending[] => [])
  const patience = new Promise<readonly SeatPending[]>((settle) => {
    timer = setTimeout(() => settle([]), QUESTION_PATIENCE_MS)
  })
  return Promise.race([guarded, patience]).then((got) => {
    if (timer !== undefined) clearTimeout(timer)
    return got
  })
}

function fromFiles(): void {
  try {
    stamp(pendingFromFiles())
  } catch (err) {
    process.stderr.write(`maintain-seat-pending: the file pass failed — ${String(err)}\n`)
  }
}

async function fromQuestions(): Promise<void> {
  stamp(await withinPatience(pendingFromQuestions()))
}

let settling: ReturnType<typeof setTimeout> | null = null

function nudge(): void {
  if (settling !== null) clearTimeout(settling)
  settling = setTimeout(() => {
    settling = null
    fromFiles()
  }, SETTLE_MS)
}

async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--help")) {
    process.stdout.write(HELP)
    return 0
  }
  fromFiles()
  await fromQuestions()
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
  setInterval(() => {
    void fromQuestions()
  }, QUESTION_TICK_MS)
  process.stderr.write(`maintain-seat-pending: following ${String(standing)} store(s)\n`)
  return 0
}

process.exitCode = await main(process.argv.slice(2))
