import { asRecordOrEmpty } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import {
  type Calls,
  fetched,
} from "akasha/command/pages/watching/modules/tmdb-reading/tmdb-reading.module.code.ts"

export type Listed = {
  readonly title: string
  readonly alsoTitled: string | null
  readonly year: number
  readonly network: string
  readonly blocks: readonly string[]
  readonly inJuly: boolean
  readonly aired: string | null
  readonly article: string | null
}

const WIKIPEDIA_AT = "https://en.wikipedia.org/w/api.php"

export const LISTS: readonly string[] = [
  "List of Hallmark Channel Original Movies (2000s)",
  "List of Hallmark Channel Original Movies (2010s)",
  "List of Hallmark Channel Original Movies (2020s)",
]

const FIRST_NETWORK = "Hallmark Channel"

const MONTHS: readonly string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const YEAR_HEADING = /^==\s*(\d{4})\s*==\s*$/

const NETWORK_HEADING = /^===\s*([^=].*?)\s*===\s*$/

const LAST_HEADING = /^==\s*(See also|References|Future|External links)\b/i

const BLOCK = /\(([A-Za-z0-9+]{1,8})\)/g

const ALSO = /\(a\.k\.a\.?\s*([^)]*)\)/i

const LINKED = /\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/

const DAY = /([A-Z][a-z]+)\s+(\d{1,2})(?:[–-]\d{1,2})?,\s+(\d{4})/

const ATTRIBUTES = /^\s*(?:[a-z-]+\s*=\s*(?:"[^"]*"|[^\s|]+)\s*)+\|(?!\|)/i

function unreferenced(text: string): string {
  return text.replace(/<ref[^>]*\/>/g, "").replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, "")
}

function cellOf(said: string): string {
  const attributes = ATTRIBUTES.exec(said)
  return attributes === null ? said : said.slice(attributes[0].length)
}

export function plainOf(said: string): string {
  return said
    .replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, "$1")
    .replace(/\{\{[^{}]*\}\}/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/'''?/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function dayOf(said: string | null): string | null {
  const read = said === null ? null : DAY.exec(said)
  if (read === null) return null
  const month = MONTHS.indexOf(read[1] ?? "") + 1
  if (month === 0) return null
  return `${read[3] ?? ""}-${String(month).padStart(2, "0")}-${(read[2] ?? "").padStart(2, "0")}`
}

function listedIn(raw: string, aired: string | null, year: number, network: string): Listed | null {
  const said = plainOf(raw).replace(/[†‡*§#]+/g, "")
  const also = ALSO.exec(said)?.[1]?.trim() ?? null
  const title = said
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .trim()
  if (title === "") return null
  const unlinked = raw.replace(/\[\[[^\]]*\]\]/g, "")
  const article = LINKED.exec(raw)?.[1]?.trim() ?? null
  return {
    title,
    alsoTitled: also === "" ? null : also,
    year,
    network,
    blocks: [...unlinked.matchAll(BLOCK)].map((one) => one[1] ?? ""),
    inJuly: raw.includes("†"),
    aired: dayOf(aired),
    article,
  }
}

type Table = { header: string[]; cells: string[] }

export function listedFrom(wikitext: string): readonly Listed[] {
  const listed: Listed[] = []
  let year = 0
  let network = FIRST_NETWORK
  let table: Table | null = null
  const flush = (): undefined => {
    if (table === null || table.cells.length === 0) return
    const titled = table.header.findIndex((heading) => /^(movie|title|film)/i.test(heading))
    const dated = table.header.findIndex((heading) => /air ?date|premiere/i.test(heading))
    const raw = titled < 0 ? undefined : table.cells[titled]
    const aired = dated < 0 ? null : plainOf(table.cells[dated] ?? "")
    const one = raw === undefined ? null : listedIn(raw, aired, year, network)
    if (one !== null) listed.push(one)
    table.cells = []
  }
  for (const line of unreferenced(wikitext).split("\n")) {
    if (LAST_HEADING.test(line)) break
    const yearSaid = YEAR_HEADING.exec(line)?.[1]
    if (yearSaid !== undefined) {
      year = Number(yearSaid)
      network = FIRST_NETWORK
      continue
    }
    const networkSaid = NETWORK_HEADING.exec(line)?.[1]
    if (networkSaid !== undefined) {
      network = networkSaid
      continue
    }
    if (line.startsWith("{|")) {
      table = { header: [], cells: [] }
      continue
    }
    if (table === null) continue
    if (line.startsWith("|}")) {
      flush()
      table = null
    } else if (line.startsWith("!")) {
      for (const one of line.slice(1).split("!!")) table.header.push(plainOf(cellOf(one)))
    } else if (line.startsWith("|-")) {
      flush()
    } else if (line.startsWith("|")) {
      for (const one of line.slice(1).split("||")) table.cells.push(cellOf(one))
    } else if (table.cells.length > 0) {
      table.cells[table.cells.length - 1] += `\n${line}`
    }
  }
  return listed
}

export async function listedFetched(calls: Calls): Promise<readonly Listed[] | string> {
  const listed: Listed[] = []
  for (const page of LISTS) {
    const asked = `${WIKIPEDIA_AT}?action=parse&prop=wikitext&format=json&formatversion=2&page=${encodeURIComponent(page)}`
    const answered = await fetched(calls, asked, { accept: "application/json" })
    const said: unknown = answered === null ? null : await answered.json()
    const wikitext = textIn(asRecordOrEmpty(asRecordOrEmpty(said).parse).wikitext)
    if (wikitext === null) return `Wikipedia answered nothing for ${page}`
    listed.push(...listedFrom(wikitext))
  }
  return listed
}
