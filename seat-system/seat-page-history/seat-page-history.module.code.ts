import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { FLEET } from "../compose-seat-name/compose-seat-name.module.code.ts"
import {
  akashaSeatInHistory,
  akashaSeatNamedInHistory,
} from "../seat-akasha-history/seat-akasha-history.module.code.ts"
import { DECLARATIONS, type Declaration } from "../seat-attributes/seat-attributes.module.code.ts"
import { initiativeStemOf } from "../seat-initiative/seat-initiative.module.code.ts"

// WHAT A SEAT SAID BEFORE ITS PAGE WENT, READ FROM AKASHA AND NOWHERE ELSE. Every reader here asked
// akasha first and fell through to the old store behind it, walking `agent/seat` in git to find a
// path, opening bodies to index them by id, and parsing frontmatter out of each. That store is
// drained, so the fallback answered nothing it had not already been answered — and for a seat
// opened since the write moved it had never answered anything at all.

const IN_ITS_OWN_FIELD: readonly Declaration[] = ["initiative", "on-call"]

// THE START MODE AND THE ACCOUNT ARE CARRIED, because akasha will not compose a page without them.
// This answered a seat's attributes alone while the old page was what a seat had to satisfy, and a
// seat recovered from it composed to nothing whatever else it recovered. The old page never stated
// a start mode at all, so nothing here could have carried one until akasha's history was read.
export interface StatedFromHistory {
  readonly commit: string
  readonly set: Partial<Record<Declaration, string>>
  readonly assignment: string | null
  readonly principal: string | null
  readonly onCall: boolean
  readonly initiative: string | null
  readonly mode: string | null
  readonly account: string | null
}

function textField(frontmatter: Record<string, unknown>, key: string): string | null {
  const held = frontmatter[key]
  if (typeof held === "string" && held !== "") return held
  if (typeof held === "number") return String(held)
  return null
}

// AN ATTRIBUTE IS A SLUG AND A PAGE CARRIES AN ADDRESS. Both stores write the assignment under the
// page type that holds it, and what an attribute takes is the slug alone — so an address handed
// back as one is addressed a second time, finds nothing standing under its whole spelling, and
// falls back to naming a domain. That is how a seat assigned a workspace package recovers as though
// it were assigned a domain of the same name.
function bareSlug(said: string | null): string | null {
  return said === null ? null : said.slice(said.lastIndexOf("/") + 1)
}

export interface PageInHistory {
  readonly commit: string
  readonly frontmatter: Record<string, unknown>
}

// AKASHA'S HISTORY IS ASKED FIRST, because it is the one still being written. The old pages stopped
// changing when the write moved, so what they hold is whatever a seat last said before that, and a
// seat that has stated anything since would be answered with the older truth.
//
// They are still read behind it. Every seat that stood before the move has a body only there, and a
// seat too old to have ever had a page in akasha is answered from the store that did hold it.
export function pageFromHistory(seatName: string, roots: Roots): PageInHistory | null {
  const inAkasha = akashaSeatNamedInHistory(seatName, rootFor(roots, AKASHA))
  if (inAkasha !== null) return { commit: inAkasha.commit, frontmatter: inAkasha.values }
  return null
}

export function statedFromHistory(seatName: string, roots: Roots): StatedFromHistory | null {
  const held = pageFromHistory(seatName, roots)
  if (held === null) return null
  const { commit, frontmatter } = held
  const set: Partial<Record<Declaration, string>> = {}
  for (const key of DECLARATIONS) {
    if (IN_ITS_OWN_FIELD.includes(key)) continue
    const slug = bareSlug(textField(frontmatter, `${key}-slug`))
    if (slug !== null) set[key] = slug
  }
  const bare = textField(frontmatter, "initiative-slug")
  return {
    commit,
    set,
    // THE ADDRESS IS CARRIED WHOLE AS WELL AS STRIPPED. An attribute takes the slug alone, so `set`
    // gets the stripped one and always will. The seat page is the only place the page type an
    // assignment names is written down, and a stop takes that page away — so a start read the slug
    // back and had to guess the page type, and a slug two page types carry is guessed wrong.
    // `akasha-migration` is a domain and an initiative both: a seat assigned the initiative came
    // back assigned the domain every time it stopped, and the intent and the constraints the
    // initiative carries went with it. This is what the page said, for the writer to keep.
    assignment: textField(frontmatter, "domain-slug"),
    principal:
      textField(frontmatter, "person-slug") ?? textField(frontmatter, "principal-seat-name"),
    onCall: frontmatter["on-call"] === true,
    initiative: bare === null ? null : (initiativeStemOf(bare, rootFor(roots, AKASHA)) ?? bare),
    mode: textField(frontmatter, START_MODE_KEY),
    account: textField(frontmatter, REGISTRATION_KEY),
  }
}

const PRINCIPAL_KEY = "principal-seat-name"

export function nameFromHistory(agentId: string, roots: Roots): string | null {
  const inAkasha = akashaSeatInHistory(agentId, rootFor(roots, AKASHA))
  const said = inAkasha === null ? null : inAkasha.values["slug"]
  if (typeof said === "string" && said !== "") return said
  return null
}

export function frontmatterFromHistory(
  agentId: string,
  roots: Roots
): Record<string, unknown> | null {
  const inAkasha = akashaSeatInHistory(agentId, rootFor(roots, AKASHA))
  if (inAkasha !== null) return inAkasha.values
  return null
}

const FIELD_LOOKBACK = 50

// AKASHA IS ASKED FIRST, AS IT IS FOR A NAME AND FOR A WHOLE FRONTMATTER. This was the one reader
// here that never learned to, so it answered out of the old store alone: a seat that never held an
// old page — every seat opened since the write moved — was told its session and its parent were
// gone the moment its own page was. Committing `claude-code-session-uuid` buys a resume after a
// stop, and reading it from a store nothing writes any more spends nothing.
export function fieldFromHistory(agentId: string, roots: Roots, key: string): string | null {
  const inAkasha = akashaSeatInHistory(agentId, rootFor(roots, AKASHA))
  if (inAkasha !== null) {
    const said = textField(inAkasha.values, key)
    if (said !== null) return said
  }
  return null
}

export function parentFromHistory(agentId: string, roots: Roots): string | null {
  return fieldFromHistory(agentId, roots, PRINCIPAL_KEY)
}

const ID_KEY = "id"

const PERSON_KEY = "person-slug"

const START_MODE_KEY = "start-mode"

const REGISTRATION_KEY = "registration-account"

export interface SeatFromHistory {
  readonly commit: string
  readonly seatName: string
  readonly set: Partial<Record<Declaration, string>>
  readonly principal: string | null
  readonly parentName: string | null
  readonly onCall: boolean
  readonly initiative: string | null
  readonly account: string | null
  readonly mode: string | null
}

export function seatFromHistory(agentId: string, roots: Roots): SeatFromHistory | null {
  const seatName = nameFromHistory(agentId, roots)
  if (seatName === null) return null
  const frontmatter = frontmatterFromHistory(agentId, roots)
  if (frontmatter === null || textField(frontmatter, ID_KEY) !== agentId) return null
  const stated = statedFromHistory(seatName, roots)
  if (stated === null) return null
  const above = textField(frontmatter, PRINCIPAL_KEY)
  return {
    commit: stated.commit,
    seatName,
    set: stated.set,
    principal: textField(frontmatter, PERSON_KEY) ?? (above === null ? null : FLEET),
    parentName: above,
    onCall: stated.onCall,
    initiative: stated.initiative,
    account: textField(frontmatter, REGISTRATION_KEY),
    mode: textField(frontmatter, START_MODE_KEY),
  }
}
