import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaLittleMan = {
  id: "019ea4c8-0daf-731a-92c9-1e3f5a37352c",
  type: "page-type/song",
  slug: "sia-little-man",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6069c651-99e0-411b-85f1-368e51567daa",
      externalLink: "https://musicbrainz.org/work/6069c651-99e0-411b-85f1-368e51567daa",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Little Man",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:10:34.671Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
