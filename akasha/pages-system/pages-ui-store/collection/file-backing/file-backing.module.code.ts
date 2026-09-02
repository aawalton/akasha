import { RosterUnreachable } from "@akasha/pages-access/file-read"
import { isRecord } from "@akasha/utils-narrow/is-record"

export type PageTypeBacking = "file" | "unknown"

export const FILE_BACKED_ROSTER_PATH = "/api/page-types"

export type RosterAnswer = ReadonlySet<string> | RosterUnreachable

export type RosterReader = () => Promise<RosterAnswer>

export function readRosterBody(body: unknown): ReadonlySet<string> | null {
  if (!isRecord(body)) return null
  const types = body.types
  if (!Array.isArray(types)) return null
  const slugs = new Set<string>()
  for (const one of types) {
    if (!isRecord(one)) return null
    const slug = one.slug
    if (typeof slug !== "string" || slug === "") return null
    slugs.add(slug)
  }
  return slugs
}

export function rosterOverFetch(
  fetchImpl: (input: string, init?: RequestInit) => Promise<Response>,
  path: string = FILE_BACKED_ROSTER_PATH
): RosterReader {
  return async () => {
    let response: Response
    try {
      response = await fetchImpl(path, { headers: { accept: "application/json" } })
    } catch (err: unknown) {
      return new RosterUnreachable(`${path} gave no answer (${String(err)})`)
    }
    if (!response.ok) {
      return new RosterUnreachable(`${path} answered ${response.status}`)
    }
    let body: unknown
    try {
      body = await response.json()
    } catch (err: unknown) {
      return new RosterUnreachable(
        `${path} answered ${response.status} with what is not JSON (${String(err)})`
      )
    }
    const slugs = readRosterBody(body)
    if (slugs === null) {
      return new RosterUnreachable(
        `${path} answered ${response.status} in a shape this reader cannot read`
      )
    }
    return slugs
  }
}
