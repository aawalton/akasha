import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusAmmunition = {
  id: "01a0aa7c-2ad3-7038-9545-7417252acafe",
  type: "page-type/track",
  slug: "zara-larsson-venus-ammunition",
  ownLength: 3.70815,
  ownProgress: 3.70815,
  partOfCollections: ["release/zara-larsson-venus"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ammunition",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "ammunition|1Xylc3o4UrD53lo9CvFvVg|222489",
  song: "song/zara-larsson-ammunition",
  carriedBy: [
    {
      release: "release/zara-larsson-venus",
      discNumber: 1,
      position: 4,
      externalId: "16gu3zjAEer6t6c8qxaltf",
      externalLink: "https://open.spotify.com/track/16gu3zjAEer6t6c8qxaltf",
    },
  ],
} as const satisfies Track
