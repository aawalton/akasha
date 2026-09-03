import { readFile } from "node:fs/promises"
import type { Answer } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { operationalError } from "@tools/lib/exit"
import { getHost } from "@tools/lib/inference/hosts"
import { SERVICES } from "@tools/lib/inference/registry"
import type { InferenceHost, InferenceService } from "@tools/lib/inference/schema"

export const OK = 0

export const INPUT = 1

export const DATA = 2

export const OPERATIONAL = 3

export const PROSE_ROUTE = "-file"

export const STDIN = "-"

const CARRIES_A_CODE: ReadonlySet<string> = new Set([
  "ExitError",
  "CliError",
  "InputError",
  "DataError",
  "OperationalError",
])

export type Reading<T> = T | { readonly refused: readonly string[] }

export type Taken = {
  readonly said: string
  readonly aliases?: readonly string[]
  readonly repeat?: boolean
  readonly prose?: boolean
}

export type Said = {
  readonly named: Readonly<Record<string, string>>
  readonly many: Readonly<Record<string, readonly string[]>>
  readonly routed: Readonly<Record<string, readonly string[]>>
  readonly loose: readonly string[]
  readonly flags: ReadonlySet<string>
}

export function told(report: readonly string[]): Answer {
  return { report, refusals: [], code: OK }
}

export function refusedBy(said: readonly string[]): Answer {
  return { report: [], refusals: said, code: INPUT }
}

export function asJson(value: unknown): Answer {
  return told([JSON.stringify(value)])
}

export function codeOf(thrown: unknown): number {
  if (thrown instanceof Error && CARRIES_A_CODE.has(thrown.name)) {
    const held = (thrown as { readonly code?: unknown }).code
    if (typeof held === "number" && held >= INPUT && held <= OPERATIONAL) return held
  }
  return OPERATIONAL
}

export function faulted(thrown: unknown): Answer {
  return { report: [], refusals: [whyOf(thrown)], code: codeOf(thrown) }
}

export async function answering(work: () => Answer | Promise<Answer>): Promise<Answer> {
  try {
    return await work()
  } catch (thrown) {
    return faulted(thrown)
  }
}

export function keyedLines(
  entries: ReadonlyArray<readonly [string, string | number | undefined]>
): readonly string[] {
  const lines: string[] = []
  for (const [key, value] of entries) {
    if (value === undefined) continue
    lines.push(`${key}\t${value}`)
  }
  return lines
}

export function oneCell(value: string): string {
  return value.replace(/\s+/g, " ").trim()
}

function looksLikeFlag(word: string): boolean {
  return word.startsWith("-") && word !== STDIN
}

export function wordsIn(
  argv: readonly string[],
  taking: readonly Taken[],
  switches: readonly string[]
): Reading<Said> {
  const canon = new Map<string, string>()
  const routes = new Map<string, string>()
  const repeats = new Set<string>()
  for (const one of taking) {
    canon.set(one.said, one.said)
    for (const alias of one.aliases ?? []) canon.set(alias, one.said)
    if (one.repeat === true) repeats.add(one.said)
    if (one.prose === true) routes.set(`${one.said}${PROSE_ROUTE}`, one.said)
  }

  const refusals: string[] = []
  const named: Record<string, string> = {}
  const many: Record<string, string[]> = {}
  const routed: Record<string, string[]> = {}
  const loose: string[] = []
  const flags = new Set<string>()

  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (switches.includes(one)) {
      flags.add(one)
      continue
    }
    const route = routes.get(one)
    const held = canon.get(one) ?? route
    if (held !== undefined) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined || looksLikeFlag(value)) {
        refusals.push(`\`${one}\` names a value, and nothing that could be one followed it`)
        continue
      }
      if (route !== undefined) {
        ;(routed[held] ??= []).push(value)
        continue
      }
      if (repeats.has(held)) {
        ;(many[held] ??= []).push(value)
        continue
      }
      named[held] = value
      continue
    }
    if (looksLikeFlag(one)) {
      const takes = [...canon.keys(), ...routes.keys(), ...switches]
        .map((said) => `\`${said}\``)
        .join(", ")
      refusals.push(`\`${one}\` is no flag this takes — it takes ${takes}`)
      continue
    }
    loose.push(one)
  }

  if (refusals.length > 0) return { refused: refusals }
  return { named, many, routed, loose, flags }
}

export function wasRefused<T>(held: Reading<T>): held is { readonly refused: readonly string[] } {
  return typeof held === "object" && held !== null && "refused" in held
}

export function refusalIn<T>(held: Reading<T>): readonly string[] | null {
  return wasRefused(held) ? held.refused : null
}

export function heldOr<T>(value: Reading<T>, refusals: string[]): T | null {
  if (wasRefused(value)) {
    refusals.push(...value.refused)
    return null
  }
  return value
}

export function aloneIn(said: Said, wants: string): Reading<string | undefined> {
  if (said.loose.length > 1) {
    const extra = said.loose
      .slice(1)
      .map((one) => `\`${one}\``)
      .join(", ")
    return { refused: [`this names ${wants} once, and ${extra} followed the one it named`] }
  }
  return said.loose[0]
}

export function nothingLooseIn(said: Said): readonly string[] {
  return said.loose.map((one) => `\`${one}\` follows nothing this takes — it takes flags alone`)
}

async function stdinText(): Promise<string> {
  process.stdin.setEncoding("utf8")
  let held = ""
  for await (const chunk of process.stdin) held += String(chunk)
  return held
}

async function textAt(path: string): Promise<string> {
  if (path === STDIN) return await stdinText()
  return await readFile(path, "utf8")
}

export async function proseAt(said: Said, flag: string): Promise<Reading<string | undefined>> {
  const direct = said.named[flag]
  const paths = said.routed[flag]
  if (direct !== undefined && paths !== undefined) {
    return { refused: [`\`${flag}\` was said both as itself and as \`${flag}${PROSE_ROUTE}\``] }
  }
  if (direct !== undefined) return direct
  if (paths === undefined) return undefined
  const held: string[] = []
  for (const path of paths) {
    try {
      held.push(await textAt(path))
    } catch {
      return { refused: [`\`${flag}${PROSE_ROUTE}\` names \`${path}\`, which will not read`] }
    }
  }
  return held.join("")
}

export async function proseNeededAt(said: Said, flag: string): Promise<Reading<string>> {
  const held = await proseAt(said, flag)
  if (wasRefused(held)) return held
  if (held === undefined) {
    return { refused: [`this names \`${flag}\` or \`${flag}${PROSE_ROUTE}\`, and nothing did`] }
  }
  return held
}

export function countAt(
  said: Said,
  flag: string,
  fallback: number | undefined
): Reading<number | undefined> {
  const raw = said.named[flag]
  if (raw === undefined) return fallback
  if (!/^\d+$/.test(raw)) {
    return {
      refused: [`\`${flag}\` takes a whole number at or above zero, and \`${raw}\` is not one`],
    }
  }
  const held = Number(raw)
  if (!Number.isSafeInteger(held)) {
    return { refused: [`\`${raw}\` is past the largest whole number that can be read`] }
  }
  return held
}

export function oneOf(
  said: Said,
  flag: string,
  every: readonly string[],
  fallback: string | undefined
): Reading<string | undefined> {
  const held = said.named[flag] ?? fallback
  if (held === undefined) return undefined
  if (!every.includes(held)) {
    return {
      refused: [`\`${flag}\` takes one of ${every.join(", ")}, and \`${held}\` is none of them`],
    }
  }
  return held
}

export type Reached = {
  readonly service: InferenceService
  readonly host: InferenceHost
  readonly baseUrl: string
}

export function serviceNamed(name: string): Reached {
  const service = SERVICES.find((one) => one.name === name)
  if (service === undefined) {
    throw operationalError(`no ${name} service is declared in the registry`)
  }
  const host = getHost(service.host)
  return { service, host, baseUrl: `http://${host.address}:${service.port}` }
}

export function targetOf(host: InferenceHost): {
  readonly user: string
  readonly host: string
  readonly keyPath: string
} {
  return { user: host.user, host: host.address, keyPath: host.keyPath }
}

export function calledAs(slug: string, argv: readonly string[]): string {
  const quoted = argv.map((one) => (/\s/.test(one) ? `'${one}'` : one))
  return `akasha ${slug} ${quoted.join(" ")}`.trim()
}

export function wroteTo(path: string, bytes: Uint8Array, what: string): string {
  return `wrote ${bytes.byteLength} bytes (${what}) to ${path}`
}
