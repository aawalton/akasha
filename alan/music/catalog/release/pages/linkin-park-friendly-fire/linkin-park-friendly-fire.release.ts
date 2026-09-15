import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkFriendlyFire = {
  id: "01a0676a-d71e-7036-8c68-a096b06963a0",
  type: "page-type/release",
  slug: "linkin-park-friendly-fire",
  title: "Friendly Fire",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 2.94835,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-02-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "601IEigQO3enlyrbn4SpNM",
      externalLink: "https://open.spotify.com/album/601IEigQO3enlyrbn4SpNM",
    },
  ],
} as const satisfies Release
