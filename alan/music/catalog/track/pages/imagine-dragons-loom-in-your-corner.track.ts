import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsLoomInYourCorner = {
  id: "01a0c43f-b4ee-71ed-a1d7-97aa9c6f378f",
  type: "page-type/track",
  slug: "imagine-dragons-loom-in-your-corner",
  ownLength: 3.9982166666666665,
  ownProgress: 3.9982166666666665,
  partOfCollections: ["release/imagine-dragons-loom"],
  status: "completed",
  unit: "unit/minutes",
  title: "In Your Corner",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "inyourcorner|53XhwfbYqKCa1cC15pYq2q|239893",
  song: "song/imagine-dragons-in-your-corner",
  carriedBy: [
    {
      release: "release/imagine-dragons-loom",
      discNumber: 1,
      position: 5,
      externalId: "5hKE4hbAVMP38XWjRlXZPO",
      externalLink: "https://open.spotify.com/track/5hKE4hbAVMP38XWjRlXZPO",
    },
  ],
} as const satisfies Track
