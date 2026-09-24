import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsMercuryActs12Symphony = {
  id: "01a0c43f-c4cb-700e-8f51-97017ba800e3",
  type: "page-type/track",
  slug: "imagine-dragons-mercury-acts-1-2-symphony",
  ownLength: 2.93055,
  ownProgress: 2.93055,
  partOfCollections: ["release/imagine-dragons-mercury-acts-1-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Symphony",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "symphony|53XhwfbYqKCa1cC15pYq2q|175833",
  song: "song/imagine-dragons-symphony",
  carriedBy: [
    {
      release: "release/imagine-dragons-mercury-acts-1-2",
      discNumber: 2,
      position: 2,
      externalId: "2ThaHV10xrAcL2WfqXyLnp",
      externalLink: "https://open.spotify.com/track/2ThaHV10xrAcL2WfqXyLnp",
    },
  ],
} as const satisfies Track
