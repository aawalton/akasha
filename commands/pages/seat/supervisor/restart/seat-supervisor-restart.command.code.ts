import { everyOfType, typeSlugOf } from "@akasha/indexes"
import { mergeUncommitted } from "@akasha/pages/page-uncommitted"
import { nameOf, supervisorOf } from "@akasha/seat-system/seat-reading"
import type { Holder } from "akasha/file-system/lock-holder/lock-holder.module.code.ts"
import { alive } from "akasha/file-system/lock-holder/lock-holder.module.code.ts"
import type { Answer, Given } from "../../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../../modules/calling/calling.module.code.ts"

const SEAT_TYPE = "01a05035-2609-7463-ba49-ccaf20f5c337"

const SEAT_DIR = "seat-system/seats/pages/"

const ALL = "--all"

const ASK = "reExecAsk"

const ASKED = "asked"

const SIGNAL = "SIGTERM"

type Seat = {
  readonly page: string
  readonly name: string
  readonly holder: Holder | null
}

function seatsIn(root: string): readonly Seat[] {
  const found: Seat[] = []
  for (const one of everyOfType(root, typeSlugOf(root, SEAT_TYPE))) {
    if (!one.path.startsWith(SEAT_DIR)) continue
    found.push({ page: one.path, name: nameOf(one.path), holder: supervisorOf(root, one.path) })
  }
  return [...found].sort((one, other) => (one.name < other.name ? -1 : 1))
}

function restarted(root: string, standing: Seat): string {
  const holder = standing.holder
  if (holder === null) {
    return `${standing.name} states no supervisor that can be read, so nothing was asked of it`
  }
  if (!alive(holder)) {
    return `${standing.name} states supervisor ${holder.pid}, which is no longer the process it names`
  }
  mergeUncommitted(root, standing.page, { [ASK]: ASKED })
  try {
    process.kill(holder.pid, SIGNAL)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return `${standing.name} holds the ask and its supervisor ${holder.pid} took no signal: ${why}`
  }
  return `${standing.name} asked supervisor ${holder.pid} and signalled it`
}

export function seatSupervisorRestart(argv: readonly string[], given: Given): Answer {
  if (argv.length !== 1 || argv[0] !== ALL) {
    return refused(`\`${given.calledAs}\` takes \`${ALL}\` and nothing else`, 1)
  }
  const seats = seatsIn(given.root)
  if (seats.length === 0) {
    return refused(
      `no seat page stands under \`${given.root}\`, and every seat holding a page is acted on, ` +
        "so a fleet of none is the pages being wrong rather than a fleet",
      2
    )
  }
  return { report: seats.map((one) => restarted(given.root, one)), refusals: [], code: 0 }
}
