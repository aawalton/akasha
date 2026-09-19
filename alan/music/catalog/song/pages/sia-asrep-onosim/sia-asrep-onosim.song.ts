import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaAsrepOnosim = {
  id: "019ea4c4-8447-7538-9dd8-67321e80f85e",
  type: "page-type/song",
  slug: "sia-asrep-onosim",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "80e1d06d-8cd7-44fd-b47a-8a74fc8ec58a",
      externalLink: "https://musicbrainz.org/work/80e1d06d-8cd7-44fd-b47a-8a74fc8ec58a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Asrep onosim",
  artist: "artist/sia",
  performed: true,
  written: "collab",
} as const satisfies Song
