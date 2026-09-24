import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusNoneOfTheseGuys = {
  id: "01a0aa7c-2afa-7045-bd76-dc0cda1d9603",
  type: "page-type/track",
  slug: "zara-larsson-venus-none-of-these-guys",
  ownLength: 2.7074333333333334,
  ownProgress: 2.7074333333333334,
  partOfCollections: ["release/zara-larsson-venus"],
  status: "completed",
  unit: "unit/minutes",
  title: "None Of These Guys",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "noneoftheseguys|1Xylc3o4UrD53lo9CvFvVg|162446",
  song: "song/zara-larsson-none-of-these-guys",
  carriedBy: [
    {
      release: "release/zara-larsson-venus",
      discNumber: 1,
      position: 5,
      externalId: "4YxCwmfbo4FcAeaK0vFJFV",
      externalLink: "https://open.spotify.com/track/4YxCwmfbo4FcAeaK0vFJFV",
    },
  ],
} as const satisfies Track
