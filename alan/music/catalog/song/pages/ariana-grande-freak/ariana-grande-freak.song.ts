import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeFreak = {
  id: "01a0b76f-ea3a-7b92-8255-dad0916c768a",
  type: "page-type/song",
  slug: "ariana-grande-freak",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "db34ba0a-85db-4a6a-9fbf-b8665becb2f5",
      externalLink: "https://musicbrainz.org/work/db34ba0a-85db-4a6a-9fbf-b8665becb2f5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "freak",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
