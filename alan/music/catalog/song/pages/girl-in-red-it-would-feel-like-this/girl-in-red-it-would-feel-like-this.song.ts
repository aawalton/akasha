import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedItWouldFeelLikeThis = {
  id: "01a0b724-d30a-7f38-b29e-2c82928916bd",
  type: "page-type/song",
  slug: "girl-in-red-it-would-feel-like-this",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7515ba4b-55d3-4aeb-a6c4-07ffe9287650",
      externalLink: "https://musicbrainz.org/work/7515ba4b-55d3-4aeb-a6c4-07ffe9287650",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "it would feel like this",
  artist: "artist/girl-in-red",
  performed: true,
  written: "solo",
} as const satisfies Song
