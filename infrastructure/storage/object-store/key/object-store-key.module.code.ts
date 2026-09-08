export function encodeObjectStoreKey(key: string): string {
  return key
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/")
}

export function imageObjectKey(pageId: string): string {
  return `images/${pageId}.png`
}

export function legacyImageObjectKey(pageId: string): string {
  return `persona-images/${pageId}.png`
}

export function imageObjectReadKeys(pageId: string): readonly string[] {
  return [imageObjectKey(pageId), legacyImageObjectKey(pageId)]
}

export function audioObjectKey(pageId: string): string {
  return `audio/${pageId}.wav`
}

export function mediaRenderObjectKey(
  pageId: string,
  medium: string,
  variant: string,
  ext: string
): string {
  return `media-renders/${pageId}/${medium}/${variant}.${ext}`
}

export function hlsPlaylistObjectKey(pageId: string, opts?: HlsKeyOpts): string {
  return `media-renders/${pageId}/audio/${hlsStem(opts)}.m3u8`
}

export interface HlsKeyOpts {
  readonly fromSentence?: number
}

function hlsStem(opts?: HlsKeyOpts): string {
  const n = opts?.fromSentence
  return n != null && n > 0 ? `read-aloud-hls.from-${Math.trunc(n)}` : "read-aloud-hls"
}

export function hlsSegmentPrefix(pageId: string, opts?: HlsKeyOpts): string {
  return `media-renders/${pageId}/audio/${hlsStem(opts)}/`
}

export function hlsSegmentObjectKey(
  pageId: string,
  segmentName: string,
  opts?: HlsKeyOpts
): string {
  return `${hlsSegmentPrefix(pageId, opts)}${segmentName}`
}

export function voiceReferenceObjectKey(pageId: string): string {
  return `persona-voices/${pageId}.reference.wav`
}

export function voiceCentroidObjectKey(pageId: string): string {
  return `persona-voices/${pageId}.centroid.json`
}
