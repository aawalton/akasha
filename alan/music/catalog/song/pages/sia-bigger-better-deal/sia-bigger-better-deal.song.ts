import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBiggerBetterDeal = {
  id: "019ea4c2-7940-75ce-abbd-b75da78901b9",
  type: "page-type/song",
  slug: "sia-bigger-better-deal",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "016b653c-228e-4104-800a-a07b6d932cf8",
      externalLink: "https://musicbrainz.org/work/016b653c-228e-4104-800a-a07b6d932cf8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bigger Better Deal",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
