import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallScarboroughFairStateOfMind = {
  id: "01a0b4c8-6b36-7755-8bb6-035e4b68b2be",
  type: "page-type/track",
  slug: "paul-cardall-scarborough-fair-state-of-mind",
  ownLength: 4.232266666666667,
  ownProgress: 4.232266666666667,
  partOfCollections: ["release/paul-cardall-scarborough-fair"],
  status: "completed",
  unit: "unit/minutes",
  title: "State of Mind",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "stateofmind|7FQRbf8gbKw8KZQZAJWxH2|253936",
  song: "song/paul-cardall-state-of-mind",
  carriedBy: [
    {
      release: "release/paul-cardall-scarborough-fair",
      discNumber: 1,
      position: 2,
      externalId: "5Gvm4u2PkIjUgjcVohPLGM",
      externalLink: "https://open.spotify.com/track/5Gvm4u2PkIjUgjcVohPLGM",
    },
  ],
} as const satisfies Track
