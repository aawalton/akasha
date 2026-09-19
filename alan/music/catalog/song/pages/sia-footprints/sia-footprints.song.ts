import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaFootprints = {
  id: "019ea4c7-0192-7183-ab6e-bb273432c307",
  type: "page-type/song",
  slug: "sia-footprints",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "23cf5d48-e097-4c48-91b7-ba7e927df11c",
      externalLink: "https://musicbrainz.org/work/23cf5d48-e097-4c48-91b7-ba7e927df11c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Footprints",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
