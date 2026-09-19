import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallReturnHomeAnEveningInParis = {
  id: "01a0b4c8-28c4-7aae-ac13-9877a5d968f8",
  type: "page-type/track",
  slug: "paul-cardall-return-home-an-evening-in-paris",
  ownLength: 5.135633333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-return-home"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Usay1Fv5Ni9D2c3kBR0Ml",
      externalLink: "https://open.spotify.com/track/6Usay1Fv5Ni9D2c3kBR0Ml",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "An Evening In Paris",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "aneveninginparis|7FQRbf8gbKw8KZQZAJWxH2|308138",
  song: "song/paul-cardall-an-evening-in-paris",
} as const satisfies Track
