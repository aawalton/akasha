import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { type Citation, cases, citationText } from "./cases.ts"

const REPO_ROOT = resolve(import.meta.dir, "..", "..", "..")

const pageCache = new Map<string, string[]>()

function pageLines(page: string): string[] {
  const held = pageCache.get(page)
  if (held) return held
  const lines = readFileSync(resolve(REPO_ROOT, page), "utf-8").split("\n")
  pageCache.set(page, lines)
  return lines
}

function plain(text: string): string {
  return text
    .replace(/^\s*-\s+/, "")
    .replace(/[`*]/g, "")
    .trim()
}

function sectionEntries(page: string, section: string): string[] {
  const lines = pageLines(page)
  const start = lines.findIndex((line) => line.trim() === `# ${section}`)
  if (start === -1) return []
  const names: string[] = []
  for (const line of lines.slice(start + 1)) {
    if (line.startsWith("# ")) break
    const named = /^\s*-\s+\*\*(.+?)\*\*/.exec(line)?.[1]
    if (named !== undefined) names.push(named.replace(/`/g, ""))
  }
  return names
}

function whyTheCitationFails(from: Citation, claim: string): string {
  if (from.at === "line") {
    const lines = pageLines(from.page)
    if (from.line > lines.length) {
      return `${from.page} has ${lines.length} lines and this cites line ${from.line}`
    }
    const found = lines[from.line - 1] ?? ""
    if (found.trim() === "") {
      return `${from.page}:${from.line} is blank, so it carries no claim`
    }
    if (plain(found) !== plain(claim)) {
      return [
        `${from.page}:${from.line} no longer carries the claim this case quotes.`,
        `  quoted: ${plain(claim)}`,
        `  page:   ${plain(found)}`,
        "  Either the line moved, in which case fix the citation, or it was",
        "  rewritten, in which case work out whether this case is still right.",
      ].join("\n")
    }
    return ""
  }

  const entries = sectionEntries(from.page, from.section)
  if (entries.length === 0) {
    return `${from.page} has no ${from.section} section holding named entries`
  }
  const present = from.names.filter((name) => entries.includes(name))
  if (present.length > 0) {
    return [
      `${from.page} § ${from.section} now names ${present.join(", ")}.`,
      `  This case rests on it naming none of ${from.names.join(", ")}.`,
      `  The section names: ${entries.join(", ")}`,
      "  The language grew. This case is stale and the corpus needs cases for",
      "  what was added.",
    ].join("\n")
  }
  return ""
}

for (const testCase of cases) {
  test(`${testCase.name} — cites ${citationText(testCase.from)}`, () => {
    expect(whyTheCitationFails(testCase.from, testCase.claim)).toBe("")
  })
}

test("the operators list names exactly the operators the corpus covers", () => {
  expect(sectionEntries("pages/list/formula-operators.list.md", "List")).toEqual([
    "+",
    "-",
    "*",
    "/",
    "==",
    "!=",
    "<",
    "<=",
    ">",
    ">=",
    "&&",
    "??",
  ])
})

test("the functions list names exactly the functions the corpus covers", () => {
  expect(sectionEntries("pages/list/formula-functions.list.md", "List")).toEqual([
    "now",
    "hoursBetween",
    "contains",
    "hasWord",
    "text",
  ])
})

test("the values list names exactly the value kinds the corpus covers", () => {
  expect(sectionEntries("pages/list/formula-values.list.md", "List")).toEqual([
    "text",
    "number",
    "boolean",
    "list",
    "instant",
    "date",
    "absent",
  ])
})

test("every case carries a name of its own", () => {
  const seen = new Set<string>()
  const twice = cases.filter((one) => !seen.add(one.name))
  expect(twice.map((one) => one.name)).toEqual([])
})

test("every case names a formula, a claim and a citation", () => {
  const bare = cases
    .filter((one) => one.claim.trim() === "" || one.name.trim() === "")
    .map((one) => one.name)
  expect(bare).toEqual([])
})

test("every stored value a case is run over sits under a key its shape declares", () => {
  const stray = cases.flatMap((one) =>
    Object.keys(one.values)
      .filter((key) => !(key in one.shape))
      .map((key) => `${one.name}: {${key}}`)
  )
  expect(stray).toEqual([
    "an undeclared key is refused even where the page holds a value for it: {extra}",
  ])
})
