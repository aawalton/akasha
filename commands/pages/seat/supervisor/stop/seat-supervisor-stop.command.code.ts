import { existsSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { told } from "@akasha/git/git-running"
import { textAt, valueAt } from "@akasha/pages/page-value"
import { seatPathForName } from "@akasha/seat-system/seat-reading"
import { type Stopped, stopping } from "@akasha/seat-system/seat-stopping"
import type { Answer, Given } from "../../../../../command-system/calling/calling.module.code.ts"
import { refused } from "../../../../../command-system/calling/calling.module.code.ts"
import {
  namedIn,
  quoted,
} from "../../../../modules/seat-act-calling/seat-act-calling.module.code.ts"

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
      `\`${given.calledAs}\` takes \`${FORCE}\` and nothing else, and ${quoted(stray)} followed it`,
      1
    )
  }
  const page = seatPathForName(named.name)
  const at = join(given.root, page)
  if (!existsSync(at)) {
    const held = told(given.root, ["show", `HEAD:${page}`])
    if (held === null) {
      return refused(
        `no seat named \`${named.name}\` holds a page under \`${given.root}\`, so there is nothing to stop`,
        2
      )
    }
    writeFileSync(at, held)
  }
  const value = valueAt(page, given.root)
  const agentId = value === null ? null : textAt(value, ID)
  if (agentId === null || agentId === "") {
    return refused(
      `the page for \`${named.name}\` states no id, and a seat's id is its agent's id, so nothing here says which processes are its own`,
      2
    )
  }
  const said = await stopping(given, agentId, named.name, flags.includes(FORCE))
  if ("refused" in said) return refused(said.refused, 1)
  return { report: [saidOf(said.stopped)], refusals: [], code: 0 }
}
