import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SoloCarolinaRua = {
  id: "01a0abea-6a63-764d-91c9-fe7032360c3a",
  type: "page-type/track",
  slug: "celtic-woman-2-solo-carolina-rua",
  ownLength: 2.834766666666667,
  ownProgress: 2.834766666666667,
  partOfCollections: ["release/celtic-woman-2-solo"],
  status: "completed",
  unit: "unit/minutes",
  title: "Carolina Rua",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Lynn Hillary" }],
  trackKey: "carolinarua|77xijq3ky5eW45DosksSNb|170086",
  song: "song/celtic-woman-carolina-rua",
  carriedBy: [
    {
      release: "release/celtic-woman-2-solo",
      discNumber: 1,
      position: 3,
      externalId: "5P7JsyPiiD6c3zP4YqvoDn",
      externalLink: "https://open.spotify.com/track/5P7JsyPiiD6c3zP4YqvoDn",
    },
  ],
} as const satisfies Track
