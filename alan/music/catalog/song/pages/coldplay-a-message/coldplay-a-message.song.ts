import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayAMessage = {
  id: "01a0ba5d-443e-705a-81af-1f533bfc7a9f",
  type: "page-type/song",
  slug: "coldplay-a-message",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "afe21c77-51b0-3595-aeca-ae9d0f6a5112",
      externalLink: "https://musicbrainz.org/work/afe21c77-51b0-3595-aeca-ae9d0f6a5112",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Message",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
} as const satisfies Song
