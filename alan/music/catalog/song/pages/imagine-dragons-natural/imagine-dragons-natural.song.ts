import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsNatural = {
  id: "019ea499-7269-7ff0-9804-ba4c94e83caa",
  type: "page-type/song",
  slug: "imagine-dragons-natural",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "899d1009-a88b-48a7-a86a-5734b738305b",
      externalLink: "https://musicbrainz.org/work/899d1009-a88b-48a7-a86a-5734b738305b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Natural",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
