import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationTheFall = {
  id: "01a0b4c8-3595-7b85-bc71-dd020b97451b",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-the-fall",
  ownLength: 5.374666666666666,
  ownProgress: 5.374666666666666,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Fall",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thefall|7FQRbf8gbKw8KZQZAJWxH2|322480",
  song: "song/paul-cardall-the-fall",
  carriedBy: [
    {
      release: "release/paul-cardall-a-new-creation",
      discNumber: 1,
      position: 2,
      externalId: "55aQ3WzLa2LEGbv8k3whgD",
      externalLink: "https://open.spotify.com/track/55aQ3WzLa2LEGbv8k3whgD",
    },
  ],
} as const satisfies Track
