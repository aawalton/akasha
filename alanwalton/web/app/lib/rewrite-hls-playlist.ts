export type HlsRewriteOpts = {
  origin: string
  pageId: string
  medium: string
  variant: string
  token: string | null
  fromSentence?: number | null
}

export function rewriteHlsPlaylist(m3u8Text: string, opts: HlsRewriteOpts): string {
  const { origin, pageId, medium, variant, token, fromSentence } = opts
  const base = `${origin}/api/media/${pageId}/${medium}/hls/`
  return m3u8Text
    .split("\n")
    .map((line) => {
      const trimmed = line.trim()
      if (trimmed === "" || trimmed.startsWith("#")) return line
      const query = new URLSearchParams({ variant })
      if (token != null) query.set("token", token)
      if (fromSentence != null && fromSentence > 0) {
        query.set("fromSentence", String(Math.trunc(fromSentence)))
      }
      return `${base}${trimmed}?${query.toString()}`
    })
    .join("\n")
}
