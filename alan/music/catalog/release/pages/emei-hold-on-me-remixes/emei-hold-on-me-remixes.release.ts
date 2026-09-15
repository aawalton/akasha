import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiHoldOnMeRemixes = {
  id: "01a0676a-d720-704a-bb46-466f32b49463",
  type: "release",
  slug: "emei-hold-on-me-remixes",
  title: "Hold On Me (Remixes)",
  partOfCollections: ["artist/emei"],
  position: 0,
  ownLength: 4.745183,
  ownProgress: 4.745183,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2023-12-29",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2j0I3fCFeUI1M4ZCu7z9Ds",
      externalLink: "https://open.spotify.com/album/2j0I3fCFeUI1M4ZCu7z9Ds",
    },
  ],
} as const satisfies Release
