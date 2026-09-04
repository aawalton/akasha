import { hlsPlaylistObjectKey } from "@akasha/object-store/object-store-key"
import type { ObjectStore } from "@akasha/object-store/seaweedfs-store"
import { getPage } from "@akasha/pages-access/get"
import { getMediaConfig } from "@akasha/pages-access/page-type-config"
import {
  estimateChapterSentenceMarks,
  estimateChapterSentenceMarksFromN,
} from "@akasha/voice-core/voice/estimate-marks"
import type { SentenceMark } from "@akasha/voice-core/voice/mark-schema"
import { parseHlsExtinf } from "../hls-extinf/hls-extinf.module.code.ts"

async function readReadAloudPlaylist(
  store: ObjectStore,
  pageId: string,
  fromSentence = 0
): Promise<string | null> {
  try {
    return new TextDecoder().decode(await store.get(hlsPlaylistObjectKey(pageId, { fromSentence })))
  } catch {
    return null
  }
}

async function resolveChapterBody(pageId: string, pageTypeSlug: string): Promise<string> {
  const mediaConfig = await getMediaConfig({ pageTypeSlug })
  const sourcePropertyId = mediaConfig?.audio?.sourcePropertyId
  if (sourcePropertyId == null) return ""
  const row = await getPage({
    pageTypeSlug,
    where: [{ key: "id", eq: pageId }],
    select: ["id", sourcePropertyId],
  })
  const textValue = row?.[sourcePropertyId]
  return typeof textValue === "string" ? textValue : ""
}

export async function resolveReadAloudSentenceMarks(
  store: ObjectStore,
  args: { pageId: string; pageTypeSlug: string }
): Promise<readonly SentenceMark[]> {
  const { pageId, pageTypeSlug } = args

  const m3u8 = await readReadAloudPlaylist(store, pageId)
  if (m3u8 === null) return []
  const { durations, ended } = parseHlsExtinf(m3u8)
  if (!ended || durations.length === 0) return []

  const body = await resolveChapterBody(pageId, pageTypeSlug)
  if (body.length === 0) return []

  return estimateChapterSentenceMarks(body, durations)
}

export async function resolveFromNSentenceMarks(
  store: ObjectStore,
  args: { pageId: string; pageTypeSlug: string; fromSentence: number }
): Promise<readonly SentenceMark[]> {
  const { pageId, pageTypeSlug, fromSentence } = args
  const body = await resolveChapterBody(pageId, pageTypeSlug)
  if (body.length === 0) return []

  const m3u8 = await readReadAloudPlaylist(store, pageId, fromSentence)
  const timing = m3u8 === null ? null : parseHlsExtinf(m3u8)
  const durations = timing?.ended && timing.durations.length > 0 ? timing.durations : undefined
  if (durations != null) {
    const accurate = estimateChapterSentenceMarksFromN(body, {
      fromSentenceIndex: fromSentence,
      segmentDurationsSec: durations,
    })
    if (accurate.length > 0) return accurate
  }
  return estimateChapterSentenceMarksFromN(body, { fromSentenceIndex: fromSentence })
}
