import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiEric = {
  id: "019f0ea3-44f4-780a-924e-827348aeb40a",
  type: "page-type/song",
  slug: "mitski-eric",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "861f4289-83ca-4df7-864e-0e9ff47434a0",
      externalLink: "https://musicbrainz.org/work/861f4289-83ca-4df7-864e-0e9ff47434a0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Eric",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
