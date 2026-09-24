import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsFlow = {
  id: "01a0b4c8-2320-71ab-a6e2-bc8b98d43b02",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-flow",
  ownLength: 3.6375,
  ownProgress: 3.6375,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Flow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "flow|7FQRbf8gbKw8KZQZAJWxH2|218250",
  song: "song/paul-cardall-flow",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 18,
      externalId: "2HryorqIVWiNZQvEDXBIXh",
      externalLink: "https://open.spotify.com/track/2HryorqIVWiNZQvEDXBIXh",
    },
  ],
} as const satisfies Track
