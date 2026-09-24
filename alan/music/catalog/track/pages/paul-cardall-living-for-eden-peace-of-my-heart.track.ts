import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenPeaceOfMyHeart = {
  id: "01a0b4c8-4933-7eaa-831d-b14b718652a7",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-peace-of-my-heart",
  ownLength: 3.9604333333333335,
  ownProgress: 3.9604333333333335,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  status: "completed",
  unit: "unit/minutes",
  title: "Peace Of My Heart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "peaceofmyheart|7FQRbf8gbKw8KZQZAJWxH2|237626",
  song: "song/paul-cardall-peace-of-my-heart",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 2,
      externalId: "1lF2ZATmKEQyad1QQMnlcD",
      externalLink: "https://open.spotify.com/track/1lF2ZATmKEQyad1QQMnlcD",
    },
  ],
} as const satisfies Track
