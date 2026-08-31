import { existsSync } from "node:fs"
import { join, resolve } from "node:path"
import { textOf } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { answering } from "../../calling/calling.module.code.ts"
import { bodyAt } from "../../commit-reading/commit-reading.module.code.ts"
import { baseOf } from "../../landing/landing.module.code.ts"
import { carriesFor, pagesOf, renamingFor } from "./type-renaming/type-renaming.module.code.ts"

const RENAME = "rename"

const PAGE_TYPE = "page-type"

const FROM = "--from"

const TO = "--to"

const PLURAL = "--plural"

const DRY_RUN = "--dry-run"

const VALUED = [FROM, TO, PLURAL]

export type Read =
  | { readonly said: ReadonlyMap<string, string>; readonly dryRun: boolean }
  | { readonly refused: string }

export function flagsIn(argv: readonly string[]): Read {
  const said = new Map<string, string>()
  let dryRun = false
  let at = 0
  while (at < argv.length) {
    const token = argv[at]
    if (token === undefined) break
    if (token === DRY_RUN) {
      dryRun = true
      at = at + 1
      continue
    }
    if (!VALUED.includes(token)) {
      return { refused: `\`${token}\` is not a flag this takes — it takes ${VALUED.join(", ")}` }
    }
    const value = argv[at + 1]
    if (value === undefined) return { refused: `${token} needs a value, and the line ends` }
    if (said.has(token)) return { refused: `${token} is said more than once` }
    said.set(token, value)
    at = at + 2
  }
  return { said, dryRun }
}

function planned(root: string, from: string, to: string, plural: string): Answer {
  const stood = baseOf(root)
  const bodyText = (path: string): string | null => {
    const bytes = bodyAt(root, stood, path)
    return bytes === null ? null : textOf(bytes)
  }
  const asked = renamingFor(root, from, to, plural, bodyText)
  if ("refused" in asked) return answering([], [asked.refused], 1)
  const one = asked.renaming
  const carries = carriesFor(root, one, (path) => existsSync(join(root, path)))
  const pages = pagesOf(root, one)
  return answering(
    [
      `\`${from}\` would be renamed to \`${to}\`, and its plural to \`${plural}\``,
      `${one.path} states it, and ${pages.length} page(s) are of it`,
      ...carries.map((held) => `  ${held.from} -> ${held.to}`),
      `${carries.length} file(s) would be carried`,
      `nothing was written — a rename plans here and does not yet land, so ${DRY_RUN} is all it does`,
    ],
    [],
    0
  )
}

export function refactor(argv: readonly string[], given: Given): Answer {
  const [act, namespace, ...rest] = argv
  if (act === undefined) {
    return answering(
      [],
      [`this takes an act, and none was named — say \`${RENAME} ${PAGE_TYPE}\``],
      1
    )
  }
  if (act !== RENAME) {
    return answering([], [`\`${act}\` is no act this carries — it carries \`${RENAME}\``], 1)
  }
  if (namespace !== PAGE_TYPE) {
    const said = namespace === undefined ? "none was named" : `\`${namespace}\` is not one of them`
    return answering(
      [],
      [
        `${RENAME} names the namespace it is worked over, and ${said} — it carries \`${PAGE_TYPE}\``,
      ],
      1
    )
  }
  const read = flagsIn(rest)
  if ("refused" in read) return answering([], [read.refused], 1)
  const from = read.said.get(FROM)
  const to = read.said.get(TO)
  const plural = read.said.get(PLURAL)
  if (from === undefined || to === undefined || plural === undefined) {
    return answering(
      [],
      [`a page type rename takes ${FROM}, ${TO} and ${PLURAL}, and one of them was not said`],
      1
    )
  }
  return planned(resolve(given.root), from, to, plural)
}
