import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationOneByOne = {
  id: "01a0b4c8-3694-7f69-878a-7abcd267c783",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-one-by-one",
  ownLength: 6.267333333333333,
  ownProgress: 6.267333333333333,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  status: "completed",
  unit: "unit/minutes",
  title: "One by One",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "onebyone|7FQRbf8gbKw8KZQZAJWxH2|376040",
  song: "song/paul-cardall-one-by-one",
  carriedBy: [
    {
      release: "release/paul-cardall-a-new-creation",
      discNumber: 1,
      position: 9,
      externalId: "6OHDaQfpRUWTjY5jOe7Yth",
      externalLink: "https://open.spotify.com/track/6OHDaQfpRUWTjY5jOe7Yth",
    },
  ],
} as const satisfies Track
