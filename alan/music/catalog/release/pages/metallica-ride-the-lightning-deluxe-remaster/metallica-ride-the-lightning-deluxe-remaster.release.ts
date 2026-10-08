import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaRideTheLightningDeluxeRemaster = {
  id: "01a0676a-d728-7004-924d-3292ed32c25e",
  type: "page-type/release",
  slug: "metallica-ride-the-lightning-deluxe-remaster",
  title: "Ride The Lightning (Deluxe Remaster)",
  partOfCollections: ["artist/metallica"],
  position: 0,
  ownLength: 350.758567,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1984-07-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2omIeSJEGQeKHPOpiXgfkr",
      externalLink: "https://open.spotify.com/album/2omIeSJEGQeKHPOpiXgfkr",
    },
  ],
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-15T16:38:20.000Z",
} as const satisfies Release
