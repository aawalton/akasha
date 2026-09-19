import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonHaunted = {
  id: "019ea4b0-7553-7813-b2be-03619c614283",
  type: "page-type/song",
  slug: "kelly-clarkson-haunted",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d5902350-3fa1-4a74-a862-80fb3477324d",
      externalLink: "https://musicbrainz.org/work/d5902350-3fa1-4a74-a862-80fb3477324d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Haunted",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
