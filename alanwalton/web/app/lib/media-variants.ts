import type { SentenceMark } from "@alanwalton/voice-core/voice/mark-schema"
import { seaweedFSObjectStoreFromEnv } from "@shared/object-store"
import { mediaRenderObjectKey } from "@shared/object-store/keys"
import { getPage } from "@shared/pages-access/get"
import { type Page } from "@shared/pages-core/page-types"
import { MEDIA_FORMATS } from "@shared/pages-core/media-formats"
import { type Asked, askNamed } from "@shared/pages-query"
import { type MediaVariant } from "@shared/pages-ui/media/page-media-player"
import { KOKORO_STREAM_LABEL, KOKORO_STREAM_VARIANT, STORED_READ_ALOUD_VARIANT } from "@shared/pages-ui/media/media-src"
import { getAvailableRenditions, pickDefaultVariant } from "@shared/pages-ui/media/media-renditions"
import { isRecord } from "../../../../shared/utils-narrow/src/is-record"
import { resolveReadAloudSentenceMarks } from "~/lib/read-aloud-marks"

const VOICED_PERSONAS_QUERY = "persona-all"

export function withKokoroFallback(
  variants: readonly MediaVariant[],
  defaultVariant: string | null,
  storedReadAloud: boolean
): { variants: readonly MediaVariant[]; defaultVariant: string | null } {
  if (variants.length > 0) return { variants, defaultVariant }
  const id = storedReadAloud ? STORED_READ_ALOUD_VARIANT : KOKORO_STREAM_VARIANT
  return {
    variants: [{ id, label: KOKORO_STREAM_LABEL }],
    defaultVariant: id,
  }
}

export function voicedPersonasIn(asked: Asked): {
  candidateSlugs: readonly string[]
  displayNameBySlug: ReadonlyMap<string, string>
} {
  if (!asked.ok) {
    throw new Error(
      `\`${VOICED_PERSONAS_QUERY}\` went unread: ${asked.why} — the voiced personas are the whole set of voices this page offers, so carrying on without them would present a single fallback voice as everything there is`
    )
  }
  const displayNameBySlug = new Map<string, string>()
  const candidateSlugs: string[] = []
  for (const row of asked.answer.rows) {
    const sha256 = row.values["voice-reference-sha256"]
    if (typeof sha256 !== "string" || sha256.length === 0) continue
    const slug = row.values["slug"]
    if (typeof slug !== "string" || slug.length === 0) continue
    const title = row.values["title"]
    const voiceTitle = typeof title === "string" && title.length > 0 ? title : slug
    if (!displayNameBySlug.has(slug)) displayNameBySlug.set(slug, voiceTitle)
    candidateSlugs.push(slug)
  }
  return { candidateSlugs, displayNameBySlug }
}

export async function resolveMediaVariants(args: { page: Page }): Promise<{
  variants: readonly MediaVariant[]
  defaultVariant: string | null
  sentenceMarks: readonly SentenceMark[]
}> {
  const { page } = args
  if (typeof page.id !== "string") return { variants: [], defaultVariant: null, sentenceMarks: [] }
  const store = seaweedFSObjectStoreFromEnv()
  if (!store) return { variants: [], defaultVariant: null, sentenceMarks: [] }

  const { candidateSlugs, displayNameBySlug } = voicedPersonasIn(
    await askNamed(VOICED_PERSONAS_QUERY)
  )
  const available = await getAvailableRenditions(store, {
    pageId: page.id,
    medium: "audio",
    candidates: candidateSlugs,
  })
  const variants: MediaVariant[] = available.map((slug) => ({
    id: slug,
    label: displayNameBySlug.get(slug) ?? slug,
  }))

  const storedReadAloud =
    available.length === 0 &&
    (await store.head(
      mediaRenderObjectKey(page.id, "audio", STORED_READ_ALOUD_VARIANT, MEDIA_FORMATS.audio.ext)
    )) !== null

  const storyRef = page.story
  const parentStoryId =
    typeof storyRef === "string"
      ? storyRef
      : isRecord(storyRef) && typeof storyRef.id === "string"
        ? storyRef.id
        : null
  let narrator: string | null = null
  if (parentStoryId != null) {
    const story = await getPage({
      where: [{ key: "id", eq: parentStoryId }],
      select: ["narrator"],
    })
    narrator =
      story != null && typeof story.narrator === "string" && story.narrator.length > 0
        ? story.narrator
        : null
  }
  const defaultVariant = pickDefaultVariant(narrator, available)

  const pageTypeSlug = typeof page.pageTypeSlug === "string" ? page.pageTypeSlug : null
  const sentenceMarks =
    storedReadAloud && pageTypeSlug !== null
      ? await resolveReadAloudSentenceMarks(store, { pageId: page.id, pageTypeSlug })
      : []

  return { ...withKokoroFallback(variants, defaultVariant, storedReadAloud), sentenceMarks }
}
