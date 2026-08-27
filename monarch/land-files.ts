
import { spawn } from "node:child_process"
import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { toolArgv } from "../tools/lib/tool-argv.ts"
import type { MonarchTransaction } from "./client.ts"
import { accountPages, categoryPages, keyOf, monthOf, monthSlugs, sidecarOf, tagPages } from "./files.ts"
import type { TransactionLine } from "./files.ts"
import { AKASHA, monthPagePath } from "./files.ts"
import { AKASHA as AKASHA_REPO } from "../repo/roots/roots"

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

export interface WriteItem {
  readonly file_path: string
  readonly content: string
}

async function byMonarchId(
  pages: () => Promise<readonly { slug: string; path: string; document: unknown }[]>
): Promise<ReadonlyMap<string, string>> {
  const held = new Map<string, string>()
  for (const page of await pages()) {
    const id = keyOf(page as never, "monarch-id")
    if (id !== null && id !== "") held.set(id, page.slug)
  }
  return held
}

export interface SlugMaps {
  readonly accounts: ReadonlyMap<string, string>
  readonly accountNames: ReadonlyMap<string, string>
  readonly categories: ReadonlyMap<string, string>
  readonly tags: ReadonlyMap<string, string>
}

export async function slugMaps(): Promise<SlugMaps> {
  const accountNames = new Map<string, string>()
  for (const page of await accountPages()) {
    const id = keyOf(page, "monarch-id")
    if (id !== null) accountNames.set(id, keyOf(page, "display-name") ?? page.title)
  }
  return {
    accounts: await byMonarchId(accountPages),
    accountNames,
    categories: await byMonarchId(categoryPages),
    tags: await byMonarchId(tagPages),
  }
}

function raw(t: MonarchTransaction, name: string): string | null {
  const held = t.raw
  if (held === null || typeof held !== "object") return null
  const value = (held as Record<string, unknown>)[name]
  return typeof value === "string" && value !== "" ? value : null
}

export function lineOf(t: MonarchTransaction, maps: SlugMaps): TransactionLine | null {
  if (t.account === null) return null
  const accountSlug = maps.accounts.get(t.account.id)
  if (accountSlug === undefined) return null
  const line: Record<string, unknown> = {
    id: Bun.randomUUIDv7(),
    "monarch-id": t.id,
    "updated-at": raw(t, "updatedAt"),
    date: t.date,
    amount: t.amount,
    description: raw(t, "plaidName"),
    merchant: t.merchant?.name ?? null,
    account: maps.accountNames.get(t.account.id) ?? t.account.name,
    "account-slug": accountSlug,
    "category-slug": t.category === null ? null : (maps.categories.get(t.category.id) ?? null),
    "tag-slugs": t.tags.flatMap((tag) => {
      const slug = maps.tags.get(tag.id)
      return slug === undefined ? [] : [slug]
    }),
    notes: t.notes,
    pending: t.pending || null,
    recurring: t.isRecurring || null,
    split: t.isSplitTransaction || null,
    "needs-review": t.needsReview || null,
    "hide-from-reports": t.hideFromReports || null,
  }
  const held: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(line)) {
    if (value === null || value === undefined) continue
    if (Array.isArray(value) && value.length === 0) continue
    held[key] = value
  }
  return held as unknown as TransactionLine
}

async function existing(slug: string): Promise<readonly TransactionLine[]> {
  try {
    const text = await readFile(join(AKASHA, sidecarOf(slug)), "utf8")
    return text
      .split("\n")
      .filter((one) => one.trim() !== "")
      .map((one) => JSON.parse(one) as TransactionLine)
  } catch {
    return []
  }
}

function monthPage(slug: string): string {
  const year = Number.parseInt(slug.slice(0, 4), 10)
  const name = `${MONTH_NAMES[Number.parseInt(slug.slice(5, 7), 10) - 1]} ${year}`
  return [
    "---",
    "page-type-slug: monarch-month",
    `title: "${name}"`,
    `slug: "${slug}"`,
    `starts-on: "${slug}-01"`,
    "---",
    "",
  ].join("\n")
}

export const ARRIVED_FROM_MONARCH = "monarch"

function carried(standing: TransactionLine, arriving: TransactionLine): TransactionLine {
  const held: Record<string, unknown> = { ...arriving, id: standing.id }
  const order = standing["amazon-order-number"]
  if (order !== undefined) held["amazon-order-number"] = order

  const stands = standing["category-slug"]
  const source = standing["category-source"]
  const by = standing["category-decided-by"]
  const landing = arriving["category-slug"]
  const ours = source !== undefined && source !== ARRIVED_FROM_MONARCH

  if (landing === stands || (ours && landing !== stands)) {
    if (stands !== undefined) held["category-slug"] = stands
    else delete held["category-slug"]
    if (source !== undefined) held["category-source"] = source
    if (by !== undefined) held["category-decided-by"] = by
  } else if (landing !== undefined) {
    held["category-source"] = ARRIVED_FROM_MONARCH
    delete held["category-decided-by"]
  }
  return held as unknown as TransactionLine
}

function sortLines(lines: readonly TransactionLine[]): readonly TransactionLine[] {
  return [...lines].sort(
    (one, other) =>
      one.date.localeCompare(other.date) || one["monarch-id"].localeCompare(other["monarch-id"])
  )
}

export function merged(
  standing: readonly TransactionLine[],
  arriving: readonly TransactionLine[],
  retiring: ReadonlySet<string>
): { readonly lines: readonly TransactionLine[]; readonly held: readonly string[] } {
  const kept = new Map<string, TransactionLine>()
  for (const line of standing) kept.set(line["monarch-id"], line)
  const held: string[] = []
  for (const line of arriving) {
    const id = line["monarch-id"]
    const before = kept.get(id)
    if (before === undefined) {
      kept.set(
        id,
        line["category-slug"] === undefined
          ? line
          : ({ ...line, "category-source": ARRIVED_FROM_MONARCH } as TransactionLine)
      )
      continue
    }
    const after = carried(before, line)
    if (
      before["category-slug"] !== line["category-slug"] &&
      after["category-slug"] === before["category-slug"]
    ) {
      held.push(`${id} (${String(before["category-source"])})`)
    }
    kept.set(id, after)
  }
  for (const id of retiring) kept.delete(id)
  return { lines: sortLines([...kept.values()]), held }
}

function sidecarText(lines: readonly TransactionLine[]): string {
  return lines.map((row) => JSON.stringify(row)).join("\n") + (lines.length > 0 ? "\n" : "")
}

export type LinePatch = Readonly<Record<string, unknown>>

export async function patchTransactionLines(
  patches: ReadonlyMap<string, LinePatch>,
  message: string
): Promise<readonly string[]> {
  if (patches.size === 0) return []
  const items: WriteItem[] = []
  const touched: string[] = []
  const unfound = new Set(patches.keys())
  for (const month of await monthSlugs()) {
    const standing = await existing(month)
    let changed = false
    const lines = standing.map((line) => {
      const patch = patches.get(line["monarch-id"])
      if (patch === undefined) return line
      unfound.delete(line["monarch-id"])
      const held: Record<string, unknown> = { ...line }
      for (const [key, value] of Object.entries(patch)) {
        if (value === null || value === undefined) delete held[key]
        else held[key] = value
      }
      if (JSON.stringify(held) !== JSON.stringify(line)) changed = true
      return held as unknown as TransactionLine
    })
    if (!changed) continue
    touched.push(month)
    items.push({ file_path: sidecarOf(month), content: sidecarText(sortLines(lines)) })
  }
  if (unfound.size > 0) {
    throw new Error(
      `no month sidecar carries transaction(s) ${[...unfound].join(", ")}, so nothing was written`
    )
  }
  if (items.length === 0) return []
  await through(items, message)
  return touched.sort()
}

export const WRITER = "monarch-writer"

const WRITER_ENV = { ...process.env, AGENT_ID: WRITER, ACTING_AGENT_ID: "" }

const TOOL_CEILING_MS = 300_000

function tool(
  name: string,
  args: readonly string[],
  stdin: string | null,
  cwd: string = AKASHA
): Promise<{ readonly code: number; readonly said: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn("bun", [...toolArgv(name, args, AKASHA)], {
      cwd,
      env: WRITER_ENV,
      stdio: [stdin === null ? "ignore" : "pipe", "pipe", "pipe"],
    })
    let said = ""
    const ceiling = setTimeout(() => {
      child.kill("SIGKILL")
      reject(
        new Error(
          `tools/${name} did not finish inside ${TOOL_CEILING_MS / 1000}s, so the month files ` +
            `were left as they stood. What it had said:\n${said}`
        )
      )
    }, TOOL_CEILING_MS)
    child.stdout?.on("data", (chunk: Buffer) => (said += chunk.toString()))
    child.stderr?.on("data", (chunk: Buffer) => (said += chunk.toString()))
    child.on("error", (error) => {
      clearTimeout(ceiling)
      reject(error)
    })
    child.on("close", (code) => {
      clearTimeout(ceiling)
      resolve({ code: code ?? 1, said })
    })
    if (stdin !== null && child.stdin !== null) {
      child.stdin.write(stdin)
      child.stdin.end()
    }
  })
}

export async function through(items: readonly WriteItem[], message: string): Promise<void> {
  const root = AKASHA
  const named = ["--repo", AKASHA_REPO]
  const standing = items.filter((item) => existsSync(join(root, item.file_path)))
  if (standing.length > 0) {
    const read = await tool(
      "read.ts",
      standing.flatMap((item) => ["--file-path", join(root, item.file_path)]),
      null
    )
    if (read.code !== 0) {
      throw new Error(`reading what stands was not recorded, exit ${read.code}:\n${read.said}`)
    }
  }
  const wrote = await tool(
    "write.ts",
    [...named, "--input-file", "-", "--mechanical", "--message", message],
    JSON.stringify(items.map((item) => ({ ...item, file_path: join(root, item.file_path) }))),
    root
  )
  if (wrote.code !== 0) {
    throw new Error(`landing the ${AKASHA_REPO} files exited ${wrote.code}:\n${wrote.said}`)
  }
}

export async function landTransactionFiles(
  arriving: readonly TransactionLine[],
  retiring: readonly string[] = []
): Promise<readonly string[]> {
  const gone = new Set(retiring)
  const touched = new Map<string, TransactionLine[]>()
  for (const line of arriving) {
    const month = monthOf(line.date)
    const held = touched.get(month) ?? []
    held.push(line)
    touched.set(month, held)
  }
  if (gone.size > 0) {
    for (const month of await monthSlugs()) {
      if (touched.has(month)) continue
      const standing = await existing(month)
      if (standing.some((line) => gone.has(line["monarch-id"]))) touched.set(month, [])
    }
  }
  if (touched.size === 0) return []

  const items: WriteItem[] = []
  const held: string[] = []
  for (const [month, lines] of [...touched.entries()].sort()) {
    const standing = await existing(month)
    if (standing.length === 0) {
      items.push({ file_path: monthPagePath(month), content: monthPage(month) })
    }
    const rows = merged(standing, lines, gone)
    held.push(...rows.held)
    items.push({ file_path: sidecarOf(month), content: sidecarText(rows.lines) })
  }
  if (held.length > 0) {
    console.warn(
      `  held ${held.length} category decision(s) of ours against Monarch: ${held.join(", ")}`
    )
  }
  await through(items, `monarch: ${arriving.length} transaction(s) landed from the poller`)
  return [...touched.keys()].sort()
}

export interface Held {
  readonly lines: readonly TransactionLine[]
  readonly skipped: number
  readonly unknownTags: readonly string[]
}

export function linesFrom(
  transactions: readonly MonarchTransaction[],
  maps: SlugMaps
): Held {
  const lines: TransactionLine[] = []
  const unknownTags = new Set<string>()
  let skipped = 0
  for (const t of transactions) {
    for (const tag of t.tags) if (!maps.tags.has(tag.id)) unknownTags.add(tag.name)
    const line = lineOf(t, maps)
    if (line === null) skipped += 1
    else lines.push(line)
  }
  return { lines, skipped, unknownTags: [...unknownTags] }
}

export async function linesFor(transactions: readonly MonarchTransaction[]): Promise<Held> {
  return linesFrom(transactions, await slugMaps())
}
