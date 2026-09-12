import { existsSync } from "node:fs"
import { join } from "node:path"
import { seatPathForName } from "akasha/agents/seats/modules/reading/seat-reading.module.code.ts"
import {
  type Stopped,
  type Stopping,
  stopping,
} from "akasha/agents/seats/modules/stopping/seat-stopping.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { force as forceArgument } from "akasha/commands/arguments/pages/force.argument.ts"
import { seat } from "akasha/commands/arguments/pages/seat.argument.ts"
import {
  answeredWith,
  answering,
  DATA,
  OK,
  partWay,
  refused,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { seatSupervisorStop as page } from "akasha/commands/pages/seat/supervisor/stop/seat-supervisor-stop.command.ts"
import { told } from "akasha/git/running/git-running.module.code.ts"
import { valueAt, valueIn } from "akasha/pages/value/page-value.module.code.ts"
import { textAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const ID = "id"

function saidOf(one: Stopped): string {
  if (one.how === "reconciled") {
    return `${one.name} had no process and no session, and the page it held is taken`
  }
  if (one.how === "already-gone") {
    return `${one.name} was already gone, and the page it held is taken`
  }
  if (one.pids.length === 0) {
    return `${one.name} was stopped by ending the session that carried it`
  }
  return `${one.name} was stopped, ending ${one.pids.map((pid) => String(pid)).join(", ")}`
}

export type Halting = (
  given: Given,
  agentId: string,
  name: string,
  force: boolean,
  done: string[]
) => Promise<Stopping>

export async function stoppedBy(
  given: Given,
  agentId: string,
  name: string,
  force: boolean,
  halting: Halting = stopping
): Promise<Answer> {
  return await answering(async (done) => {
    const said = await halting(given, agentId, name, force, done)
    if ("refused" in said) {
      return answeredWith(done, [said.refused, ...partWay(done)], said.code)
    }
    return answeredWith([...said.stopped.moved, saidOf(said.stopped)], [], OK)
  })
}

export async function seatSupervisorStop(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [forceArgument, seat])
  if ("refused" in read) return refusedBy(read.refused)
  const name = read.taken.seat
  const filed = seatPathForName(name)
  const at = join(given.root, filed)
  let value: Value | null = null
  if (existsSync(at)) {
    value = valueAt(filed, given.root)
  } else {
    const held = told(given.root, ["show", `HEAD:${filed}`])
    if (held === null) {
      return refused(
        `no seat named \`${name}\` holds a page under \`${given.root}\`, so there is nothing to stop`,
        DATA
      )
    }
    value = valueIn(held)
  }
  const agentId = value === null ? null : textAt(value, ID)
  if (agentId === null || agentId === "") {
    return refused(
      `the page for \`${name}\` states no id, and a seat's id is its agent's id, so nothing here says which processes are its own`,
      DATA
    )
  }
  return await stoppedBy(given, agentId, name, read.taken.force)
}
