import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonHonorTheLightSilentNight = {
  id: "01a0aa7c-38e5-7b2b-8b2b-effbd88b89f5",
  type: "page-type/track",
  slug: "zara-larsson-honor-the-light-silent-night",
  ownLength: 1.7011,
  ownProgress: 1.7011,
  partOfCollections: ["release/zara-larsson-honor-the-light"],
  status: "completed",
  unit: "unit/minutes",
  title: "Silent Night",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "silentnight|1Xylc3o4UrD53lo9CvFvVg|102066",
  song: "song/celtic-woman-silent-night",
  carriedBy: [
    {
      release: "release/zara-larsson-honor-the-light",
      discNumber: 1,
      position: 3,
      externalId: "4TwKTu6EOJFvAlDAzQRWrd",
      externalLink: "https://open.spotify.com/track/4TwKTu6EOJFvAlDAzQRWrd",
    },
  ],
} as const satisfies Track
