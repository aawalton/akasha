import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayHymnForTheWeekend = {
  id: "01a0ba5d-4968-7343-8633-83b99f82e268",
  type: "page-type/song",
  slug: "coldplay-hymn-for-the-weekend",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ebc9d6c1-a8bc-4c76-ba1b-c6a4ebfd7e3f",
      externalLink: "https://musicbrainz.org/work/ebc9d6c1-a8bc-4c76-ba1b-c6a4ebfd7e3f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hymn for the Weekend",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
