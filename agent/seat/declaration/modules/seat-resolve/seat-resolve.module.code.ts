import {
  ATTRIBUTES,
  type AttributeKey,
  DECLARATIONS,
  type Declaration,
} from "akasha/agent/modules/attributes/agent-attributes.module.code.ts"
import { seat as seatPageType } from "akasha/agent/seat/seat.page-type.ts"
import { domainsRead } from "akasha/domain/modules/reading/domain-reading.module.code.ts"
import {
  listedAt,
  slugsOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  personaAt,
  personasStanding,
} from "akasha/persona/modules/reading/persona-reading.module.code.ts"

const DOMAIN_SLUG_KEY = "slug"

export const GAME = "story-game"

export interface Found {
  readonly slugs: ReadonlyMap<string, string>
}

export function gameAt(root: string, slug: string): string | null {
  return listedAt(root, GAME, slug)[0]?.path ?? null
}

export function gamesFound(root: string, slugs: Map<string, string> = new Map()): Found {
  for (const slug of slugsOfType(root, GAME)) {
    const at = gameAt(root, slug)
    if (at === null) continue
    slugs.set(`${GAME}/${slug}`, at)
    if (!slugs.has(slug)) slugs.set(slug, at)
  }
  return { slugs }
}

export function scan(root: string): Found {
  const slugs = new Map<string, string>()
  for (const one of domainsRead(root)) {
    slugs.set(one.address, one.relPath)
    if (!slugs.has(one.slug)) slugs.set(one.slug, one.relPath)
  }
  return gamesFound(root, slugs)
}

const SLOT_OF: Readonly<Record<string, AttributeKey>> = {
  "seat-persona": "persona",
  "assignment-slug": "domain",
  role: "role",
}

const defaults = new Map<string, ReadonlyMap<string, string>>()

function statedDefaults(root: string): ReadonlyMap<string, string> {
  const held = defaults.get(root)
  if (held !== undefined) return held
  const made = new Map<string, string>()
  for (const one of seatPageType.properties) {
    const slot = SLOT_OF[slugOf(one.pageProperty)]
    const value = "default" in one ? one.default : undefined
    if (slot !== undefined && typeof value === "string") made.set(slot, slugOf(value))
  }
  defaults.set(root, made)
  return made
}

export function defaultSlots(root: string): readonly AttributeKey[] {
  const held = statedDefaults(root)
  return ATTRIBUTES.filter((slot) => held.has(slot))
}

export function defaultFor(slot: Declaration, root: string): string | null {
  return statedDefaults(root).get(slot) ?? null
}

export function personaIsDefault(root: string, persona: string): boolean {
  return defaultFor("persona", root) === persona
}

export interface Defaulted {
  readonly persona: string | undefined
  readonly role: string | undefined
  readonly roleIsDefault: boolean
}

export function defaulted(
  stated: { readonly persona?: string; readonly role?: string },
  root: string
): Defaulted {
  const persona = stated.persona ?? defaultFor("persona", root) ?? undefined
  if (stated.role !== undefined) return { persona, role: stated.role, roleIsDefault: false }
  const role = defaultFor("role", root)
  return { persona, role: role ?? undefined, roleIsDefault: role !== null }
}

function resolveSlot(
  slot: Exclude<Declaration, "role">,
  slug: string,
  root: string,
  found: Found
): { readonly relPath: string } | { readonly refusal: string } {
  if (slot === "domain") {
    const at = found.slugs.get(slug)
    if (at !== undefined) return { relPath: at }
    const known = [...found.slugs.keys()].sort()
    return {
      refusal:
        `no document declares \`${DOMAIN_SLUG_KEY}: ${slug}\`, so a statement of domain \`${slug}\` could ` +
        `never be read for. Declared here: ${known.length === 0 ? "none" : known.join(", ")}`,
    }
  }
  const held = personaAt(root, slug)
  if (held !== null) return { relPath: held.path }
  const known = personasStanding(root).map((one) => one.slug)
  return {
    refusal:
      `no persona in the akasha system is named \`${slug}\`, so a statement of persona \`${slug}\` ` +
      `could never be read for. Among them: ${known.join(", ")}`,
  }
}

export interface Claimed {
  readonly slot: Declaration
  readonly slug: string
  readonly relPath: string | null
}

export function resolveAttributes(
  stated: Partial<Record<Declaration, string>>,
  tokens: readonly string[],
  root: string,
  found: Found
): { readonly assigned: readonly Claimed[] } | { readonly refusals: readonly string[] } {
  const claimed = new Map<Declaration, Claimed>()
  const refusals: string[] = []

  const claim = (slot: Declaration, slug: string, relPath: string | null): undefined => {
    const standing = claimed.get(slot)
    if (standing !== undefined) {
      refusals.push(
        `\`${standing.slug}\` and \`${slug}\` both name the ${slot}, and a seat holds one — ` +
          `state the slots with --persona, --domain and --role rather than as tokens`
      )
      return
    }
    claimed.set(slot, { slot, slug, relPath })
  }

  for (const slot of DECLARATIONS) {
    const slug = stated[slot]
    if (slug === undefined) continue
    if (slot === "role") {
      claim(slot, slug, null)
      continue
    }
    const resolved = resolveSlot(slot, slug, root, found)
    if ("refusal" in resolved) refusals.push(`${slot}: ${resolved.refusal}`)
    else claim(slot, slug, resolved.relPath)
  }

  for (const token of tokens) {
    const asDomain = resolveSlot("domain", token, root, found)
    if (!("refusal" in asDomain)) {
      claim("domain", token, asDomain.relPath)
      continue
    }
    refusals.push(`\`${token}\` names no domain. ${asDomain.refusal}`)
  }

  if (refusals.length > 0) return { refusals }
  return {
    assigned: DECLARATIONS.filter((slot) => claimed.has(slot)).map(
      (slot) => claimed.get(slot) as Claimed
    ),
  }
}
