import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { type Citation, cases, citationText } from "./cases"

// This holds the corpus to the pages it says it comes from.
//
// A conformance corpus is only worth what its citations are worth. Each case
// quotes a line of a specification page and names where that line stands, and
// nothing but this keeps the two together: a line moves when someone edits the
// page above it, and the case then cites a line that says something else, or
// nothing. That drift is silent — every case still passes against an
// implementation, and the corpus quietly stops meaning what it says.
//
// It reads the pages off disk by path rather than through any page-reading
// helper, because nothing outside `pages-system/formula/` may be imported here.

const REPO_ROOT = resolve(import.meta.dir, "..", "..", "..")

const pageCache = new Map<string, string[]>()

function pageLines(page: string): string[] {
  const held = pageCache.get(page)
  if (held) return held
  const lines = readFileSync(resolve(REPO_ROOT, page), "utf-8").split("\n")
  pageCache.set(page, lines)
  return lines
}

/**
 * A line of prose stripped to its words: the markdown bullet first, then the
 * emphasis and code marks. Bullet first matters — an operator whose name is
 * `-` leaves a second dash behind, and stripping in the other order eats it.
 */
function plain(text: string): string {
  return text
    .replace(/^\s*-\s+/, "")
    .replace(/[`*]/g, "")
    .trim()
}

/** The names a list section gives its entries, in order. */
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

/** Empty where the citation holds, or why it does not. */
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
  // A new operator on the page is a hole in the corpus, not a passing suite.
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
  // A value under an undeclared key would be testing nothing, since the check
  // settles what a formula may name off the shape rather than off the page.
  const stray = cases.flatMap((one) =>
    Object.keys(one.values)
      .filter((key) => !(key in one.shape))
      .map((key) => `${one.name}: {${key}}`)
  )
  // One case is deliberately built this way, to pin that the shape rather than
  // the page settles what may be named.
  expect(stray).toEqual([
    "an undeclared key is refused even where the page holds a value for it: {extra}",
  ])
})
