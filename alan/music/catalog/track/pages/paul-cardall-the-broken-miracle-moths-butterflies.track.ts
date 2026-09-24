import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleMothsButterflies = {
  id: "01a0b4c8-2ed4-7917-ba0d-2eeb1258e928",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-moths-butterflies",
  ownLength: 5.056,
  ownProgress: 5.056,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  status: "completed",
  unit: "unit/minutes",
  title: "Moths & Butterflies",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "mothsbutterflies|7FQRbf8gbKw8KZQZAJWxH2|303360",
  song: "song/paul-cardall-moths-butterflies",
  carriedBy: [
    {
      release: "release/paul-cardall-the-broken-miracle",
      discNumber: 1,
      position: 2,
      externalId: "525AFUqIN1FdZz5kjv8pGA",
      externalLink: "https://open.spotify.com/track/525AFUqIN1FdZz5kjv8pGA",
    },
  ],
} as const satisfies Track
