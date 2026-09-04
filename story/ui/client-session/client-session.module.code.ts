import { buildPageHrefParam } from "@akasha/pages-url/page-href"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import {
  type Beat,
  BeatSchema,
  renderSystemMechanics,
  SystemMechanicsSchema,
} from "@akasha/story-engine-core/beat-schema"
import { QuestSchema } from "@akasha/story-engine-core/quest-schema"
import { DEFAULT_REVEAL_KEYS, narrowRevealed } from "@akasha/story-engine-core/revealed"
import { type GameState, HudSchema } from "@akasha/story-engine-core/state-schema"
import { SystemWindowSchema } from "@akasha/story-engine-core/system-window-schema"
import { z } from "zod"
import type { ClientStoryChapter } from "../client-story-session/client-story-session.module.code.ts"

export const ClientHudSchema = z.object(HudSchema.shape).strict()
export type ClientHud = z.infer<typeof ClientHudSchema>

export const ClientBeatSchema = BeatSchema
export type ClientBeat = Beat

export const ClientQuestSchema = z.object(QuestSchema.shape).strict()
export type ClientQuest = z.infer<typeof ClientQuestSchema>

export const ClientSkillSchema = z.object({
  name: z.string().optional(),
  rank: z.union([z.number(), z.string()]).optional(),
  score: z.number().optional(),
  note: z.string().optional(),
})
export type ClientSkill = z.infer<typeof ClientSkillSchema>

export const ClientAffinitySchema = z.object({
  name: z.string().optional(),
  value: z.number().optional(),
  note: z.string().optional(),
})
export type ClientAffinity = z.infer<typeof ClientAffinitySchema>

export const ClientBondSchema = z.object({
  name: z.string().optional(),
  value: z.number().optional(),
  note: z.string().optional(),
})
export type ClientBond = z.infer<typeof ClientBondSchema>

export const ClientItemSchema = z.object({
  name: z.string().optional(),
  note: z.string().optional(),
})
export type ClientItem = z.infer<typeof ClientItemSchema>

const ClientEquipItemSchema = z.object({
  name: z.string().optional(),
})
export type ClientEquipItem = z.infer<typeof ClientEquipItemSchema>

export const ClientSheetSchema = z.object({
  name: z.string().optional(),
  kind: z.string().optional(),
  level: z.number().optional(),
  class: z.string().optional(),
  attributes: z.record(z.string(), z.union([z.number(), z.string()])).optional(),
  skills: z.array(ClientSkillSchema).optional(),
  affinities: z.array(ClientAffinitySchema).optional(),
  bonds: z.array(ClientBondSchema).optional(),
  items: z.array(ClientItemSchema).optional(),
  equipment: z.record(z.string(), ClientEquipItemSchema).optional(),
  titles: z.array(z.string()).optional(),
  derived: z.record(z.string(), z.number()).optional(),
})
export type ClientSheet = z.infer<typeof ClientSheetSchema>

const RecordSchema = z.record(z.string(), z.unknown())
function asRecord(value: unknown): Record<string, unknown> | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null
  const parsed = RecordSchema.safeParse(value)
  return parsed.success ? parsed.data : null
}

function scalarRecord(value: unknown): Record<string, number | string> | undefined {
  const rec = asRecord(value)
  if (rec === null) return undefined
  const out: Record<string, number | string> = {}
  for (const [k, v] of Object.entries(rec)) {
    if (typeof v === "number" || typeof v === "string") out[k] = v
  }
  return Object.keys(out).length > 0 ? out : undefined
}

function numberRecord(value: unknown): Record<string, number> | undefined {
  const rec = asRecord(value)
  if (rec === null) return undefined
  const out: Record<string, number> = {}
  for (const [k, v] of Object.entries(rec)) {
    if (typeof v === "number") out[k] = v
  }
  return Object.keys(out).length > 0 ? out : undefined
}

function stringArray(value: unknown): readonly string[] | undefined {
  if (!Array.isArray(value)) return undefined
  const out = value.filter((v): v is string => typeof v === "string")
  return out.length > 0 ? out : undefined
}

function projectedArray<T>(
  value: unknown,
  project: (raw: unknown) => T | null
): readonly T[] | undefined {
  if (!Array.isArray(value)) return undefined
  const out = value.flatMap((el) => {
    const projected = project(el)
    return projected !== null ? [projected] : []
  })
  return out.length > 0 ? out : undefined
}

function toClientSkill(raw: unknown): ClientSkill | null {
  const rec = asRecord(raw)
  if (rec === null) return null
  const candidate: Record<string, unknown> = {}
  if (typeof rec["name"] === "string") candidate["name"] = rec["name"]
  const rank = rec["rank"] ?? rec["rung"]
  if (typeof rank === "string" || typeof rank === "number") candidate["rank"] = rank
  if (typeof rec["score"] === "number") candidate["score"] = rec["score"]
  if (typeof rec["note"] === "string") candidate["note"] = rec["note"]
  const parsed = ClientSkillSchema.safeParse(candidate)
  return parsed.success ? parsed.data : null
}

function toClientAffinity(raw: unknown): ClientAffinity | null {
  const rec = asRecord(raw)
  if (rec === null) return null
  const candidate: Record<string, unknown> = {}
  if (typeof rec["name"] === "string") candidate["name"] = rec["name"]
  if (typeof rec["value"] === "number") candidate["value"] = rec["value"]
  if (typeof rec["note"] === "string") candidate["note"] = rec["note"]
  const parsed = ClientAffinitySchema.safeParse(candidate)
  return parsed.success ? parsed.data : null
}

function toClientBond(raw: unknown): ClientBond | null {
  const rec = asRecord(raw)
  if (rec === null) return null
  const candidate: Record<string, unknown> = {}
  if (typeof rec["name"] === "string") candidate["name"] = rec["name"]
  if (typeof rec["value"] === "number") candidate["value"] = rec["value"]
  if (typeof rec["note"] === "string") candidate["note"] = rec["note"]
  const parsed = ClientBondSchema.safeParse(candidate)
  return parsed.success ? parsed.data : null
}

function toClientItem(raw: unknown): ClientItem | null {
  const rec = asRecord(raw)
  if (rec === null) return null
  const candidate: Record<string, unknown> = {}
  if (typeof rec["name"] === "string") candidate["name"] = rec["name"]
  if (typeof rec["note"] === "string") candidate["note"] = rec["note"]
  const parsed = ClientItemSchema.safeParse(candidate)
  return parsed.success ? parsed.data : null
}

function toClientEquipment(value: unknown): Record<string, ClientEquipItem> | undefined {
  const rec = asRecord(value)
  if (rec === null) return undefined
  const out: Record<string, ClientEquipItem> = {}
  for (const [slot, item] of Object.entries(rec)) {
    const itemRec = asRecord(item)
    if (itemRec === null) continue
    if (typeof itemRec["name"] === "string") out[slot] = { name: itemRec["name"] }
  }
  return Object.keys(out).length > 0 ? out : undefined
}

function toClientSheet(revealed: unknown): ClientSheet | null {
  const rec = asRecord(revealed)
  if (rec === null) return null
  return ClientSheetSchema.parse({
    name: typeof rec["name"] === "string" ? rec["name"] : undefined,
    kind: typeof rec["kind"] === "string" ? rec["kind"] : undefined,
    level: typeof rec["level"] === "number" ? rec["level"] : undefined,
    class: typeof rec["class"] === "string" ? rec["class"] : undefined,
    attributes: scalarRecord(rec["attributes"]),
    skills: projectedArray(rec["skills"], toClientSkill),
    affinities: projectedArray(rec["affinities"], toClientAffinity),
    bonds: projectedArray(rec["bonds"], toClientBond),
    items: projectedArray(rec["inventory"], toClientItem),
    equipment: toClientEquipment(rec["equipment"]),
    titles: stringArray(rec["titles"]),
    derived: numberRecord(rec["derived"]),
  })
}

function toClientBeat(raw: unknown): ClientBeat | null {
  const rec = asRecord(raw)
  if (rec === null) return null
  const type = rec["type"] === "system" ? "system" : "narrative"
  const candidate: Record<string, unknown> = { type }
  const id = rec["id"]
  if (typeof id === "string" || typeof id === "number") candidate["id"] = id
  if (typeof rec["turn"] === "number") candidate["turn"] = rec["turn"]
  if (typeof rec["text"] === "string") candidate["text"] = rec["text"]
  const mechanics = SystemMechanicsSchema.safeParse(rec["mechanics"])
  const windowParsed = SystemWindowSchema.safeParse(rec["window"])
  if (type === "system" && windowParsed.success) {
    candidate["window"] = windowParsed.data
  } else if (type === "system" && mechanics.success) {
    candidate["lines"] = renderSystemMechanics(mechanics.data).lines
  } else {
    if (typeof rec["title"] === "string") candidate["title"] = rec["title"]
    const lines = stringArray(rec["lines"])
    if (lines !== undefined) candidate["lines"] = lines
  }
  const parsed = ClientBeatSchema.safeParse(candidate)
  return parsed.success ? parsed.data : null
}

const STORY_CHAPTER_SLUG = "story-chapter-played"
const STORY_CHAPTER_PAGE_TYPE_SLUG = toPageTypeSlug(STORY_CHAPTER_SLUG)

function toChapterLinksFromState(chapters: readonly unknown[]): readonly ClientStoryChapter[] {
  return chapters.flatMap((entry) => {
    const rec = asRecord(entry)
    if (rec === null) return []
    const title = typeof rec["title"] === "string" ? rec["title"] : "Untitled"
    const chapterNumber = typeof rec["number"] === "number" ? rec["number"] : undefined
    const readerLink = rec["readerLink"]
    if (typeof readerLink === "string" && readerLink !== "") {
      const id = readerLink.slice(readerLink.lastIndexOf("/") + 1)
      return [{ id, title, href: readerLink, chapterNumber }]
    }
    const chapterId = rec["chapterId"]
    if (typeof chapterId !== "string") return []
    const param = buildPageHrefParam({
      pageTypeSlug: STORY_CHAPTER_PAGE_TYPE_SLUG,
      slug: null,
      fallbackSlugSource: title,
      id: chapterId,
    })
    return [{ id: chapterId, title, href: `/${STORY_CHAPTER_SLUG}/${param}`, chapterNumber }]
  })
}

export function projectClientHud(state: GameState): ClientHud | null {
  return state.hud !== undefined ? ClientHudSchema.parse(state.hud) : null
}

export function projectClientSheet(
  state: GameState,
  revealKeys?: readonly string[]
): ClientSheet | null {
  if (state.revealed === undefined) return null
  return toClientSheet(narrowRevealed(state.revealed, revealKeys ?? DEFAULT_REVEAL_KEYS))
}

export function projectClientBeats(state: GameState): readonly ClientBeat[] {
  return Array.isArray(state.log)
    ? state.log.flatMap((b) => {
        const beat = toClientBeat(b)
        return beat !== null ? [beat] : []
      })
    : []
}

export function projectStateChapterLinks(state: GameState): readonly ClientStoryChapter[] {
  return Array.isArray(state.chapters) ? toChapterLinksFromState(state.chapters) : []
}

export function projectClientQuests(state: GameState): readonly ClientQuest[] {
  return Array.isArray(state.quests) ? state.quests.map((q) => ClientQuestSchema.parse(q)) : []
}
