import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaAcademia = {
  id: "019ea4c3-c8e1-7476-9c47-59c136286248",
  type: "page-type/song",
  slug: "sia-academia",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "513b7082-51f6-49b3-959d-60eaeb8cffdc",
      externalLink: "https://musicbrainz.org/work/513b7082-51f6-49b3-959d-60eaeb8cffdc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Academia",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
