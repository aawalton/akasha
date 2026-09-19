import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandePastLife = {
  id: "019ea4e8-6374-742e-bdcf-02fec0474ddf",
  type: "page-type/song",
  slug: "ariana-grande-past-life",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f605e0f6-4f56-49cb-a7e6-9f501841eb7c",
      externalLink: "https://musicbrainz.org/work/f605e0f6-4f56-49cb-a7e6-9f501841eb7c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "past life",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
