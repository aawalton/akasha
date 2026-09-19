import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleBrokenMachine = {
  id: "01a0b4c8-30ce-7dde-bba9-745fda2c193e",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-broken-machine",
  ownLength: 2.8788833333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5zFq9mRfPWE0OREZJ5vKPd",
      externalLink: "https://open.spotify.com/track/5zFq9mRfPWE0OREZJ5vKPd",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Broken Machine",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" },
    { externalId: "7w0qj2HiAPIeUcoPogvOZ6", artistName: "Rachael Yamagata" },
  ],
  trackKey: "brokenmachine|7FQRbf8gbKw8KZQZAJWxH2,7w0qj2HiAPIeUcoPogvOZ6|172733",
  song: "song/paul-cardall-broken-machine",
} as const satisfies Track
