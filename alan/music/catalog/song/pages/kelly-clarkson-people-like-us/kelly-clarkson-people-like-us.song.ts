import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonPeopleLikeUs = {
  id: "019ea4c1-287d-736e-9c3b-edd89f646a0f",
  type: "page-type/song",
  slug: "kelly-clarkson-people-like-us",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a700ae69-f1df-4241-9b47-8090deadd70a",
      externalLink: "https://musicbrainz.org/work/a700ae69-f1df-4241-9b47-8090deadd70a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "People Like Us",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
