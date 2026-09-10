import { MEDIA_FORMATS } from "@akasha/pages/core/media-formats"
import type { Page } from "@akasha/pages/core/page-types"
import type { Asked, Query } from "@akasha/pages/service/asking"
import { askingFor } from "@akasha/pages/service/calling"
import { getPage } from "@akasha/pages-access/get"
import { getAvailableRenditions, pickDefaultVariant } from "@akasha/pages-ui/media/media-renditions"
import {
  KOKORO_STREAM_LABEL,
  KOKORO_STREAM_VARIANT,
  STORED_READ_ALOUD_VARIANT,
} from "@akasha/pages-ui/media/media-src"
import type { MediaVariant } from "@akasha/pages-ui/media/page-media-player"
import { isRecord } from "@akasha/utils/narrow/is-record"
import type { SentenceMark } from "akasha/alan/harness/voice-core/mark-schema/mark-schema.module.code.ts"
import { mediaRenderObjectKey } from "akasha/infrastructure/storage/object-store/key/object-store-key.module.code.ts"
import { seaweedFSObjectStoreFromEnv } from "akasha/infrastructure/storage/object-store/seaweedfs-store/seaweedfs-store.module.code.ts"
import { resolveReadAloudSentenceMarks } from "../read-aloud-marks/read-aloud-marks.module.code.ts"

const READING_STORY_SLUG = "reading-story"

const VOICED_PERSONAS = "the personas carrying a voice reference"

const EVERY_PERSONA_VOICE: Query = {
  pageTypeSlug: "persona",
  keys: ["slug", "voiceReferenceSha256"],
}

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

export function voicedPersonasIn(asked: Asked): readonly string[] {
  if ("refused" in asked) {
    throw new Error(`${VOICED_PERSONAS} went unread: ${asked.refused}`)
  }
  const candidateSlugs: string[] = []
  for (const row of asked.rows) {
    const sha256 = row["voiceReferenceSha256"]
    if (typeof sha256 !== "string" || sha256.length === 0) continue
    const slug = row["slug"]
    if (typeof slug !== "string" || slug.length === 0) continue
    candidateSlugs.push(slug)
  }
  return candidateSlugs
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

  const candidateSlugs = voicedPersonasIn(await askingFor(EVERY_PERSONA_VOICE))
  const available = await getAvailableRenditions(store, {
    pageId: page.id,
    medium: "audio",
    candidates: candidateSlugs,
  })
  const variants: MediaVariant[] = available.map((slug) => ({ id: slug, label: slug }))

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
      pageTypeSlug: READING_STORY_SLUG,
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
