import { askComposed, type ComposedQuery } from "@shared/pages-query/ask"
import { type Asked } from "../../pages-query/src/index"
import { nameFromAt } from "./file-name"
import { backings, type Roster } from "./file-write-backing"

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const ENOUGH_TO_SEE_A_SECOND = 2

export type Translated =
  | {
      readonly outcome: "named"
      readonly id: string
      readonly pageTypeSlug: string
      readonly name: string
      readonly at: string
    }
  | {
      readonly outcome: "absent"
      readonly id: string
      readonly pageTypeSlug: string
      readonly why: string
    }
  | {
      readonly outcome: "ambiguous"
      readonly id: string
      readonly pageTypeSlug: string
      readonly names: readonly string[]
      readonly ats: readonly string[]
      readonly why: string
    }
  | {
      readonly outcome: "unnamed"
      readonly id: string
      readonly pageTypeSlug: string
      readonly at: string | null
      readonly glob: string
      readonly why: string
    }
  | {
      readonly outcome: "unbacked"
      readonly id: string
      readonly pageTypeSlug: string
      readonly why: string
    }
  | {
      readonly outcome: "unasked"
      readonly id: string
      readonly pageTypeSlug: string
      readonly why: string
    }
  | {
      readonly outcome: "malformed"
      readonly given: string
      readonly pageTypeSlug: string
      readonly why: string
    }

export type PageNameDeps = {
  readonly ask: (query: ComposedQuery) => Promise<Asked>
  readonly backing: () => Promise<Roster>
}

const LIVE: PageNameDeps = { ask: (query) => askComposed(query), backing: backings }

export class PageNameError extends Error {
  readonly translated: Translated

  constructor(translated: Translated, message: string) {
    super(message)
    this.name = "PageNameError"
    this.translated = translated
  }
}

export function refuseUntranslated(op: string, translated: Translated): never {
  if (translated.outcome === "named") {
    throw new Error(
      `${op}: refuseUntranslated was handed a translation that succeeded — \`${translated.id}\` is named \`${translated.name}\`. Switch on the outcome rather than asking this to raise.`
    )
  }
  throw new PageNameError(translated, `${op}: ${translated.why}`)
}

export async function nameOfPageId(
  pageTypeSlug: string,
  id: string,
  deps: PageNameDeps = LIVE
): Promise<Translated> {
  if (typeof id !== "string" || !UUID.test(id.trim())) {
    const shown = id === "" ? "an empty string" : `\`${String(id)}\``
    return {
      outcome: "malformed",
      given: String(id),
      pageTypeSlug,
      why: `nameOfPageId(${pageTypeSlug}): ${shown} is not a uuid, so no page was looked for. This is a caller holding the wrong value — an unset variable, a name where an id was meant, or a truncated id — and it says nothing about whether any page stands.`,
    }
  }
  const wanted = id.trim()
  const roster = await deps.backing()
  const backed = roster.types.get(pageTypeSlug) ?? null
  if (backed === null) {
    if (roster.unreadBecause !== null) {
      return {
        outcome: "unasked",
        id: wanted,
        pageTypeSlug,
        why: `nameOfPageId(${pageTypeSlug}): the roster of file-backed page types went unread — ${roster.unreadBecause} — so nothing here can say where this page type's pages stand. Nothing was looked at. This is the page query service being unreachable, not this page being gone.`,
      }
    }
    return {
      outcome: "unbacked",
      id: wanted,
      pageTypeSlug,
      why: `nameOfPageId(${pageTypeSlug}): the page query service names no file backing for \`${pageTypeSlug}\`, so its pages have no name to be translated to. Nothing was looked at, and this says nothing about whether \`${wanted}\` stands.`,
    }
  }
  if (backed.glob === null || backed.repo === null) {
    const held = backed.heldBy.length === 0 ? "nothing" : backed.heldBy.join(", ")
    return {
      outcome: "unbacked",
      id: wanted,
      pageTypeSlug,
      why: `nameOfPageId(${pageTypeSlug}): this page type has no file of its own — its pages stand as rows inside another page, held by ${held}. A row in a sidecar is addressed by its parent page and its own key, never by a name of its own, so there is no name for \`${wanted}\` to be translated to.`,
    }
  }
  const glob = backed.glob
  const asked = await deps.ask({
    "page-type": pageTypeSlug,
    keys: ["id"],
    where: { id: { is: wanted } },
    limit: ENOUGH_TO_SEE_A_SECOND,
  })
  if (!asked.ok) {
    return {
      outcome: "unasked",
      id: wanted,
      pageTypeSlug,
      why: `nameOfPageId(${pageTypeSlug}): the ask for \`${wanted}\` was refused — ${asked.why}. Nothing was looked at, so this says nothing about whether that page stands.`,
    }
  }
  const rows = asked.answer.rows
  if (rows.length === 0) {
    return {
      outcome: "absent",
      id: wanted,
      pageTypeSlug,
      why: `nameOfPageId(${pageTypeSlug}): no page of type \`${pageTypeSlug}\` carries id \`${wanted}\`. The corpus was read and it holds no such page.`,
    }
  }
  if (rows.length > 1) {
    const ats = rows.map((one) => one.at ?? "a page reporting no file")
    const named = rows.map((one) => (one.at === undefined ? null : nameFromAt(glob, one.at)))
    return {
      outcome: "ambiguous",
      id: wanted,
      pageTypeSlug,
      names: named.filter((one): one is string => one !== null),
      ats,
      why: `nameOfPageId(${pageTypeSlug}): ${rows.length} pages carry id \`${wanted}\` — ${ats.join(", ")}. One id names one page, so there is no single name this can be. Nothing may be written against this id until the corpus holds one page for it.`,
    }
  }
  const at = rows[0]?.at
  if (at === undefined) {
    return {
      outcome: "unnamed",
      id: wanted,
      pageTypeSlug,
      at: null,
      glob,
      why: `nameOfPageId(${pageTypeSlug}): the page carrying \`${wanted}\` reports no file it stands in, so nothing here can name it. The page was found; it is the file it stands in that is unaccounted for.`,
    }
  }
  const name = nameFromAt(glob, at)
  if (name === null) {
    return {
      outcome: "unnamed",
      id: wanted,
      pageTypeSlug,
      at,
      glob,
      why: `nameOfPageId(${pageTypeSlug}): the page carrying \`${wanted}\` stands at \`${at}\`, which is not where \`${glob}\` puts one, so a write addressed by name would land somewhere else. The page was found and it stands; it cannot be addressed by name from where it is.`,
    }
  }
  return { outcome: "named", id: wanted, pageTypeSlug, name, at }
}
