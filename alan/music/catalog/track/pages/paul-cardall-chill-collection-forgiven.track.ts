import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionForgiven = {
  id: "01a0b4c8-4619-7a88-9f91-ddb282172da5",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-forgiven",
  ownLength: 4.352,
  ownProgress: 4.352,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "Forgiven",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "forgiven|7FQRbf8gbKw8KZQZAJWxH2|261120",
  song: "song/paul-cardall-forgiven",
  carriedBy: [
    {
      release: "release/paul-cardall-chill-collection",
      discNumber: 1,
      position: 12,
      externalId: "3hYOPyQoHcAEfwAU20hfdL",
      externalLink: "https://open.spotify.com/track/3hYOPyQoHcAEfwAU20hfdL",
    },
  ],
} as const satisfies Track
