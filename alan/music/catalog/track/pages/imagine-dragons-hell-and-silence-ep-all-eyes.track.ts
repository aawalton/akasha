import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsHellAndSilenceEpAllEyes = {
  id: "01a0c43f-e5c4-764d-97e2-7c59e4029fa0",
  type: "page-type/track",
  slug: "imagine-dragons-hell-and-silence-ep-all-eyes",
  ownLength: 2.986666666666667,
  ownProgress: 2.986666666666667,
  partOfCollections: ["release/imagine-dragons-hell-and-silence-ep"],
  status: "completed",
  unit: "unit/minutes",
  title: "All Eyes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "alleyes|53XhwfbYqKCa1cC15pYq2q|179200",
  song: "song/imagine-dragons-all-eyes",
  carriedBy: [
    {
      release: "release/imagine-dragons-hell-and-silence-ep",
      discNumber: 1,
      position: 1,
      externalId: "4haoEl9aPJiA0QzkpBmUAT",
      externalLink: "https://open.spotify.com/track/4haoEl9aPJiA0QzkpBmUAT",
    },
  ],
} as const satisfies Track
