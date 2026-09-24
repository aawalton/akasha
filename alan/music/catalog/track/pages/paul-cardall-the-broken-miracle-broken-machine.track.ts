import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleBrokenMachine = {
  id: "01a0b4c8-30ce-7dde-bba9-745fda2c193e",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-broken-machine",
  ownLength: 2.8788833333333335,
  ownProgress: 2.8788833333333335,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  status: "completed",
  unit: "unit/minutes",
  title: "Broken Machine",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }, { artistName: "Rachael Yamagata" }],
  trackKey: "brokenmachine|7FQRbf8gbKw8KZQZAJWxH2,7w0qj2HiAPIeUcoPogvOZ6|172733",
  song: "song/paul-cardall-broken-machine",
  carriedBy: [
    {
      release: "release/paul-cardall-the-broken-miracle",
      discNumber: 1,
      position: 16,
      externalId: "5zFq9mRfPWE0OREZJ5vKPd",
      externalLink: "https://open.spotify.com/track/5zFq9mRfPWE0OREZJ5vKPd",
    },
  ],
} as const satisfies Track
