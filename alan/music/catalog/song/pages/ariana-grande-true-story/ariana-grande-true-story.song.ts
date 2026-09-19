import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTrueStory = {
  id: "019ea4e6-b1bc-7279-aed5-1c2dbeadf57a",
  type: "page-type/song",
  slug: "ariana-grande-true-story",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9e2e20d5-76a7-405e-a8ea-3f877d6c3485",
      externalLink: "https://musicbrainz.org/work/9e2e20d5-76a7-405e-a8ea-3f877d6c3485",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "true story",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
