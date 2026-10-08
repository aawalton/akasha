import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeHampstead = {
  id: "019ea4e2-0d4a-76f1-a675-fa5cb7c596ca",
  type: "page-type/song",
  slug: "ariana-grande-hampstead",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7a0c5d9e-c898-41b4-a516-fc1bf716cc87",
      externalLink: "https://musicbrainz.org/work/7a0c5d9e-c898-41b4-a516-fc1bf716cc87",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hampstead",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:38:58.506Z",
  updatedAt: "2026-09-19T16:44:14.000Z",
} as const satisfies Song
