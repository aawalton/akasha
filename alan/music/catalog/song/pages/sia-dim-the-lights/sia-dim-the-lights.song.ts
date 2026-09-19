import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDimTheLights = {
  id: "019ea4c4-9c94-7335-a405-4cbb825bd33f",
  type: "page-type/song",
  slug: "sia-dim-the-lights",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "85e67ee4-a08c-4d8f-acf1-2daa5426c246",
      externalLink: "https://musicbrainz.org/work/85e67ee4-a08c-4d8f-acf1-2daa5426c246",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dim the Lights",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
