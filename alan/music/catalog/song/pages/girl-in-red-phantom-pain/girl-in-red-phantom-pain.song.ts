import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedPhantomPain = {
  id: "01a0b724-d2d7-75b0-9ccc-2eddc8cf00dc",
  type: "page-type/song",
  slug: "girl-in-red-phantom-pain",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6d270b6e-6c93-47df-be39-5071e08195ca",
      externalLink: "https://musicbrainz.org/work/6d270b6e-6c93-47df-be39-5071e08195ca",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Phantom Pain",
  artist: "artist/girl-in-red",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
