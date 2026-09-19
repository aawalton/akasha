import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandePolkamania = {
  id: "019ea416-367c-7e03-a235-7c2ce16a350f",
  type: "page-type/song",
  slug: "ariana-grande-polkamania",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6603b8b5-12b1-4705-a445-9227a27d997f",
      externalLink: "https://musicbrainz.org/work/6603b8b5-12b1-4705-a445-9227a27d997f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Polkamania!",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
