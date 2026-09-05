import { existsSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { exitCodeForThrowable } from "@akasha/errors-core/exit-code"
import type { Holder } from "@akasha/file-system/lock-holder"
import { alive } from "@akasha/file-system/lock-holder"
import { told } from "@akasha/git/git-running"
import { everyOfType, typeSlugOf } from "@akasha/indexes"
import { mergeUncommitted } from "@akasha/pages-system/page-uncommitted"
import { textAt, valueAt } from "@akasha/pages-system/page-value"
import { nameOf, seatPathForName, supervisorOf } from "@akasha/seat-system/seat-reading"
import { type Stopped, stopping } from "@akasha/seat-system/seat-stopping"
import type { Answer, Given } from "../../command-system/calling/calling.module.code.ts"
import { refused } from "../../command-system/calling/calling.module.code.ts"

const SEAT_TYPE = "01a05035-2609-7463-ba49-ccaf20f5c337"

const SEAT_DIR = "seat-system/seats/pages/"

const SUPERVISOR = "supervisor"

const RESTART = "restart"

const STOP = "stop"

const RESUME = "resume"

const RESET = "reset"

const START = "start"

const ALL = "--all"

const FORCE = "--force"

const PROMPT = "--prompt"

const START_MODE = "--start-mode"

const TARGET = "--agent-id"

const ACTED_ON = `\`${SUPERVISOR}\`, \`${RESUME}\`, \`${RESET}\` and \`${START}\``

const ASK = "reExecAsk"

const ASKED = "asked"

const SIGNAL = "SIGTERM"

const ID = "id"

export type Seat = {
  readonly page: string
  readonly name: string
  readonly holder: Holder | null
}

type Named = { readonly name: string }

type Carried = { readonly carried: readonly string[] }

function quoted(every: readonly string[]): string {
  return every.map((one) => `\`${one}\``).join(", ")
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

function namedIn(word: string, act: string, rest: readonly string[]): Named | Answer {
  const name = rest[0]
  if (name === undefined) {
    return refused(`\`${word}\` names the seat to ${act}, and nothing followed it`, 1)
  }
  if (name.startsWith("-")) {
    return refused(`\`${word}\` names the seat to ${act} first, and \`${name}\` is a flag`, 1)
  }
  return { name }
}

function carriedIn(
  word: string,
  taking: readonly string[],
  flags: readonly string[]
): Carried | Answer {
  const held: string[] = []
  for (let at = 0; at < flags.length; at = at + 2) {
    const one = flags[at]
    if (one !== undefined && taking.includes(one)) {
      const value = flags[at + 1]
      if (value === undefined) {
        return refused(`\`${one}\` names what follows it, and nothing did`, 1)
      }
      held.push(one, value)
      continue
    }
    return refused(
      `\`${word}\` takes ${quoted(taking)} and nothing else, and ` +
        `${quoted(flags.slice(at, at + 1))} followed it`,
      1
    )
  }
  return { carried: held }
}

async function ran(running: () => Promise<void>): Promise<Answer> {
  try {
    await running()
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return refused(why, exitCodeForThrowable(thrown))
  }
  return { report: [], refusals: [], code: 0 }
}

async function stoppedBy(given: Given, rest: readonly string[]): Promise<Answer> {
  const named = namedIn(`${SUPERVISOR} ${STOP}`, STOP, rest)
  if (!("name" in named)) return named
  const flags = rest.slice(1)
  const stray = flags.filter((one) => one !== FORCE)
  if (stray.length > 0) {
    return refused(
      `\`${SUPERVISOR} ${STOP}\` takes \`${FORCE}\` and nothing else, and ${quoted(stray)} followed it`,
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

async function resumedBy(rest: readonly string[]): Promise<Answer> {
  const named = namedIn(RESUME, RESUME, rest)
  if (!("name" in named)) return named
  const carried = carriedIn(RESUME, [PROMPT, START_MODE], rest.slice(1))
  if (!("carried" in carried)) return carried
  const { default: resuming } = await import("@akasha/seat-system/seat-resume")
  return await ran(async () => {
    await resuming([TARGET, named.name, ...carried.carried])
  })
}

async function resetBy(rest: readonly string[]): Promise<Answer> {
  const named = namedIn(RESET, RESET, rest)
  if (!("name" in named)) return named
  const stray = rest.slice(1)
  if (stray.length > 0) {
    return refused(
      `\`${RESET}\` names the seat to reset and takes nothing else, and ${quoted(stray)} followed it`,
      1
    )
  }
  const { default: resetting } = await import("@akasha/seat-system/seat-reset")
  return await ran(async () => {
    await resetting([named.name])
  })
}

async function startedBy(rest: readonly string[]): Promise<Answer> {
  const { default: starting } = await import("@akasha/seat-system/seat-start")
  return await ran(async () => {
    await starting(rest)
  })
}

function restartedAll(given: Given, rest: readonly string[]): Answer {
  if (rest.length !== 1 || rest[0] !== ALL) {
    return refused(`\`${SUPERVISOR} ${RESTART}\` takes \`${ALL}\` and nothing else`, 1)
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

export async function seat(argv: readonly string[], given: Given): Promise<Answer> {
  const [subject, ...rest] = argv
  if (subject === undefined) {
    return refused(
      `${given.calledAs} names what to act on, and nothing followed it — it takes ${ACTED_ON}`,
      1
    )
  }
  if (subject === RESUME) return await resumedBy(rest)
  if (subject === RESET) return await resetBy(rest)
  if (subject === START) return await startedBy(rest)
  if (subject !== SUPERVISOR) {
    return refused(`\`${subject}\` is nothing this acts on — it acts on ${ACTED_ON}`, 1)
  }
  const [act, ...after] = rest
  if (act === undefined) {
    return refused(
      `\`${SUPERVISOR}\` names an act, and nothing followed it — it takes \`${RESTART}\` and \`${STOP}\``,
      1
    )
  }
  if (act === STOP) return await stoppedBy(given, after)
  if (act !== RESTART) {
    return refused(
      `\`${act}\` is nothing this does to a ${SUPERVISOR} — it does \`${RESTART}\` and \`${STOP}\``,
      1
    )
  }
  return restartedAll(given, after)
}
