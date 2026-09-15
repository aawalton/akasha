import type { SentenceMark } from "akasha/alan/harness/voice-core/modules/mark-schema/mark-schema.module.code.ts"
import { resolveReadAloudSentenceMarks } from "akasha/alan/web/modules/read-aloud-marks/read-aloud-marks.module.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { mediaRenderObjectKey } from "akasha/infrastructure/storage/object-store/modules/key/object-store-key.module.code.ts"
import { seaweedFSObjectStoreFromEnv } from "akasha/infrastructure/storage/object-store/modules/seaweedfs-store/seaweedfs-store.module.code.ts"
import { getPage } from "akasha/page/access/modules/get/get.module.code.ts"
import { MEDIA_FORMATS } from "akasha/page/core/modules/media-formats/media-formats.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type {
  Asked,
  Query,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  getAvailableRenditions,
  pickDefaultVariant,
} from "akasha/page/ui/media/modules/media-renditions/media-renditions.module.code.ts"
import {
  KOKORO_STREAM_LABEL,
  KOKORO_STREAM_VARIANT,
  STORED_READ_ALOUD_VARIANT,
} from "akasha/page/ui/media/modules/media-src/media-src.module.code.ts"
import type { MediaVariant } from "akasha/page/ui/media/modules/page-media-player/page-media-player.module.code.tsx"

const READING_STORY_SLUG = "reading-story"

const VOICED_PERSONAS = "the personas carrying a voice reference"

const EVERY_PERSONA_VOICE: Query = {
  pageTypeSlug: "persona",
  keys: ["slug", "voiceReferenceSha256"],
}

function withKokoroFallback(
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

function voicedPersonasIn(asked: Asked): readonly string[] {
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
