import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaHoHoHo = {
  id: "019ea4c7-10f9-7aa6-8fa8-7d3be094cc7c",
  type: "page-type/song",
  slug: "sia-ho-ho-ho",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "27681051-46b7-4e5f-abe7-0870077b45da",
      externalLink: "https://musicbrainz.org/work/27681051-46b7-4e5f-abe7-0870077b45da",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ho Ho Ho",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
