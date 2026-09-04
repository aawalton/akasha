import { z } from "zod"
import { apiFetch } from "../api-fetch/api-fetch.module.code.ts"
import { API_ORIGIN } from "../api-origin/api-origin.module.code.ts"

const mediaTokenResponseSchema = z.object({ token: z.string().min(1) }).strict()

export async function resolveShellMediaSrc(track: {
  pageId: string
  medium: string
  variant: string
}): Promise<string> {
  const { pageId, medium, variant } = track
  const mintQuery = new URLSearchParams({ pageId, medium, variant }).toString()
  const res = await apiFetch(`/api/media/token?${mintQuery}`)
  if (!res.ok) throw new Error(`media token mint: status ${res.status}`)
  const { token } = mediaTokenResponseSchema.parse(await res.json())
  const streamQuery = new URLSearchParams({ variant, token }).toString()
  return `${API_ORIGIN}/api/media/${pageId}/${medium}?${streamQuery}`
}

export async function resolveShellHlsSrc(track: {
  pageId: string
  medium: string
  variant: string
  fromSentence?: number | null
}): Promise<string> {
  const { pageId, medium, variant, fromSentence } = track
  const mintQuery = new URLSearchParams({ pageId, medium, variant }).toString()
  const res = await apiFetch(`/api/media/token?${mintQuery}`)
  if (!res.ok) throw new Error(`media token mint: status ${res.status}`)
  const { token } = mediaTokenResponseSchema.parse(await res.json())
  const playlistParams = new URLSearchParams({ variant, token })
  if (fromSentence != null && fromSentence > 0) {
    playlistParams.set("fromSentence", String(fromSentence))
  }
  return `${API_ORIGIN}/api/media/${pageId}/${medium}/hls.m3u8?${playlistParams.toString()}`
}
