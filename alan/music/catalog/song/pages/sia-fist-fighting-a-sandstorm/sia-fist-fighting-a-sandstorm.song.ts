import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaFistFightingASandstorm = {
  id: "019ea4ca-2fdc-7723-b310-ad9c58107456",
  type: "page-type/song",
  slug: "sia-fist-fighting-a-sandstorm",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ee9b80e4-65ad-486c-9917-7cdaec26b661",
      externalLink: "https://musicbrainz.org/work/ee9b80e4-65ad-486c-9917-7cdaec26b661",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fist Fighting a Sandstorm",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
