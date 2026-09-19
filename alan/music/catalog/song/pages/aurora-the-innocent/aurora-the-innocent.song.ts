import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheInnocent = {
  id: "019ea4a6-61fc-71bd-8293-3c19385a5f77",
  type: "page-type/song",
  slug: "aurora-the-innocent",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9d52c4a4-dcb7-4fb1-be64-87646f608de6",
      externalLink: "https://musicbrainz.org/work/9d52c4a4-dcb7-4fb1-be64-87646f608de6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Innocent",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
