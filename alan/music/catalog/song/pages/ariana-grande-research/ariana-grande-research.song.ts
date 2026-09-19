import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeResearch = {
  id: "019ea4e7-9aab-7a44-94f9-d232ce742ce8",
  type: "page-type/song",
  slug: "ariana-grande-research",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d44bd5d3-75f2-4054-bda2-e2a4e432701b",
      externalLink: "https://musicbrainz.org/work/d44bd5d3-75f2-4054-bda2-e2a4e432701b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Research",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
