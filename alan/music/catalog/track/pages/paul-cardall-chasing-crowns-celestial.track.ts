import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsCelestial = {
  id: "01a0b4c8-22ad-75bb-a04c-0675838ef391",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-celestial",
  ownLength: 3.7,
  ownProgress: 3.7,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Celestial",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "celestial|7FQRbf8gbKw8KZQZAJWxH2|222000",
  song: "song/paul-cardall-celestial",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 15,
      externalId: "0zGg0MQN4I9jUc73eKlfrW",
      externalLink: "https://open.spotify.com/track/0zGg0MQN4I9jUc73eKlfrW",
    },
  ],
} as const satisfies Track
