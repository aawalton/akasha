import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsHeartsOfMothers = {
  id: "01a0b4c8-1ea9-7b54-8122-c3f809497245",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-hearts-of-mothers",
  ownLength: 3.3223,
  ownProgress: 3.3223,
  partOfCollections: ["release/paul-cardall-ancestors"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hearts of Mothers",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "heartsofmothers|7FQRbf8gbKw8KZQZAJWxH2|199338",
  song: "song/paul-cardall-hearts-of-mothers",
  carriedBy: [
    {
      release: "release/paul-cardall-ancestors",
      discNumber: 1,
      position: 4,
      externalId: "4047I6yARvsP9jhEjLcf2W",
      externalLink: "https://open.spotify.com/track/4047I6yARvsP9jhEjLcf2W",
    },
  ],
} as const satisfies Track
