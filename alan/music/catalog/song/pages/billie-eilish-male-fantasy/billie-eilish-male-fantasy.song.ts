import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishMaleFantasy = {
  id: "019ea4a9-0951-7331-addb-f954ef3ccc53",
  type: "page-type/song",
  slug: "billie-eilish-male-fantasy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3b8a5b19-468e-4e60-9c6d-c310bf4f755a",
      externalLink: "https://musicbrainz.org/work/3b8a5b19-468e-4e60-9c6d-c310bf4f755a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Male Fantasy",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
