import {
  nameOf,
  supervisorOf,
} from "akasha/agents/seats/modules/reading/seat-reading.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { everySeat } from "akasha/commands/arguments/pages/every-seat.argument.ts"
import {
  answering,
  DATA,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { seatSupervisorRestart as page } from "akasha/commands/pages/seat/supervisor/restart/seat-supervisor-restart.command.ts"
import type { Holder } from "akasha/files/lock-holder/lock-holder.module.code.ts"
import { alive } from "akasha/files/lock-holder/lock-holder.module.code.ts"
import { everyOfType, typeSlugOf } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { mergeUncommitted } from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"

const SEAT_TYPE = "01a05035-2609-7463-ba49-ccaf20f5c337"

const ASK = "reExecAsk"

const ASKED = "asked"

const SIGNAL = "SIGTERM"

export type Seat = {
  readonly page: string
  readonly name: string
  readonly holder: Holder | null
}

export type Restarting = (root: string, seat: Seat, done: string[]) => undefined

function seatsIn(root: string): readonly Seat[] {
  const found: Seat[] = []
  for (const one of everyOfType(root, typeSlugOf(root, SEAT_TYPE))) {
    found.push({ page: one.path, name: nameOf(one.path), holder: supervisorOf(root, one.path) })
  }
  return [...found].sort((one, other) => (one.name < other.name ? -1 : 1))
}

function restarted(root: string, seat: Seat, done: string[]): undefined {
  const holder = seat.holder
  if (holder === null) {
    done.push(`${seat.name} states no supervisor that can be read, so nothing was asked of it`)
    return undefined
  }
  if (!alive(holder)) {
    done.push(
      `${seat.name} states supervisor ${holder.pid}, which is no longer the process it names`
    )
    return undefined
  }
  mergeUncommitted(root, seat.page, { [ASK]: ASKED })
  try {
    process.kill(holder.pid, SIGNAL)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    done.push(`${seat.name} holds the ask and its supervisor ${holder.pid} took no signal: ${why}`)
    return undefined
  }
  done.push(`${seat.name} asked supervisor ${holder.pid} and signalled it`)
  return undefined
}

export function restartedEach(
  root: string,
  seats: readonly Seat[],
  restarting: Restarting,
  done: string[]
): undefined {
  for (const seat of seats) restarting(root, seat, done)
  return undefined
}

export async function seatSupervisorRestart(
  argv: readonly string[],
  given: Given,
  restarting: Restarting = restarted
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [everySeat])
  if ("refused" in read) return mistaking(read.refused)
  const seats = seatsIn(given.root)
  if (seats.length === 0) {
    return refused(
      `no seat page stands under \`${given.root}\`, and every seat holding a page is acted on, ` +
        "so a fleet of none is the pages being wrong rather than a fleet",
      DATA
    )
  }
  return await answering((done) => {
    restartedEach(given.root, seats, restarting, done)
    return told(done)
  })
}
