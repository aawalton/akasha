import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayLifeInTechnicolor = {
  id: "01a0ba5d-4dba-7292-b027-81b59d2f92a6",
  type: "page-type/song",
  slug: "coldplay-life-in-technicolor",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2a07afef-446e-3a6c-9b8e-0937ce0244d5",
      externalLink: "https://musicbrainz.org/work/2a07afef-446e-3a6c-9b8e-0937ce0244d5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Life in Technicolor",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
