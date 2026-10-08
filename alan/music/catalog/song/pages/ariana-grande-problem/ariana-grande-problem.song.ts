import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeProblem = {
  id: "019ea4e4-3669-74ac-9fc3-8c2ab620141b",
  type: "page-type/song",
  slug: "ariana-grande-problem",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2078d63c-69ad-4696-8e04-82ef6735a669",
      externalLink: "https://musicbrainz.org/work/2078d63c-69ad-4696-8e04-82ef6735a669",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Problem",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:41:20.105Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
