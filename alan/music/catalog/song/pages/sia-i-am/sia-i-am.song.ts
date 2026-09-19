import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaIAm = {
  id: "019ea4c7-ebbb-7b81-ab21-dc07c858e1d1",
  type: "page-type/song",
  slug: "sia-i-am",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5e293c6c-8167-3717-963c-d4e5353c0107",
      externalLink: "https://musicbrainz.org/work/5e293c6c-8167-3717-963c-d4e5353c0107",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Am",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
