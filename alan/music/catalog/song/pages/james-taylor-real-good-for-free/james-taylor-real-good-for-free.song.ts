import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorRealGoodForFree = {
  id: "01a0b72f-45a5-7f50-8117-df49d43b0197",
  type: "page-type/song",
  slug: "james-taylor-real-good-for-free",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fb82368d-caa1-41f0-8164-7d0a1810007a",
      externalLink: "https://musicbrainz.org/work/fb82368d-caa1-41f0-8164-7d0a1810007a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Real Good for Free",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
} as const satisfies Song
