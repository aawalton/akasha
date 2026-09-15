import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonAlreadyGone = {
  id: "019ea4ad-c3d5-7290-a26c-b6b2d61aabc3",
  type: "song",
  slug: "kelly-clarkson-already-gone",
  title: "Already Gone",
  artist: "artist/kelly-clarkson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3e4a5070-273f-3fa4-92d5-7720e75a7c5d",
      externalLink: "https://musicbrainz.org/work/3e4a5070-273f-3fa4-92d5-7720e75a7c5d",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
