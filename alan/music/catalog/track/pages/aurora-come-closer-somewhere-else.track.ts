import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserSomewhereElse = {
  id: "01a0b637-e7f1-790c-b90c-ce1d8cb4b8b9",
  type: "page-type/track",
  slug: "aurora-come-closer-somewhere-else",
  grade: "A+",
  ownLength: 4.18955,
  ownProgress: 4.18955,
  partOfCollections: ["release/aurora-come-closer", "release/aurora-somewhere-else"],
  status: "completed",
  unit: "unit/minutes",
  title: "SOMEWHERE ELSE",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey:
    "somewhereelse|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|251373",
  song: "song/aurora-somewhere-else",
  carriedBy: [
    {
      release: "release/aurora-come-closer",
      discNumber: 1,
      position: 7,
      externalId: "4ROFunSkVUlXqU0cMi6vYJ",
      externalLink: "https://open.spotify.com/track/4ROFunSkVUlXqU0cMi6vYJ",
    },
    {
      release: "release/aurora-somewhere-else",
      discNumber: 1,
      position: 1,
      externalId: "5AeUaZEtyRCi7t4JHkBus9",
      externalLink: "https://open.spotify.com/track/5AeUaZEtyRCi7t4JHkBus9",
    },
  ],
} as const satisfies Track
