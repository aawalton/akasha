import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDiamondsRemix = {
  id: "01a0ba9e-0708-7f09-8c6e-e038b152ec6b",
  type: "page-type/song",
  slug: "sia-diamonds-remix",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "836a306e-73f2-47b1-b6a1-dee05b714a7a",
      externalLink: "https://musicbrainz.org/work/836a306e-73f2-47b1-b6a1-dee05b714a7a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Diamonds (remix)",
  artist: "artist/sia",
  songType: "derivative",
  performed: false,
  written: "collab",
} as const satisfies Song
