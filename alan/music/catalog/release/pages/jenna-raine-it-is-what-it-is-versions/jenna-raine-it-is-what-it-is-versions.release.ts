import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineItIsWhatItIsVersions = {
  id: "01a0676a-d722-7009-8f48-59557fae0231",
  type: "page-type/release",
  slug: "jenna-raine-it-is-what-it-is-versions",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2023-07-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6GbpN46VmhzBhSktjEa9uD",
      externalLink: "https://open.spotify.com/album/6GbpN46VmhzBhSktjEa9uD",
    },
  ],
  title: "It Is What It Is (Versions)",
} as const satisfies Release
