import { existsSync } from "node:fs"
import { join } from "node:path"
import {
  DATA,
  INPUT,
  OK,
  partWay,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredWith, refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { namedIn } from "akasha/commands/modules/seat-act-calling/seat-act-calling.module.code.ts"
import { told } from "akasha/git/running/git-running.module.code.ts"
import { valueAt, valueIn } from "akasha/pages/value/page-value.module.code.ts"
import { textAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { seatPathForName } from "akasha/seat-system/seat-reading/seat-reading.module.code.ts"
import {
  type Stopped,
  stopping,
} from "akasha/seat-system/seat-stopping/seat-stopping.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

const STOP = "stop"

const FORCE = "--force"

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

export async function seatSupervisorStop(argv: readonly string[], given: Given): Promise<Answer> {
  const named = namedIn(given.calledAs, STOP, argv)
  if (!("name" in named)) return named
  const flags = argv.slice(1)
  const stray = flags.filter((one) => one !== FORCE)
  if (stray.length > 0) {
    return refused(
      `\`${given.calledAs}\` takes \`${FORCE}\` and nothing else, and ${namesDrawn(stray)} followed it`,
      INPUT
    )
  }
  const page = seatPathForName(named.name)
  const at = join(given.root, page)
  let value: Value | null = null
  if (existsSync(at)) {
    value = valueAt(page, given.root)
  } else {
    const held = told(given.root, ["show", `HEAD:${page}`])
    if (held === null) {
      return refused(
        `no seat named \`${named.name}\` holds a page under \`${given.root}\`, so there is nothing to stop`,
        DATA
      )
    }
    value = valueIn(held)
  }
  const agentId = value === null ? null : textAt(value, ID)
  if (agentId === null || agentId === "") {
    return refused(
      `the page for \`${named.name}\` states no id, and a seat's id is its agent's id, so nothing here says which processes are its own`,
      DATA
    )
  }
  const done: string[] = []
  const said = await stopping(given, agentId, named.name, flags.includes(FORCE), done)
  if ("refused" in said) {
    return answeredWith(done, [said.refused, ...partWay(done)], said.code)
  }
  return answeredWith([...said.stopped.moved, saidOf(said.stopped)], [], OK)
}
