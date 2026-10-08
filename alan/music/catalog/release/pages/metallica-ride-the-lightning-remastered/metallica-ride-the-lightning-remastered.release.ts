import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaRideTheLightningRemastered = {
  id: "01a0676a-d728-7005-a7ab-3853a6a2a909",
  type: "page-type/release",
  slug: "metallica-ride-the-lightning-remastered",
  title: "Ride The Lightning (Remastered)",
  partOfCollections: ["artist/metallica"],
  position: 0,
  ownLength: 47.430367,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1984-07-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1nTvIQEXvygqSIqc2vuwAz",
      externalLink: "https://open.spotify.com/album/1nTvIQEXvygqSIqc2vuwAz",
    },
  ],
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-15T16:38:20.000Z",
} as const satisfies Release
