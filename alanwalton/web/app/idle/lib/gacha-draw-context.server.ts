import { askComposed } from "@shared/pages-query/ask"
import { type QueryRow } from "../../../../../shared/pages-query/src/answer-schema"
import type { DerivedMechanics, PersonaIdentity } from "./core/derive"
import type { DrawContext, DrawGirl } from "./core/gacha/draw"
import { deriveMechanics } from "./core/derive"
import type { IdleSupabase } from "./idle-save-context.server"

async function everyRow(
  pageType: string,
  keys: readonly string[],
  limit: number
): Promise<readonly QueryRow[]> {
  const asked = await askComposed({ "page-type": pageType, keys, limit })
  if (!asked.ok) throw new Error(`\`${pageType}\` went unread: ${asked.why}`)
  return asked.answer.rows
}

function asString(v: unknown): string {
  return typeof v === "string" ? v : ""
}

function deriveSlug(slugAttr: unknown, title: string | null): string {
  const slug = asString(slugAttr)
  if (slug.length > 0) return slug
  const first = (title ?? "").trim().split(/\s+/)[0] ?? ""
  return first.toLowerCase()
}

type PersonaInfo = {
  readonly slug: string
  readonly title: string
  readonly cover: string
}
export type ResolvedDrawContext = DrawContext & { readonly mechanics: DerivedMechanics }

export async function resolveDrawContext(
  _sb: IdleSupabase,
  now: number
): Promise<ResolvedDrawContext> {
  const personaRows = await everyRow("persona", ["id", "title", "slug", "cover"], 1000)
  const personaById = new Map<string, PersonaInfo>()
  const personaSlugs = new Set<string>()
  for (const row of personaRows) {
    const v = row.values
    const id = typeof v.id === "string" ? v.id : ""
    if (id.length === 0) continue
    const title = typeof v.title === "string" ? v.title : ""
    const slug = deriveSlug(v.slug, typeof v.title === "string" ? v.title : null)
    personaById.set(id, { slug, title, cover: asString(v.cover) })
    if (slug.length > 0) personaSlugs.add(slug)
  }

  const pools: Record<string, string[]> = {}

  const coverRows = await everyRow("persona-cover-image", ["id", "persona-slug"], 10000)
  for (const row of coverRows) {
    const v = row.values
    const imageId = typeof v.id === "string" ? v.id : ""
    if (imageId.length === 0) continue
    const slug = asString(v["persona-slug"])
    if (!personaSlugs.has(slug)) continue
    const bucket = pools[slug] ?? []
    if (!bucket.includes(imageId)) bucket.push(imageId)
    pools[slug] = bucket
  }

  const identities: PersonaIdentity[] = []
  const bySlug = new Map<string, PersonaInfo>()
  for (const persona of personaById.values()) {
    if (persona.slug.length === 0 || bySlug.has(persona.slug)) continue
    bySlug.set(persona.slug, persona)
    identities.push({ slug: persona.slug })
  }
  const mechanics = deriveMechanics(identities)

  const roster: DrawGirl[] = []
  for (const [slug, persona] of bySlug) {
    pools[slug] = pools[slug] ?? []
    roster.push({
      slug,
      name: persona.title,
      level: null,
      stage: "",
      cover: persona.cover,
      rate: mechanics.rateBySlug[slug] ?? 0,
      affinity: mechanics.affinityBySlug[slug] ?? "lead",
    })
  }

  const seed = crypto.getRandomValues(new Uint32Array(1))[0] ?? 1
  return { roster, pools, seed, now, mechanics }
}

export async function loadPersonaInfoBySlug(
  _sb: IdleSupabase
): Promise<ReadonlyMap<string, { readonly id: string; readonly cover: string }>> {
  const personaRows = await everyRow("persona", ["id", "title", "slug", "cover"], 1000)
  const bySlug = new Map<string, { readonly id: string; readonly cover: string }>()
  for (const row of personaRows) {
    const v = row.values
    const id = typeof v.id === "string" ? v.id : ""
    if (id.length === 0) continue
    const slug = deriveSlug(v.slug, typeof v.title === "string" ? v.title : "")
    if (slug.length === 0) continue
    bySlug.set(slug, { id, cover: asString(v.cover) })
  }
  return bySlug
}
