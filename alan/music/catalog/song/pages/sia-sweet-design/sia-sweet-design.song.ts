import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSweetDesign = {
  id: "019ea4ca-7dd2-7938-a8b5-237b53704178",
  type: "page-type/song",
  slug: "sia-sweet-design",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "01e91964-98e8-4550-825e-97c9b7598832",
      externalLink: "https://musicbrainz.org/work/01e91964-98e8-4550-825e-97c9b7598832",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sweet Design",
  artist: "artist/sia",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
