import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayNightswimming = {
  id: "01a0ba5d-4d62-7e97-97e0-9f20a1c6d935",
  type: "page-type/song",
  slug: "coldplay-nightswimming",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2651c760-96af-4b08-a97a-bd2f9cfbd976",
      externalLink: "https://musicbrainz.org/work/2651c760-96af-4b08-a97a-bd2f9cfbd976",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nightswimming",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
