import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterHowManyThings = {
  id: "01a0b723-c242-7b35-a738-03ce6b3792d6",
  type: "page-type/song",
  slug: "sabrina-carpenter-how-many-things",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2e03e7cd-532e-45ad-bbb1-5df25acdb521",
      externalLink: "https://musicbrainz.org/work/2e03e7cd-532e-45ad-bbb1-5df25acdb521",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "how many things",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
