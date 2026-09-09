import type { Module } from "@akasha/code/module"

export const rewriteHlsPlaylist = {
  id: "01a0655d-dab8-730c-a817-9a79cc9bc0b4",
  pageTypeSlug: "module",
  type: "module",
  slug: "rewrite-hls-playlist",
  definition: "an HLS playlist's segment addresses pointed at this server",
  code: "ts",
} as const satisfies Module
