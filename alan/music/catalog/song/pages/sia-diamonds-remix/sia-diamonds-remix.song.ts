import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDiamondsRemix = {
  id: "019ea4c4-8be8-7a61-84af-0fd4d421ab27",
  type: "song",
  slug: "sia-diamonds-remix",
  title: "Diamonds (remix)",
  artist: "artist/sia",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "836a306e-73f2-47b1-b6a1-dee05b714a7a",
      externalLink: "https://musicbrainz.org/work/836a306e-73f2-47b1-b6a1-dee05b714a7a",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: false,
  written: "collab",
} as const satisfies Song
