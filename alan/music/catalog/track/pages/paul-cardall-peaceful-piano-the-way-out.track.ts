import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoTheWayOut = {
  id: "01a0b4c8-32c5-7a64-8e74-4c06acf9d898",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-the-way-out",
  ownLength: 4.272216666666667,
  ownProgress: 4.272216666666667,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Way Out",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thewayout|7FQRbf8gbKw8KZQZAJWxH2|256333",
  song: "song/paul-cardall-the-way-out",
  carriedBy: [
    {
      release: "release/paul-cardall-peaceful-piano",
      discNumber: 1,
      position: 12,
      externalId: "4ij3xYNImjBta3QzYtdfBa",
      externalLink: "https://open.spotify.com/track/4ij3xYNImjBta3QzYtdfBa",
    },
  ],
} as const satisfies Track
