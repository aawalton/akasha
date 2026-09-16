import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusNoneOfTheseGuys = {
  id: "01a0aa7c-2afa-7045-bd76-dc0cda1d9603",
  type: "page-type/track",
  slug: "zara-larsson-venus-none-of-these-guys",
  ownLength: 2.7074333333333334,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-venus"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4YxCwmfbo4FcAeaK0vFJFV",
      externalLink: "https://open.spotify.com/track/4YxCwmfbo4FcAeaK0vFJFV",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "None Of These Guys",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "noneoftheseguys|1Xylc3o4UrD53lo9CvFvVg|162446",
} as const satisfies Track
