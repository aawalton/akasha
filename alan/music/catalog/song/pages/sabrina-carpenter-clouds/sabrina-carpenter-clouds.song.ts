import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterClouds = {
  id: "01a0b723-c5d1-7bcd-84d1-7d4823a03b3b",
  type: "page-type/song",
  slug: "sabrina-carpenter-clouds",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5dd23efb-3449-48ba-b6ec-2f2559beb9e2",
      externalLink: "https://musicbrainz.org/work/5dd23efb-3449-48ba-b6ec-2f2559beb9e2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Clouds",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
