import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaOneMoreShot = {
  id: "019ea4c7-7079-754d-9abc-7f3515b21506",
  type: "page-type/song",
  slug: "sia-one-more-shot",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3c5146fb-307d-4877-958a-d15ee9f56270",
      externalLink: "https://musicbrainz.org/work/3c5146fb-307d-4877-958a-d15ee9f56270",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "One More Shot",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
