export const KOKORO_STREAM_VARIANT = "kokoro"

export const KOKORO_STREAM_LABEL = "Read aloud"

export const STORED_READ_ALOUD_VARIANT = "read-aloud"

export function mediaSrcForVariant(
  pageId: string,
  medium: string,
  variant: string,
  fromSentence?: number | null
): string {
  if (variant !== KOKORO_STREAM_VARIANT) return `/api/media/${pageId}/${medium}?variant=${variant}`
  const suffix = fromSentence != null && fromSentence > 0 ? `?fromSentence=${fromSentence}` : ""
  return `/api/media/${pageId}/${medium}/stream${suffix}`
}

export function mediaHlsSrcForVariant(
  pageId: string,
  medium: string,
  fromSentence?: number | null
): string {
  const base = `/api/media/${pageId}/${medium}/hls.m3u8?variant=${KOKORO_STREAM_VARIANT}`
  return fromSentence != null && fromSentence > 0 ? `${base}&fromSentence=${fromSentence}` : base
}
