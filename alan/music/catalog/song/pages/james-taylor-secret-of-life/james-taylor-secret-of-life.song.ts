import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSecretOfLife = {
  id: "01a0b72f-557c-7d81-8228-1a1ab9669e16",
  type: "page-type/song",
  slug: "james-taylor-secret-of-life",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ca3d9ba8-b852-4b83-adb4-6c6349a0c414",
      externalLink: "https://musicbrainz.org/work/ca3d9ba8-b852-4b83-adb4-6c6349a0c414",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Secret of Life",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  written: "solo",
} as const satisfies Song
