import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1CarryYouHome = {
  id: "01a0aa7c-34ab-7ee3-a87b-98d28c91661e",
  type: "page-type/track",
  slug: "zara-larsson-1-carry-you-home",
  ownLength: 4.242133333333333,
  ownProgress: 4.242133333333333,
  partOfCollections: ["release/zara-larsson-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Carry You Home",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "carryyouhome|1Xylc3o4UrD53lo9CvFvVg|254528",
  song: "song/zara-larsson-carry-you-home",
  carriedBy: [
    {
      release: "release/zara-larsson-1",
      discNumber: 1,
      position: 5,
      externalId: "1N8f3LpdR5TePmSYVSLU85",
      externalLink: "https://open.spotify.com/track/1N8f3LpdR5TePmSYVSLU85",
    },
  ],
} as const satisfies Track
