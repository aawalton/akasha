import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaOnlySee = {
  id: "019ea4c7-f9bf-7f0e-b420-861bf715a572",
  type: "page-type/song",
  slug: "sia-only-see",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5eba80c6-fabd-4452-9967-a99f9ac6550e",
      externalLink: "https://musicbrainz.org/work/5eba80c6-fabd-4452-9967-a99f9ac6550e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Only See",
  artist: "artist/sia",
  performed: true,
  written: "collab",
} as const satisfies Song
