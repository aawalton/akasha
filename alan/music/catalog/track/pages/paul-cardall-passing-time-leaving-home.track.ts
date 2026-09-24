import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPassingTimeLeavingHome = {
  id: "01a0b4c8-6c39-7285-837f-64874a6a3ba2",
  type: "page-type/track",
  slug: "paul-cardall-passing-time-leaving-home",
  ownLength: 2.1899166666666665,
  ownProgress: 2.1899166666666665,
  partOfCollections: ["release/paul-cardall-passing-time"],
  status: "completed",
  unit: "unit/minutes",
  title: "Leaving Home",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "leavinghome|7FQRbf8gbKw8KZQZAJWxH2|131395",
  song: "song/paul-cardall-leaving-home",
  carriedBy: [
    {
      release: "release/paul-cardall-passing-time",
      discNumber: 1,
      position: 4,
      externalId: "1ICi7X5G3e1DM0F3woWhp1",
      externalLink: "https://open.spotify.com/track/1ICi7X5G3e1DM0F3woWhp1",
    },
  ],
} as const satisfies Track
