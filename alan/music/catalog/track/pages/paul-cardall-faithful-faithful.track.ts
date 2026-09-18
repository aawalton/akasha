import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulFaithful = {
  id: "01a0b4c8-5954-762d-9d06-c891fa44a7ab",
  type: "page-type/track",
  slug: "paul-cardall-faithful-faithful",
  ownLength: 4.856883333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-faithful"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "29RN3dYeRN85alf5DNAbuH",
      externalLink: "https://open.spotify.com/track/29RN3dYeRN85alf5DNAbuH",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Faithful",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "faithful|7FQRbf8gbKw8KZQZAJWxH2|291413",
} as const satisfies Track
