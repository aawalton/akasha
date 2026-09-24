import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsEyesClosedEyesClosed = {
  id: "01a0c43f-d949-711b-973b-7cbaab6f3764",
  type: "page-type/track",
  slug: "imagine-dragons-eyes-closed-eyes-closed",
  ownLength: 3.3335,
  ownProgress: 3.3335,
  partOfCollections: ["release/imagine-dragons-eyes-closed"],
  status: "completed",
  unit: "unit/minutes",
  title: "Eyes Closed",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "eyesclosed|53XhwfbYqKCa1cC15pYq2q|200010",
  song: "song/imagine-dragons-eyes-closed",
  carriedBy: [
    {
      release: "release/imagine-dragons-eyes-closed",
      discNumber: 1,
      position: 1,
      externalId: "4o120XeV8els1S5bu7mzBX",
      externalLink: "https://open.spotify.com/track/4o120XeV8els1S5bu7mzBX",
    },
  ],
} as const satisfies Track
