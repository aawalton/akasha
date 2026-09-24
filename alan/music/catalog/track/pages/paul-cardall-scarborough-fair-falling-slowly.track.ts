import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallScarboroughFairFallingSlowly = {
  id: "01a0b4c8-6b7c-7336-925f-110be4982275",
  type: "page-type/track",
  slug: "paul-cardall-scarborough-fair-falling-slowly",
  ownLength: 3.1599333333333335,
  ownProgress: 3.1599333333333335,
  partOfCollections: ["release/paul-cardall-scarborough-fair"],
  status: "completed",
  unit: "unit/minutes",
  title: "Falling Slowly",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "fallingslowly|7FQRbf8gbKw8KZQZAJWxH2|189596",
  song: "song/paul-cardall-falling-slowly",
  carriedBy: [
    {
      release: "release/paul-cardall-scarborough-fair",
      discNumber: 1,
      position: 4,
      externalId: "5s0xPDadrrHGWawd2FdPjU",
      externalLink: "https://open.spotify.com/track/5s0xPDadrrHGWawd2FdPjU",
    },
  ],
} as const satisfies Track
