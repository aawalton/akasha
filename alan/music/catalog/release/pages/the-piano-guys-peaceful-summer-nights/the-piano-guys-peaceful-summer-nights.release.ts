import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuysPeacefulSummerNights = {
  id: "01a0afa1-c5d2-789e-8e6b-d690fb00f1ae",
  type: "page-type/release",
  slug: "the-piano-guys-peaceful-summer-nights",
  ownLength: 46.7895,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2026-07-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0SFlBBlP61sKdKEpzxSoXT",
      externalLink: "https://open.spotify.com/album/0SFlBBlP61sKdKEpzxSoXT",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Peaceful Summer Nights",
} as const satisfies Release
