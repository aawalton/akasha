import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraInBoxes = {
  id: "019ea4a7-5cc3-7432-8e4f-46ec181ad690",
  type: "page-type/song",
  slug: "aurora-in-boxes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ed204146-b91a-4a05-b012-c457f2067a6d",
      externalLink: "https://musicbrainz.org/work/ed204146-b91a-4a05-b012-c457f2067a6d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In Boxes",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
