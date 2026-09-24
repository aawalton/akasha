import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationMyRedeemerLives = {
  id: "01a0b4c8-36b8-7fca-b01c-8fd15fca2e27",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-my-redeemer-lives",
  ownLength: 5.188666666666666,
  ownProgress: 5.188666666666666,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Redeemer Lives",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "myredeemerlives|7FQRbf8gbKw8KZQZAJWxH2|311320",
  song: "song/paul-cardall-my-redeemer-lives",
  carriedBy: [
    {
      release: "release/paul-cardall-a-new-creation",
      discNumber: 1,
      position: 10,
      externalId: "6ddEtYy8ESBFinObnYOfnZ",
      externalLink: "https://open.spotify.com/track/6ddEtYy8ESBFinObnYOfnZ",
    },
  ],
} as const satisfies Track
