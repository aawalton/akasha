import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsFirstBreath = {
  id: "01a0b4c8-21ee-73e9-a6da-9fc35930b5db",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-first-breath",
  ownLength: 3.9583333333333335,
  ownProgress: 3.9583333333333335,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "First Breath",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "firstbreath|7FQRbf8gbKw8KZQZAJWxH2|237500",
  song: "song/paul-cardall-first-breath",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 10,
      externalId: "03he3cZdJIwDxSYZh4VewB",
      externalLink: "https://open.spotify.com/track/03he3cZdJIwDxSYZh4VewB",
    },
  ],
} as const satisfies Track
