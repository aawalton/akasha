import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassTheRelease = {
  id: "01a0b4c8-606b-77d4-b50f-7b464fd28289",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-the-release",
  ownLength: 3.2477666666666667,
  ownProgress: 3.2477666666666667,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Release",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "therelease|7FQRbf8gbKw8KZQZAJWxH2|194866",
  song: "song/paul-cardall-the-release",
  carriedBy: [
    {
      release: "release/paul-cardall-the-looking-glass",
      discNumber: 1,
      position: 2,
      externalId: "12e8kHTHUbvMS3LreFvCzC",
      externalLink: "https://open.spotify.com/track/12e8kHTHUbvMS3LreFvCzC",
    },
  ],
} as const satisfies Track
