import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsHolyMother = {
  id: "01a0b4c8-2215-773c-a344-cbeb8dc6117f",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-holy-mother",
  ownLength: 3.044,
  ownProgress: 3.044,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Holy Mother",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "holymother|7FQRbf8gbKw8KZQZAJWxH2|182640",
  song: "song/paul-cardall-holy-mother",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 11,
      externalId: "6dDKGfHm1bePhGD5F2tbh3",
      externalLink: "https://open.spotify.com/track/6dDKGfHm1bePhGD5F2tbh3",
    },
  ],
} as const satisfies Track
