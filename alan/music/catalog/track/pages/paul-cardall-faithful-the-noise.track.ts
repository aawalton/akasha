import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulTheNoise = {
  id: "01a0b4c8-599f-7d4e-95bd-cb84109adf6f",
  type: "page-type/track",
  slug: "paul-cardall-faithful-the-noise",
  ownLength: 5.370666666666667,
  ownProgress: 5.370666666666667,
  partOfCollections: ["release/paul-cardall-faithful"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Noise",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thenoise|7FQRbf8gbKw8KZQZAJWxH2|322240",
  song: "song/paul-cardall-the-noise",
  carriedBy: [
    {
      release: "release/paul-cardall-faithful",
      discNumber: 1,
      position: 3,
      externalId: "30eZMtwcCRfXfOoDuRqEts",
      externalLink: "https://open.spotify.com/track/30eZMtwcCRfXfOoDuRqEts",
    },
  ],
} as const satisfies Track
