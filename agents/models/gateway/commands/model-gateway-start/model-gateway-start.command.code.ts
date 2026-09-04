import type { Answer, Given } from "@akasha/command-system/calling"
import {
  type Asked,
  agentIdFor,
  NAMED_ACCOUNT,
  NAMED_VERSION,
  PORT_BUDGET_MS,
  RUN_SEAMS,
  saidOf,
  startedOn,
} from "../../modules/proxy-run/proxy-run.module.code.ts"

const INPUT = 1

const NO_PORT = 3

const AGENT_ID = "--agent-id"

const LOG_DIR = "--log-dir"

const PORT = "--port"

const ACCOUNT = "--account"

const VERSION = "--version"

const KEEP = "--keep"

const SECONDS = "--seconds"

const TAKES_ONE = new Set([AGENT_ID, LOG_DIR, PORT, ACCOUNT, VERSION, SECONDS])

const MS = 1000

function wholeIn(said: string, flag: string): number | string {
  const value = Number(said)
  if (!Number.isInteger(value) || value < 0) return `\`${flag} ${said}\` is no whole number`
  return value
}

export function askedOf(argv: readonly string[], at: number, salt: number): Asked | string {
  let agentId: string | null = null
  let logDir: string | null = null
  let port = 0
  let account = NAMED_ACCOUNT
  let version = NAMED_VERSION
  let keep = false
  let budgetMs = PORT_BUDGET_MS
  for (let one = 0; one < argv.length; one += 1) {
    const word = argv[one]
    if (word === undefined) continue
    if (word === KEEP) {
      keep = true
      continue
    }
    if (!TAKES_ONE.has(word)) return `\`${word}\` is nothing \`akasha gateway-start\` takes`
    const said = argv[one + 1]
    if (said === undefined) return `\`${word}\` takes a value and none came after it`
    one += 1
    if (word === AGENT_ID) agentId = said
    if (word === LOG_DIR) logDir = said
    if (word === ACCOUNT) account = said
    if (word === VERSION) version = said
    if (word === PORT) {
      const value = wholeIn(said, PORT)
      if (typeof value === "string") return value
      if (value > 65535) return `\`${PORT} ${said}\` is over 65535`
      port = value
    }
    if (word === SECONDS) {
      const value = wholeIn(said, SECONDS)
      if (typeof value === "string") return value
      budgetMs = value * MS
    }
  }
  if (account === "") return `\`${ACCOUNT}\` takes a name and an empty one came`
  if (version === "") return `\`${VERSION}\` takes a name and an empty one came`
  return {
    agentId: agentId ?? agentIdFor(at, salt),
    logDir,
    port,
    account,
    version,
    keep,
    budgetMs,
  }
}

export async function modelGatewayStart(argv: readonly string[], given: Given): Promise<Answer> {
  const asked = askedOf(argv, Date.now(), Math.floor(Math.random() * 1_000_000))
  if (typeof asked === "string") return { report: [], refusals: [asked], code: INPUT }
  const started = await startedOn(given.root, asked, RUN_SEAMS)
  if (typeof started === "string") return { report: [], refusals: [started], code: NO_PORT }
  return { report: [...saidOf(started)], refusals: [], code: 0 }
}
