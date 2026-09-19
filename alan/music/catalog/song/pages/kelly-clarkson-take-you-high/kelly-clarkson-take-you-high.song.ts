import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonTakeYouHigh = {
  id: "019ea4c1-4846-737f-8674-c0cad012d2df",
  type: "page-type/song",
  slug: "kelly-clarkson-take-you-high",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "be9dd86b-0a92-4836-99da-c4db96d1db5e",
      externalLink: "https://musicbrainz.org/work/be9dd86b-0a92-4836-99da-c4db96d1db5e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Take You High",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
