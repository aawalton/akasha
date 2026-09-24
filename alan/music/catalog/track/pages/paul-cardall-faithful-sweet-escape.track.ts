import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulSweetEscape = {
  id: "01a0b4c8-597e-730e-9ba7-405f28ce9ea2",
  type: "page-type/track",
  slug: "paul-cardall-faithful-sweet-escape",
  ownLength: 3.121766666666667,
  ownProgress: 3.121766666666667,
  partOfCollections: ["release/paul-cardall-faithful", "release/paul-cardall-saving-tiny-hearts"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sweet Escape",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "sweetescape|7FQRbf8gbKw8KZQZAJWxH2|187306",
  song: "song/paul-cardall-sweet-escape",
  carriedBy: [
    {
      release: "release/paul-cardall-faithful",
      discNumber: 1,
      position: 2,
      externalId: "4w9h6vXTaREnUcmEL9yaZA",
      externalLink: "https://open.spotify.com/track/4w9h6vXTaREnUcmEL9yaZA",
    },
    {
      release: "release/paul-cardall-saving-tiny-hearts",
      discNumber: 1,
      position: 13,
      externalId: "60jdNWc0ggiZkHq14OErIf",
      externalLink: "https://open.spotify.com/track/60jdNWc0ggiZkHq14OErIf",
    },
  ],
} as const satisfies Track
