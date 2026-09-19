import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationMyRedeemerLives = {
  id: "01a0b4c8-36b8-7fca-b01c-8fd15fca2e27",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-my-redeemer-lives",
  ownLength: 5.188666666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ddEtYy8ESBFinObnYOfnZ",
      externalLink: "https://open.spotify.com/track/6ddEtYy8ESBFinObnYOfnZ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "My Redeemer Lives",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "myredeemerlives|7FQRbf8gbKw8KZQZAJWxH2|311320",
  song: "song/paul-cardall-my-redeemer-lives",
} as const satisfies Track
