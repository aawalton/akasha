import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiHoldOnMeRemixes = {
  id: "01a0676a-d720-704a-bb46-466f32b49463",
  type: "page-type/release",
  slug: "emei-hold-on-me-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2023-12-29",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2j0I3fCFeUI1M4ZCu7z9Ds",
      externalLink: "https://open.spotify.com/album/2j0I3fCFeUI1M4ZCu7z9Ds",
    },
  ],
  title: "Hold On Me (Remixes)",
} as const satisfies Release
