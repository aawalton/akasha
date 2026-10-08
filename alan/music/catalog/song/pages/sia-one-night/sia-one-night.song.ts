import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaOneNight = {
  id: "019ea4c8-46e0-7042-babb-bfa1e00edc43",
  type: "page-type/song",
  slug: "sia-one-night",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6de07a09-f3ba-4331-b11b-ece14c502634",
      externalLink: "https://musicbrainz.org/work/6de07a09-f3ba-4331-b11b-ece14c502634",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "One Night",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:10:49.312Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
