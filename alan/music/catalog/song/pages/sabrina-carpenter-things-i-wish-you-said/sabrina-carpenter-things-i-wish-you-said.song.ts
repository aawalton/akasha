import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterThingsIWishYouSaid = {
  id: "01a0b723-d251-7cd3-8a04-380f87141b9a",
  type: "page-type/song",
  slug: "sabrina-carpenter-things-i-wish-you-said",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3608f074-d977-4d0f-a1f6-bd97576f612a",
      externalLink: "https://musicbrainz.org/work/3608f074-d977-4d0f-a1f6-bd97576f612a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "things i wish you said",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
