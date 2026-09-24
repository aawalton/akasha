import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionEyeToEye = {
  id: "01a0b4c8-45b2-7edd-8aa3-df2d8d0fe73b",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-eye-to-eye",
  ownLength: 4.48565,
  ownProgress: 4.48565,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "Eye to Eye",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "eyetoeye|7FQRbf8gbKw8KZQZAJWxH2|269139",
  song: "song/paul-cardall-eye-to-eye",
  carriedBy: [
    {
      release: "release/paul-cardall-chill-collection",
      discNumber: 1,
      position: 9,
      externalId: "454DD5AAy0B5RemhQybJEJ",
      externalLink: "https://open.spotify.com/track/454DD5AAy0B5RemhQybJEJ",
    },
  ],
} as const satisfies Track
