import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeKnewBetterForeverBoy = {
  id: "019ea4e3-2a71-7e2d-9596-44b4710156ad",
  type: "page-type/song",
  slug: "ariana-grande-knew-better-forever-boy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c92185e9-ea35-4abb-94eb-1892349dd09f",
      externalLink: "https://musicbrainz.org/work/c92185e9-ea35-4abb-94eb-1892349dd09f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Knew Better / Forever Boy",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
