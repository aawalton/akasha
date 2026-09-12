export interface HlsPlaylistTiming {
  readonly durations: readonly number[]
  readonly ended: boolean
}

const EXTINF_PREFIX = "#EXTINF:"
const ENDLIST_TAG = "#EXT-X-ENDLIST"

export function parseHlsExtinf(m3u8Text: string): HlsPlaylistTiming {
  const durations: number[] = []
  let ended = false
  for (const raw of m3u8Text.split("\n")) {
    const line = raw.trim()
    if (line === ENDLIST_TAG) {
      ended = true
    } else if (line.startsWith(EXTINF_PREFIX)) {
      const after = line.slice(EXTINF_PREFIX.length)
      const comma = after.indexOf(",")
      const numStr = (comma === -1 ? after : after.slice(0, comma)).trim()
      const n = Number.parseFloat(numStr)
      if (Number.isFinite(n) && n >= 0) durations.push(n)
    }
  }
  return { durations, ended }
}
