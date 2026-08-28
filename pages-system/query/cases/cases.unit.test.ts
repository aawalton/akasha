import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { checkQuery, runQuery } from "../query.ts"
import { type Citation, cases, citationText } from "./cases.ts"

// This holds the corpus to the pages it says it comes from, and then holds the
// implementation to the corpus.
//
// A conformance corpus is only worth what its citations are worth. Each case
// quotes a line of a specification page and names where that line stands, and
// nothing but this keeps the two together: a line moves when someone edits the
// page above it, and the case then cites a line that says something else, or
// nothing. That drift is silent — every case still passes against an
// implementation, and the corpus quietly stops meaning what it says.
//
// It reads the pages off disk by path rather than through any page-reading
// helper, because nothing outside `pages-system/` may be imported here.

const REPO_ROOT = resolve(import.meta.dir, "..", "..", "..")

const pageCache = new Map<string, string[]>()

function pageLines(page: string): string[] {
  const held = pageCache.get(page)
  if (held) return held
  const lines = readFileSync(resolve(REPO_ROOT, page), "utf-8").split("\n")
  pageCache.set(page, lines)
  return lines
}

/** A line of prose stripped to its words: the markdown bullet, then the marks. */
function plain(text: string): string {
  return text
    .replace(/^\s*-\s+/, "")
    .replace(/[`*]/g, "")
    .trim()
}

/** Empty where the citation holds, or why it does not. */
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
      // A refusal must say what was wrong in the terms the query was written
      // in, so the words the caller wrote are the words it has to carry.
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
