import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBadDecisions = {
  id: "019ea4e1-701e-7f8b-8149-0fcb3e8cd02e",
  type: "page-type/song",
  slug: "ariana-grande-bad-decisions",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "60615a1e-ae63-4ff4-90f5-6f18c1c19efe",
      externalLink: "https://musicbrainz.org/work/60615a1e-ae63-4ff4-90f5-6f18c1c19efe",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bad Decisions",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:38:18.270Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
