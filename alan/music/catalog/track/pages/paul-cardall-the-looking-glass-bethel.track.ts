import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassBethel = {
  id: "01a0b4c8-6048-78d3-bd14-57fa83a2f62b",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-bethel",
  ownLength: 3.013333333333333,
  ownProgress: 3.013333333333333,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bethel",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "bethel|7FQRbf8gbKw8KZQZAJWxH2|180800",
  song: "song/paul-cardall-bethel",
  carriedBy: [
    {
      release: "release/paul-cardall-the-looking-glass",
      discNumber: 1,
      position: 1,
      externalId: "5bEjG91Nn6KoxX8FGDUbHn",
      externalLink: "https://open.spotify.com/track/5bEjG91Nn6KoxX8FGDUbHn",
    },
  ],
} as const satisfies Track
