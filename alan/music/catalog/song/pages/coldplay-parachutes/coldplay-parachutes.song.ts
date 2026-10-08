import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayParachutes = {
  id: "01a0ba5d-4cb7-79ea-a955-fba32478abad",
  type: "page-type/song",
  slug: "coldplay-parachutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "135a391b-8779-397f-be3a-5de74e3e0359",
      externalLink: "https://musicbrainz.org/work/135a391b-8779-397f-be3a-5de74e3e0359",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Parachutes",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T15:51:11.799Z",
  updatedAt: "2026-09-19T16:18:26.000Z",
} as const satisfies Song
