import { appNamesIn } from "akasha/infrastructure/services/web-apps/dev-server-stating/dev-server-stating.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

export const BOOTSTRAP = "bootstrap"

export const LOGS = "logs"

export const RESTART = "restart"

export const START = "start"

export const STATUS = "status"

export const STOP = "stop"

const ACTS = [BOOTSTRAP, LOGS, RESTART, START, STATUS, STOP]

export const SEQ = "--seq"

export const APP = "--app"

const PORT = "--port"

const TAIL = "--tail"

export const FORCE = "--force"

const ALL = "--all"

const JSON_LINE = "--json"

const VALUED = [SEQ, APP, PORT, TAIL]

const BARE = [FORCE, ALL, JSON_LINE]

const TAKEN: Record<string, readonly string[]> = {
  [BOOTSTRAP]: [SEQ, APP, FORCE, JSON_LINE],
  [LOGS]: [SEQ, APP, TAIL],
  [RESTART]: [SEQ, APP, PORT, JSON_LINE],
  [START]: [SEQ, APP, PORT, JSON_LINE],
  [STATUS]: [SEQ, APP, JSON_LINE],
  [STOP]: [SEQ, APP, ALL, JSON_LINE],
}

const TAIL_BY_DEFAULT = 100

export type Read =
  | {
      readonly act: string
      readonly seq: number | null
      readonly app: string | null
      readonly port: number | null
      readonly tail: number
      readonly force: boolean
      readonly all: boolean
      readonly json: boolean
    }
  | { readonly refused: readonly string[] }

function acts(): string {
  return namesDrawn(ACTS)
}

function wholeIn(said: string): number | null {
  const held = Number(said)
  if (!Number.isInteger(held) || held < 0) return null
  return held
}

export function readIn(argv: readonly string[], root: string): Read {
  const refusals: string[] = []
  const words: string[] = []
  const said = new Map<string, string>()
  let force = false
  let all = false
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (VALUED.includes(one)) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined || value.startsWith("-")) {
        refusals.push(`\`${one}\` names a value, and none followed it`)
        continue
      }
      said.set(one, value)
      continue
    }
    if (one === FORCE) {
      force = true
      continue
    }
    if (one === ALL) {
      all = true
      continue
    }
    if (one === JSON_LINE) {
      json = true
      continue
    }
    if (one.startsWith("-")) {
      refusals.push(
        `\`${one}\` is no flag this takes — it takes \`${[...VALUED, ...BARE].join("`, `")}\``
      )
      continue
    }
    words.push(one)
  }
  const act = words[0]
  if (act === undefined) {
    return { refused: [...refusals, `this names no act — it carries ${acts()}`] }
  }
  const taken = TAKEN[act]
  if (taken === undefined) {
    return {
      refused: [...refusals, `\`${act}\` is no act this carries — it carries ${acts()}`],
    }
  }
  const rest = words.slice(1)
  if (rest.length > 1) {
    refusals.push(`\`${rest[1]}\` follows the seq, and one call names one act and one seq`)
  }
  const loose = rest[0]
  if (loose !== undefined) {
    if (said.has(SEQ)) {
      refusals.push(`\`${loose}\` sits where the seq goes, and \`${SEQ}\` already names one`)
    } else {
      said.set(SEQ, loose)
    }
  }
  for (const flag of [...VALUED, ...BARE]) {
    const named =
      flag === FORCE ? force : flag === ALL ? all : flag === JSON_LINE ? json : said.has(flag)
    if (named && !taken.includes(flag)) {
      refusals.push(`\`${act}\` does not take \`${flag}\` — it takes \`${taken.join("`, `")}\``)
    }
  }
  const seqSaid = said.get(SEQ)
  const seq = seqSaid === undefined ? null : wholeIn(seqSaid)
  if (seqSaid !== undefined && seq === null) {
    refusals.push(`\`${SEQ}\` names a whole number that is not negative, and \`${seqSaid}\` is not`)
  }
  const portSaid = said.get(PORT)
  const port = portSaid === undefined ? null : wholeIn(portSaid)
  if (portSaid !== undefined && port === null) {
    refusals.push(
      `\`${PORT}\` names a whole number that is not negative, and \`${portSaid}\` is not`
    )
  }
  const tailSaid = said.get(TAIL)
  const tail = tailSaid === undefined ? TAIL_BY_DEFAULT : wholeIn(tailSaid)
  if (tailSaid !== undefined && (tail === null || tail === 0)) {
    refusals.push(`\`${TAIL}\` names a whole number above nothing, and \`${tailSaid}\` is not`)
  }
  const app = said.get(APP) ?? null
  if (act === STOP) {
    if (all && (seq !== null || app !== null)) {
      refusals.push(
        `\`${STOP}\` reaches one server or every one of them, and \`${ALL}\` names both`
      )
    }
    if (!all && (seq === null || app === null)) {
      refusals.push(`\`${STOP}\` takes \`${ALL}\`, or both \`${SEQ}\` and \`${APP}\``)
    }
  } else if (act !== STATUS) {
    if (seq === null) refusals.push(`\`${act}\` names a seq, and none was said`)
    if (app === null) {
      refusals.push(`\`${act}\` names an app — it takes \`${appNamesIn(root).join("`, `")}\``)
    }
  }
  if (refusals.length > 0) return { refused: refusals }
  return { act, seq, app, port, tail: tail ?? TAIL_BY_DEFAULT, force, all, json }
}
