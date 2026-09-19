import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaGetOverU = {
  id: "019ea4c8-209f-7745-ac57-fbce3ed5db75",
  type: "page-type/song",
  slug: "sia-get-over-u",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6a5dfbdd-e449-3830-bb32-5ad97e9fe777",
      externalLink: "https://musicbrainz.org/work/6a5dfbdd-e449-3830-bb32-5ad97e9fe777",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Get Over U",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
