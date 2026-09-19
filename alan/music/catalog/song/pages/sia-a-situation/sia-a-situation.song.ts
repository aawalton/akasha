import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaASituation = {
  id: "019ea4c2-a830-7f2b-9bce-90140abd8147",
  type: "page-type/song",
  slug: "sia-a-situation",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0b53a0e5-7c08-498a-887b-64fa03c97c17",
      externalLink: "https://musicbrainz.org/work/0b53a0e5-7c08-498a-887b-64fa03c97c17",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Situation",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
