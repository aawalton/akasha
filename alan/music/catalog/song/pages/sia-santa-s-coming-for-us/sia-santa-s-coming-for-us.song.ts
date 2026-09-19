import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSantaSComingForUs = {
  id: "019ea4cc-298e-7339-bfe4-d2f2d0992a68",
  type: "page-type/song",
  slug: "sia-santa-s-coming-for-us",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "478e0bce-252c-4bc7-8c97-1857c505d155",
      externalLink: "https://musicbrainz.org/work/478e0bce-252c-4bc7-8c97-1857c505d155",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Santa’s Coming for Us",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
