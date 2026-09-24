import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsMercuryActs12OneDay = {
  id: "01a0c43f-c472-7a72-8756-ed2252899b34",
  type: "page-type/track",
  slug: "imagine-dragons-mercury-acts-1-2-one-day",
  ownLength: 2.522283333333333,
  ownProgress: 2.522283333333333,
  partOfCollections: ["release/imagine-dragons-mercury-acts-1-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "One Day",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "oneday|53XhwfbYqKCa1cC15pYq2q|151337",
  song: "song/imagine-dragons-one-day",
  carriedBy: [
    {
      release: "release/imagine-dragons-mercury-acts-1-2",
      discNumber: 1,
      position: 14,
      externalId: "0xBlufYjHrtf8xk0QifNn1",
      externalLink: "https://open.spotify.com/track/0xBlufYjHrtf8xk0QifNn1",
    },
  ],
} as const satisfies Track
