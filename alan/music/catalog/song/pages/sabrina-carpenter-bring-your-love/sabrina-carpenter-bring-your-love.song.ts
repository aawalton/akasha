import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterBringYourLove = {
  id: "01a0b723-cb8e-7c8f-89e3-3a2e08de2605",
  type: "page-type/song",
  slug: "sabrina-carpenter-bring-your-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a977c61d-c6e5-4aaf-957e-a1f95e43cdb2",
      externalLink: "https://musicbrainz.org/work/a977c61d-c6e5-4aaf-957e-a1f95e43cdb2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bring Your Love",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T00:49:31.534Z",
  updatedAt: "2026-09-19T16:49:35.000Z",
} as const satisfies Song
