import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrande7RingsRemix = {
  id: "01a0ba8d-780b-7516-a2ec-723eb58acaec",
  type: "page-type/song",
  slug: "ariana-grande-7-rings-remix",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c155c56e-f776-4447-979f-db4c9d5f8b1e",
      externalLink: "https://musicbrainz.org/work/c155c56e-f776-4447-979f-db4c9d5f8b1e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "7 rings (remix)",
  artist: "artist/ariana-grande",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
