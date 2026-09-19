import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiInALake = {
  id: "019f0ea8-c94a-76ac-8139-e25691a64f62",
  type: "page-type/song",
  slug: "mitski-in-a-lake",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fe2c057d-a5f0-4abc-8fd0-e8796e38e41c",
      externalLink: "https://musicbrainz.org/work/fe2c057d-a5f0-4abc-8fd0-e8796e38e41c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In a Lake",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
