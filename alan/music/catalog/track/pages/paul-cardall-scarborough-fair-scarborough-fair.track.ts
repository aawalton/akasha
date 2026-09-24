import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallScarboroughFairScarboroughFair = {
  id: "01a0b4c8-6b13-7c1e-b199-c61c828b1240",
  type: "page-type/track",
  slug: "paul-cardall-scarborough-fair-scarborough-fair",
  ownLength: 3.7159166666666668,
  ownProgress: 3.7159166666666668,
  partOfCollections: ["release/paul-cardall-scarborough-fair"],
  status: "completed",
  unit: "unit/minutes",
  title: "Scarborough Fair",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "scarboroughfair|7FQRbf8gbKw8KZQZAJWxH2|222955",
  song: "song/paul-cardall-scarborough-fair",
  carriedBy: [
    {
      release: "release/paul-cardall-scarborough-fair",
      discNumber: 1,
      position: 1,
      externalId: "28TQFzfZsfJ3nZQRCptvXe",
      externalLink: "https://open.spotify.com/track/28TQFzfZsfJ3nZQRCptvXe",
    },
  ],
} as const satisfies Track
