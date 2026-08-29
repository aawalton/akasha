import { resolve } from "node:path"
import type { Found } from "../../../code-system/code-lint/code-lint.module.code.ts"
import { lintedOver } from "../../../code-system/code-lint/code-lint.module.code.ts"
import type { Answer, Given, Surface } from "../../calling/calling.module.code.ts"
import { aiming, bounded } from "../test/test.command.code.ts"

const FILE_PATH = "--file-path"

const INSIDE = "akasha"

export const surface: Surface = {
  taking: [
    { said: `${FILE_PATH} <path>`, takes: "a file or folder under `akasha/` the linter reads" },
  ],
  notes: [
    `${FILE_PATH} repeats, so several paths are read in one call.`,
    `named nothing, it reads every file under \`${INSIDE}/\`.`,
    "nothing is written — this says what the linter found and fixes none of it.",
  ],
}

type Meant = {
  readonly paths: readonly string[]
  readonly refusal: string | null
}

function meaning(argv: readonly string[]): Meant {
  const paths: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at] ?? ""
    if (one !== FILE_PATH) {
      return {
        paths: [],
        refusal: `\`${one}\` is not an argument this takes — it takes \`${FILE_PATH} <path>\``,
      }
    }
    const value = argv[at + 1]
    if (value === undefined) {
      return { paths: [], refusal: `${FILE_PATH} names a path, and nothing followed it` }
    }
    paths.push(value)
    at += 1
  }
  return { paths, refusal: null }
}

export function many(held: number, one: string): string {
  return `${held} ${held === 1 ? one : `${one}s`}`
}

function markOf(one: Found): string {
  return `${one.path}:${one.line}:${one.column}`
}

export function reportOf(found: readonly Found[]): readonly string[] {
  const held = new Map<string, Found[]>()
  for (const one of found) {
    const group = held.get(one.path)
    if (group === undefined) held.set(one.path, [one])
    else group.push(one)
  }
  const said: string[] = []
  for (const group of held.values()) {
    if (said.length > 0) said.push("")
    let wide = 0
    let ruled = 0
    for (const one of group) {
      if (markOf(one).length > wide) wide = markOf(one).length
      if (one.rule.length > ruled) ruled = one.rule.length
    }
    for (const one of group) {
      said.push(`${markOf(one).padEnd(wide)}  ${one.rule.padEnd(ruled)}  ${one.said}`.trimEnd())
    }
  }
  return said
}

export function sayingOf(found: readonly Found[]): readonly string[] {
  const files = new Set(found.map((one) => one.path)).size
  const counted = `${many(found.length, "finding")} in ${many(files, "file")}.`
  return [...bounded([...reportOf(found), "", counted].join("\n"))]
}

export function lint(argv: readonly string[], given: Given): Answer {
  const meant = meaning(argv)
  if (meant.refusal !== null) return { report: [], refusals: [meant.refusal], code: 1 }
  const aimed = aiming(meant.paths, given)
  if (aimed.refusals.length > 0) return { report: [], refusals: aimed.refusals, code: 1 }
  const over = `\`${aimed.named.join("`, `")}\``
  const linted = lintedOver(resolve(given.root), aimed.named)
  if (linted.failed !== null) {
    return {
      report: [],
      refusals: [
        `${linted.failed}. A linter that could not look has verified nothing, so this says ` +
          `nothing about what stands under ${over}.`,
      ],
      code: 3,
    }
  }
  if (linted.found.length === 0) {
    return { report: [`the linter found nothing under ${over}.`], refusals: [], code: 0 }
  }
  return { report: [...sayingOf(linted.found)], refusals: [], code: 1 }
}
