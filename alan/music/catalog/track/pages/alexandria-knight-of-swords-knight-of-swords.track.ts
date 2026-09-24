import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexandriaKnightOfSwordsKnightOfSwords = {
  id: "01a0aa7a-8382-754c-87f0-90c0375c6314",
  type: "page-type/track",
  slug: "alexandria-knight-of-swords-knight-of-swords",
  ownLength: 2.652616666666667,
  ownProgress: 2.652616666666667,
  partOfCollections: ["release/alexandria-knight-of-swords"],
  status: "completed",
  unit: "unit/minutes",
  title: "Knight of Swords",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/alexandria" }],
  trackKey: "knightofswords|0SQG4wPVUlfbmbGQfqB47y|159157",
  song: "song/alexandria-knight-of-swords",
  carriedBy: [
    {
      release: "release/alexandria-knight-of-swords",
      discNumber: 1,
      position: 1,
      externalId: "4zb9HntzQrJZzljjGSLCM2",
      externalLink: "https://open.spotify.com/track/4zb9HntzQrJZzljjGSLCM2",
    },
  ],
} as const satisfies Track
