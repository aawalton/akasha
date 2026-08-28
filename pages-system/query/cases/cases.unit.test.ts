import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { checkQuery, runQuery } from "../query.ts"
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

function whyTheCitationFails(from: Citation, claim: string): string {
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

for (const one of cases) {
  test(`${one.name} — cites ${citationText(one.from)}`, () => {
    expect(whyTheCitationFails(one.from, one.claim)).toBe("")
  })
}

for (const one of cases) {
  test(one.name, () => {
    const checked = checkQuery(one.query, one.declared)
    if (one.expected.outcome === "refused") {
      if (checked.ok) throw new Error(`expected a refusal, and this query was checked`)
      for (const word of one.expected.mustName) expect(checked.message).toContain(word)
      return
    }
    if (!checked.ok) throw new Error(`expected an answer, and this was refused: ${checked.message}`)
    const answered = runQuery(
      checked,
      one.pages.map((page) => ({ at: page.at, values: { now: 0, properties: page.values } }))
    )
    expect(answered.map((page) => page.at)).toEqual([...one.expected.at])
  })
}

test("every case carries a name of its own", () => {
  const seen = new Set<string>()
  expect(cases.filter((one) => !seen.add(one.name)).map((one) => one.name)).toEqual([])
})

test("every case names a claim and a citation", () => {
  expect(cases.filter((one) => one.claim.trim() === "" || one.name.trim() === "")).toEqual([])
})
