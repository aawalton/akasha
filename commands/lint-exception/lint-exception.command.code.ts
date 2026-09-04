import { existsSync, statSync } from "node:fs"
import { isAbsolute, join, relative, resolve } from "node:path"
import {
  BREAK_GLASS,
  bytesAt,
  landingAsked,
  mistaking,
  textOf,
  wroteAndTook,
} from "../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../command-system/calling/calling.module.code.ts"
import {
  glassIn,
  MESSAGE,
  MESSAGE_FILE,
  messageIn,
  unknownIn,
  valuesOf,
} from "../../command-system/commands/write/write.command.code.ts"
import { whyOf } from "../../command-system/fault-saying/fault-saying.module.code.ts"

export const PACKAGE_PATH = "--package-path"

export const RULE = "--rule"

export const CONFIG = "biome.json"

export const OFF = "off"

export const OVERRIDES = "overrides"

export const INCLUDES = "includes"

export const UNDER = "/**"

const VALUED = [PACKAGE_PATH, RULE, MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const BARE: readonly string[] = []

export type Ruled = {
  readonly group: string
  readonly name: string
}

export type Placed = { readonly text: string } | { readonly refusal: string }

export function objectIn(value: unknown): Record<string, unknown> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null
  return value as Record<string, unknown>
}

export function textsIn(value: unknown): readonly string[] | null {
  if (!Array.isArray(value)) return null
  for (const one of value) {
    if (typeof one !== "string") return null
  }
  return value as readonly string[]
}

export function ruleIn(said: string): Ruled | null {
  const parts = said.split("/")
  const group = parts[0] ?? ""
  const name = parts[1] ?? ""
  if (parts.length !== 2 || group === "" || name === "") return null
  return { group, name }
}

export function turningOff(config: Record<string, unknown>, ruled: Ruled): readonly number[] {
  const every = config[OVERRIDES]
  if (!Array.isArray(every)) return []
  const found: number[] = []
  for (const [at, one] of every.entries()) {
    const held = objectIn(one)
    const linter = held === null ? null : objectIn(held["linter"])
    const rules = linter === null ? null : objectIn(linter["rules"])
    const group = rules === null ? null : objectIn(rules[ruled.group])
    if (group !== null && group[ruled.name] === OFF) found.push(at)
  }
  return found
}

export function includesAt(config: Record<string, unknown>, at: number): readonly string[] | null {
  const every = config[OVERRIDES]
  if (!Array.isArray(every)) return null
  const held = objectIn(every[at])
  return held === null ? null : textsIn(held[INCLUDES])
}

export function arrayEnd(text: string, key: string): number {
  const named = text.indexOf(`"${key}"`)
  if (named < 0) return -1
  const open = text.indexOf("[", named)
  if (open < 0) return -1
  let deep = 0
  let quoted = false
  let escaped = false
  for (let at = open; at < text.length; at += 1) {
    const one = text[at]
    if (escaped) {
      escaped = false
      continue
    }
    if (quoted) {
      if (one === "\\") escaped = true
      else if (one === '"') quoted = false
      continue
    }
    if (one === '"') {
      quoted = true
      continue
    }
    if (one === "[" || one === "{") deep += 1
    if (one === "]" || one === "}") {
      deep -= 1
      if (deep === 0) return at
    }
  }
  return -1
}

export function besideGlob(text: string, after: string, glob: string): Placed {
  const said = JSON.stringify(after)
  const at = text.indexOf(said)
  if (at < 0) {
    return {
      refusal: `${said} is a value of the config and is nowhere in its text, so no passage names the place \`${glob}\` would join`,
    }
  }
  if (text.indexOf(said, at + said.length) >= 0) {
    return {
      refusal: `${said} is in the config more than once, so no one passage names the override \`${glob}\` would join`,
    }
  }
  const end = at + said.length
  return { text: `${text.slice(0, end)}, ${JSON.stringify(glob)}${text.slice(end)}` }
}

export function overrideMade(text: string, ruled: Ruled, glob: string): Placed {
  const end = arrayEnd(text, OVERRIDES)
  if (end < 0) {
    return { refusal: `the config carries no \`${OVERRIDES}\` a new override could join` }
  }
  const before = text.slice(0, end).trimEnd()
  const lead = before.endsWith("[") ? "" : ","
  const made = JSON.stringify({
    [INCLUDES]: [glob],
    linter: { rules: { [ruled.group]: { [ruled.name]: OFF } } },
  })
  return { text: `${before}${lead}${made}${text.slice(end)}` }
}

export function agreeing(text: string, ruled: Ruled, globs: readonly string[]): string | null {
  let held: unknown
  try {
    held = JSON.parse(text)
  } catch (thrown) {
    return `the config this would land does not parse as json — ${whyOf(thrown)}`
  }
  const config = objectIn(held)
  if (config === null) return "the config this would land is no object"
  const found = turningOff(config, ruled)
  const named = `\`${ruled.group}/${ruled.name}\``
  if (found.length !== 1) {
    return `the config this would land carries ${found.length} overrides turning ${named} off, and one is what was meant`
  }
  const at = found[0] ?? 0
  const carried = includesAt(config, at) ?? []
  const missed = globs.filter((one) => !carried.includes(one))
  if (missed.length > 0) {
    return `the config this would land carries none of \`${missed.join("`, `")}\` in the override each was to join`
  }
  return null
}

export type Wanted = {
  readonly globs: readonly string[]
  readonly refusals: readonly string[]
}

export function globsIn(root: string, said: readonly (string | null)[]): Wanted {
  const globs: string[] = []
  const refusals: string[] = []
  const seen = new Set<string>()
  for (const one of said) {
    if (one === null) {
      refusals.push(`${PACKAGE_PATH} takes a path, and none follows it`)
      continue
    }
    const full = isAbsolute(one) ? resolve(one) : resolve(root, one)
    const rel = relative(root, full)
    if (rel === "" || isAbsolute(rel) || rel.startsWith("..")) {
      refusals.push(`${one} is outside this repository, and the linter judges what is in it`)
      continue
    }
    if (!existsSync(full)) {
      refusals.push(
        `${one} names nothing that is there, and an exception for a package that is not there judges nothing`
      )
      continue
    }
    if (!statSync(full).isDirectory()) {
      refusals.push(`${one} is a file, and an exception is said over a package`)
      continue
    }
    const glob = `${rel}${UNDER}`
    if (seen.has(glob)) {
      refusals.push(`${one} is named more than once by one call`)
      continue
    }
    seen.add(glob)
    globs.push(glob)
  }
  return { globs, refusals }
}

export type Worked =
  | {
      readonly text: string
      readonly added: readonly string[]
      readonly carried: readonly string[]
    }
  | { readonly refusals: readonly string[] }

export function working(
  was: string,
  config: Record<string, unknown>,
  ruled: Ruled,
  globs: readonly string[]
): Worked {
  const found = turningOff(config, ruled)
  if (found.length > 1) {
    return {
      refusals: [
        `${found.length} overrides turn \`${ruled.group}/${ruled.name}\` off, so which one a package joins is not settled`,
      ],
    }
  }
  const at = found[0]
  const already = at === undefined ? [] : (includesAt(config, at) ?? [])
  const held = new Set(already)
  let last = at === undefined ? null : (already[already.length - 1] ?? null)
  let text = was
  const added: string[] = []
  const carried: string[] = []
  for (const glob of globs) {
    if (held.has(glob)) {
      carried.push(glob)
      continue
    }
    const put = last === null ? overrideMade(text, ruled, glob) : besideGlob(text, last, glob)
    if ("refusal" in put) return { refusals: [put.refusal] }
    text = put.text
    held.add(glob)
    added.push(glob)
    last = glob
  }
  if (added.length > 0) {
    const wrong = agreeing(text, ruled, [...held])
    if (wrong !== null) return { refusals: [wrong] }
  }
  return { text, added, carried }
}

export function lintException(argv: readonly string[], given: Given): Answer {
  const unknown = unknownIn(argv, VALUED, BARE)
  if (unknown.length > 0) return mistaking(unknown)
  const said = valuesOf(argv, RULE, VALUED)
  if (said.length !== 1) {
    return mistaking([
      `${RULE} is given ${said.length} times, and one call says one rule — say it as \`${RULE} <group>/<name>\``,
    ])
  }
  const named = said[0]
  const ruled = named === null || named === undefined ? null : ruleIn(named)
  if (ruled === null) {
    return mistaking([
      `${RULE} names no rule — say it as \`<group>/<name>\`, as in \`suspicious/noApproximativeNumericConstant\``,
    ])
  }
  const root = resolve(given.root)
  const wanted = globsIn(root, valuesOf(argv, PACKAGE_PATH, VALUED))
  if (wanted.refusals.length > 0) return mistaking(wanted.refusals)
  if (wanted.globs.length === 0) {
    return mistaking([`this call names no ${PACKAGE_PATH}, so it asks for no exception`])
  }
  const glass = glassIn(argv, VALUED)
  if ("refusals" in glass) return mistaking(glass.refusals)
  const message = messageIn(argv, VALUED)
  if ("refusals" in message) return mistaking(message.refusals)

  const held = bytesAt(join(root, CONFIG))
  if ("absent" in held) {
    return mistaking(["the linter's config is not there, so no exception can be said against it"])
  }
  if ("unreadable" in held) {
    return mistaking([`the linter's config would not open — ${held.unreadable}`])
  }
  const was = textOf(held.bytes)
  if (was === null) return mistaking(["the linter's config is not text"])
  let parsed: unknown
  try {
    parsed = JSON.parse(was)
  } catch (thrown) {
    return mistaking([`the linter's config does not parse as json — ${whyOf(thrown)}`])
  }
  const config = objectIn(parsed)
  if (config === null) return mistaking(["the linter's config is no object"])

  const worked = working(was, config, ruled, wanted.globs)
  if ("refusals" in worked) {
    return { report: [], refusals: [...worked.refusals, "nothing was written"], code: 2 }
  }
  const over = worked.carried.map(
    (one) => `\`${one}\` is already carried by the override, and nothing was added for it`
  )
  if (worked.added.length === 0) {
    return {
      report: [...over, "nothing was asked for that the override does not already carry"],
      refusals: [],
      code: 0,
    }
  }
  return landingAsked(given, {
    changes: [{ path: CONFIG, body: new TextEncoder().encode(worked.text) }],
    message:
      message.message ??
      `the linter no longer judges \`${ruled.group}/${ruled.name}\` over ${worked.added.join(", ")}`,
    dryRun: false,
    glass: glass.glass,
    unmoved: [{ path: CONFIG, was: held.bytes }],
    saying: (landed) => [
      ...over,
      ...worked.added.map(
        (one) => `\`${ruled.group}/${ruled.name}\` is no longer judged over \`${one}\``
      ),
      ...wroteAndTook(landed),
    ],
  })
}
