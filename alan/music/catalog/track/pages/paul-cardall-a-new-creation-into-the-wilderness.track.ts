import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationIntoTheWilderness = {
  id: "01a0b4c8-35bc-7166-a4d8-43b1bfee60b7",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-into-the-wilderness",
  ownLength: 2.9977666666666667,
  ownProgress: 2.9977666666666667,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  status: "completed",
  unit: "unit/minutes",
  title: "Into the Wilderness",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "intothewilderness|7FQRbf8gbKw8KZQZAJWxH2|179866",
  song: "song/paul-cardall-into-the-wilderness",
  carriedBy: [
    {
      release: "release/paul-cardall-a-new-creation",
      discNumber: 1,
      position: 3,
      externalId: "0kzXntjXY53n2repbVJzyp",
      externalLink: "https://open.spotify.com/track/0kzXntjXY53n2repbVJzyp",
    },
  ],
} as const satisfies Track
