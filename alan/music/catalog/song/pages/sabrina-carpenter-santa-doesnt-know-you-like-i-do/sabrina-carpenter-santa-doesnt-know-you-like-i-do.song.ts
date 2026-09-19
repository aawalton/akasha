import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterSantaDoesntKnowYouLikeIDo = {
  id: "01a0b723-d941-75fb-8ffd-969f5973936e",
  type: "page-type/song",
  slug: "sabrina-carpenter-santa-doesnt-know-you-like-i-do",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e12c9a9b-dea1-4383-b185-ba53ffb2620d",
      externalLink: "https://musicbrainz.org/work/e12c9a9b-dea1-4383-b185-ba53ffb2620d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "santa doesn’t know you like i do",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
