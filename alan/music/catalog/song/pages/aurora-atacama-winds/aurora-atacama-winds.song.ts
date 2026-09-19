import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraAtacamaWinds = {
  id: "019ea4a3-a851-77d4-9143-fab7539876fb",
  type: "page-type/song",
  slug: "aurora-atacama-winds",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1f3d9d52-1512-4ab7-8f04-0eb48dc89f5e",
      externalLink: "https://musicbrainz.org/work/1f3d9d52-1512-4ab7-8f04-0eb48dc89f5e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Atacama Winds",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
