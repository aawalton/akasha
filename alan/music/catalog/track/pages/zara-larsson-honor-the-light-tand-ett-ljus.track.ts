import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonHonorTheLightTandEttLjus = {
  id: "01a0aa7c-3926-724d-b5c0-867865364f38",
  type: "page-type/track",
  slug: "zara-larsson-honor-the-light-tand-ett-ljus",
  ownLength: 3.1744333333333334,
  ownProgress: 3.1744333333333334,
  partOfCollections: ["release/zara-larsson-honor-the-light"],
  status: "completed",
  unit: "unit/minutes",
  title: "Tänd Ett Ljus",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "tandettljus|1Xylc3o4UrD53lo9CvFvVg|190466",
  song: "song/zara-larsson-tand-ett-ljus",
  carriedBy: [
    {
      release: "release/zara-larsson-honor-the-light",
      discNumber: 1,
      position: 5,
      externalId: "1kdYhWxuJXPFKJgxrk1Q7v",
      externalLink: "https://open.spotify.com/track/1kdYhWxuJXPFKJgxrk1Q7v",
    },
  ],
} as const satisfies Track
