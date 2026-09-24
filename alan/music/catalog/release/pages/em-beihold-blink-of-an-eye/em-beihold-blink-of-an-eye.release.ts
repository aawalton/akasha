import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdBlinkOfAnEye = {
  id: "01a0676a-d719-7016-bc4b-1965e8df7c00",
  type: "page-type/release",
  slug: "em-beihold-blink-of-an-eye",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2019-05-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6j83vg2XVpVBE9Ys89s3gy",
      externalLink: "https://open.spotify.com/album/6j83vg2XVpVBE9Ys89s3gy",
    },
  ],
  title: "Blink of an Eye",
} as const satisfies Release
