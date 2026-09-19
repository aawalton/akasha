import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaHoldOn = {
  id: "019ea4ca-4de1-74a3-a3c2-dc71f599618f",
  type: "page-type/song",
  slug: "sia-hold-on",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f6f7accf-4460-4247-b0ee-f4aaa6deef1f",
      externalLink: "https://musicbrainz.org/work/f6f7accf-4460-4247-b0ee-f4aaa6deef1f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hold On",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
