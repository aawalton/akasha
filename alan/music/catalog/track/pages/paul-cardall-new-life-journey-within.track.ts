import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeJourneyWithin = {
  id: "01a0b4c8-3f44-7eb9-b864-11238bb866aa",
  type: "page-type/track",
  slug: "paul-cardall-new-life-journey-within",
  ownLength: 3.8451,
  ownProgress: 3.8451,
  partOfCollections: ["release/paul-cardall-new-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Journey Within",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "journeywithin|7FQRbf8gbKw8KZQZAJWxH2|230706",
  song: "song/paul-cardall-journey-within",
  carriedBy: [
    {
      release: "release/paul-cardall-new-life",
      discNumber: 1,
      position: 6,
      externalId: "4AUxtPG7iQogzKibwivfe8",
      externalLink: "https://open.spotify.com/track/4AUxtPG7iQogzKibwivfe8",
    },
  ],
} as const satisfies Track
