import { alive, type Holder } from "@akasha/file-system/lock-holder"
import { everyOfType, typeSlugOf } from "@akasha/indexes"
import { mergeUncommitted, uncommittedIn } from "@akasha/pages-system/page-uncommitted"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { refused } from "../../calling/calling.module.code.ts"

const SEAT_TYPE = "01a05035-2609-7463-ba49-ccaf20f5c337"

const SEAT_DIR = "akasha/seat-system/seat/seats/"

const SEAT_TAIL = ".seat.ts"

const SUPERVISOR = "supervisor"

const RESTART = "restart"

const ALL = "--all"

const ASK = "reExecAsk"

const ASKED = "asked"

const HELD = "supervisorProcess"

const UNKNOWN = "-"

const SIGNAL = "SIGTERM"

export type Standing = {
  readonly page: string
  readonly name: string
  readonly holder: Holder | null
}

export function nameOf(page: string): string {
  const bare = page.startsWith(SEAT_DIR) ? page.slice(SEAT_DIR.length) : page
  return bare.endsWith(SEAT_TAIL) ? bare.slice(0, -SEAT_TAIL.length) : bare
}

export function holderIn(said: unknown): Holder | null {
  if (typeof said !== "string" || said === "") return null
  const at = said.lastIndexOf("-")
  if (at < 1) return null
  const pid = Number.parseInt(said.slice(0, at), 10)
  const started = said.slice(at + 1)
  if (Number.isNaN(pid) || pid < 1) return null
  if (started === "" || started === UNKNOWN) return null
  return { pid, started }
}

function seatsIn(root: string): readonly Standing[] {
  const found: Standing[] = []
  for (const one of everyOfType(root, typeSlugOf(root, SEAT_TYPE))) {
    if (!one.path.startsWith(SEAT_DIR)) continue
    const beside = uncommittedIn(root, one.path)
    const said = beside === null ? null : (beside as Record<string, unknown>)[HELD]
    found.push({ page: one.path, name: nameOf(one.path), holder: holderIn(said) })
  }
  return [...found].sort((one, other) => (one.name < other.name ? -1 : 1))
}

function restarted(root: string, standing: Standing): string {
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

export function seat(argv: readonly string[], given: Given): Answer {
  const [subject, act, ...rest] = argv
  if (subject === undefined) {
    return refused(
      `${given.calledAs} names what to act on, and nothing followed it — it takes \`${SUPERVISOR}\``,
      1
    )
  }
  if (subject !== SUPERVISOR) {
    return refused(`\`${subject}\` is nothing this acts on — it acts on \`${SUPERVISOR}\``, 1)
  }
  if (act === undefined) {
    return refused(
      `\`${SUPERVISOR}\` names an act, and nothing followed it — it takes \`${RESTART}\``,
      1
    )
  }
  if (act !== RESTART) {
    return refused(`\`${act}\` is nothing this does to a ${SUPERVISOR} — it does \`${RESTART}\``, 1)
  }
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
