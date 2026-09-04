import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { DataError, OperationalError } from "@akasha/errors-core/exit-code"

export const AKASHA_FILE_CEILING_BYTES = 15_000

export const RUN_LINE_BUDGET_BYTES = 13_501

const MODULE_PAGE_TYPE_REL = "code-system/modules/module.page-type.ts"

const encoder = new TextEncoder()

export function byteLength(text: string): number {
  return encoder.encode(text).length
}

export function packLines(
  lines: readonly string[],
  budgetBytes: number
): readonly (readonly string[])[] {
  const runs: string[][] = []
  let current: string[] = []
  let bytes = 0
  for (const line of lines) {
    const cost = byteLength(line) + 1
    if (current.length > 0 && bytes + cost >= budgetBytes) {
      runs.push(current)
      current = []
      bytes = 0
    }
    current.push(line)
    bytes += cost
  }
  if (current.length > 0) runs.push(current)
  return runs
}

export function ordinalWidth(runs: number): number {
  return Math.max(2, String(runs - 1).length)
}

function ordinal(index: number, width: number): string {
  return String(index).padStart(width, "0")
}

function kebabToPascal(word: string): string {
  const [first] = word
  return first === undefined ? "" : first.toUpperCase() + word.slice(1)
}

function kebabToCamel(slug: string): string {
  const [head, ...rest] = slug.split("-")
  return (head ?? "") + rest.map(kebabToPascal).join("")
}

function runBinding(binding: string, index: number, width: number): string {
  return `${binding}_${ordinal(index, width)}`
}

function runSlug(stem: string, index: number, width: number): string {
  return `${stem}-${ordinal(index, width)}`
}

export interface SeriesSpec {
  readonly generatedDirRel: string
  readonly stem: string
  readonly binding: string
  readonly names: readonly string[]
  readonly runDefinition: string
  readonly aggregateDefinition: string
  readonly provenance: readonly string[]
}

export interface SeriesPage {
  readonly slug: string
  readonly pageRel: string
  readonly codeRel: string
  readonly page: string
  readonly code: string
  readonly held: number
}

function folderRel(spec: SeriesSpec, slug: string): string {
  return join(spec.generatedDirRel, slug)
}

function pageRelOf(spec: SeriesSpec, slug: string): string {
  return join(folderRel(spec, slug), `${slug}.module.ts`)
}

function codeRelOf(spec: SeriesSpec, slug: string): string {
  return join(folderRel(spec, slug), `${slug}.module.code.ts`)
}

function pageIdFor(root: string, spec: SeriesSpec, slug: string): string {
  const at = resolve(root, pageRelOf(spec, slug))
  if (existsSync(at)) {
    const found = /^\s*id:\s*"([0-9a-f-]{36})",?\s*$/m.exec(readFileSync(at, "utf8"))
    if (found?.[1] !== undefined) return found[1]
  }
  return Bun.randomUUIDv7()
}

function renderPageFile(root: string, spec: SeriesSpec, slug: string, definition: string): string {
  const typeImport = relative(
    resolve(root, folderRel(spec, slug)),
    resolve(root, MODULE_PAGE_TYPE_REL)
  )
  return (
    [
      `import type { Module } from "${typeImport}"`,
      "",
      `export const ${kebabToCamel(slug)} = {`,
      `  id: ${JSON.stringify(pageIdFor(root, spec, slug))},`,
      '  pageTypeSlug: "module",',
      `  slug: ${JSON.stringify(slug)},`,
      `  definition: ${JSON.stringify(definition)},`,
      '  code: "ts",',
      "} as const satisfies Module",
    ].join("\n") + "\n"
  )
}

function renderRun(
  root: string,
  spec: SeriesSpec,
  lines: readonly string[],
  index: number,
  width: number
): SeriesPage {
  const slug = runSlug(spec.stem, index, width)
  return {
    slug,
    pageRel: pageRelOf(spec, slug),
    codeRel: codeRelOf(spec, slug),
    page: renderPageFile(root, spec, slug, spec.runDefinition),
    code:
      [
        `export const ${runBinding(spec.binding, index, width)}: readonly string[] = [`,
        ...lines,
        "]",
      ].join("\n") + "\n",
    held: lines.length,
  }
}

function renderAggregate(root: string, spec: SeriesSpec, runs: number, width: number): SeriesPage {
  const each = <T>(f: (i: number) => T): T[] => Array.from({ length: runs }, (_unused, i) => f(i))
  const body = [
    ...each((i) => {
      const slug = runSlug(spec.stem, i, width)
      return `import { ${runBinding(spec.binding, i, width)} } from "../${slug}/${slug}.module.code.ts"`
    }),
    "",
    `export const ${spec.binding}_PROVENANCE: readonly string[] = [`,
    ...spec.provenance.map((line) => `  ${JSON.stringify(line)},`),
    "]",
    "",
    `export const ${spec.binding}: ReadonlySet<string> = new Set<string>([`,
    ...each((i) => `  ...${runBinding(spec.binding, i, width)},`),
    "])",
  ].join("\n")
  return {
    slug: spec.stem,
    pageRel: pageRelOf(spec, spec.stem),
    codeRel: codeRelOf(spec, spec.stem),
    page: renderPageFile(root, spec, spec.stem, spec.aggregateDefinition),
    code: `${body}\n`,
    held: 0,
  }
}

export function renderSeries(root: string, spec: SeriesSpec): readonly SeriesPage[] {
  if (spec.names.length === 0) {
    throw new DataError(
      `${spec.stem} would hold no name — an empty census reads to every consumer as a clean answer, so nothing was rendered`
    )
  }
  const lines = spec.names.map((name) => `  ${JSON.stringify(name)},`)
  for (const line of lines) {
    const size = byteLength(line)
    if (size >= RUN_LINE_BUDGET_BYTES) {
      throw new DataError(
        `one name rendered to ${String(size)} bytes on a line, which no run of ${String(RUN_LINE_BUDGET_BYTES)} bytes can hold, so nothing was rendered: ${line.trim().slice(0, 120)}`
      )
    }
  }

  const packed = packLines(lines, RUN_LINE_BUDGET_BYTES)
  const width = ordinalWidth(packed.length)
  const pages: SeriesPage[] = [
    ...packed.map((run, i) => renderRun(root, spec, run, i, width)),
    renderAggregate(root, spec, packed.length, width),
  ]

  for (const page of pages) {
    const size = byteLength(page.code)
    if (size >= AKASHA_FILE_CEILING_BYTES) {
      throw new DataError(
        `${page.codeRel} rendered to ${String(size)} bytes, at or past the ${String(AKASHA_FILE_CEILING_BYTES)} byte refusal, so nothing was rendered`
      )
    }
  }

  const composed = pages.slice(0, -1).reduce((sum, page) => sum + page.held, 0)
  if (composed !== spec.names.length) {
    throw new OperationalError(
      `the runs hold ${String(composed)} name(s) where the census holds ${String(spec.names.length)} — the division dropped something, so nothing was rendered`
    )
  }
  return pages
}

export function runSlugsStanding(root: string, spec: SeriesSpec): readonly string[] {
  const at = resolve(root, spec.generatedDirRel)
  if (!existsSync(at)) return []
  const pattern = new RegExp(`^${spec.stem}-\\d+$`)
  return readdirSync(at, { withFileTypes: true })
    .filter((one) => one.isDirectory())
    .map((one) => one.name)
    .filter((name) => pattern.test(name))
    .sort()
}

export interface StagedFile {
  readonly rel: string
  readonly at: string | null
  readonly standing: boolean
}

export interface Staged {
  readonly files: readonly StagedFile[]
  readonly goneRels: readonly string[]
  readonly changed: readonly string[]
  readonly landAt: string | null
}

function standsWith(root: string, rel: string, body: string): boolean {
  const at = resolve(root, rel)
  if (!existsSync(at)) return false
  return readFileSync(at, "utf8") === body
}

function quoted(word: string): string {
  return `'${word.replaceAll("'", `'\\''`)}'`
}

export function stageSeries(
  root: string,
  spec: SeriesSpec,
  pages: readonly SeriesPage[],
  stage: string,
  message: string
): Staged {
  const kept = new Set(pages.map((one) => one.slug))
  const goneRels = runSlugsStanding(root, spec)
    .filter((slug) => !kept.has(slug))
    .map((slug) => pageRelOf(spec, slug))

  const files: StagedFile[] = []
  const argv: string[] = []
  const changed: string[] = []

  for (const page of pages) {
    const candidates: readonly (readonly [string, string, boolean])[] = [
      [page.codeRel, page.code, false],
      [page.pageRel, page.page, true],
    ]
    for (const [rel, body, isPage] of candidates) {
      const stands = existsSync(resolve(root, rel))
      if (isPage && stands) {
        files.push({ rel, at: null, standing: true })
        continue
      }
      if (standsWith(root, rel, body)) {
        files.push({ rel, at: null, standing: true })
        continue
      }
      const at = join(stage, rel)
      mkdirSync(dirname(at), { recursive: true })
      writeFileSync(at, body)
      files.push({ rel, at, standing: stands })
      changed.push(rel)
      argv.push("--file-path", rel, "--content-file", at)
    }
  }

  for (const rel of goneRels) argv.push("--remove", rel)

  if (argv.length === 0) return { files, goneRels, changed, landAt: null }

  const messageAt = join(stage, "message.txt")
  mkdirSync(dirname(messageAt), { recursive: true })
  writeFileSync(messageAt, `${message}\n`)
  argv.push("--message-file", messageAt)

  const landAt = join(stage, "land.sh")
  writeFileSync(
    landAt,
    `#!/usr/bin/env bash\nset -euo pipefail\nakasha write \\\n  ${argv.map(quoted).join(" \\\n  ")}\n`
  )
  return { files, goneRels, changed, landAt }
}
