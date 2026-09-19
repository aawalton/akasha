import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationIntoTheWilderness = {
  id: "01a0b4c8-35bc-7166-a4d8-43b1bfee60b7",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-into-the-wilderness",
  ownLength: 2.9977666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0kzXntjXY53n2repbVJzyp",
      externalLink: "https://open.spotify.com/track/0kzXntjXY53n2repbVJzyp",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Into the Wilderness",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "intothewilderness|7FQRbf8gbKw8KZQZAJWxH2|179866",
  song: "song/paul-cardall-into-the-wilderness",
} as const satisfies Track
