import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulSacredNature = {
  id: "01a0b4c8-59e6-70a7-af84-8fbc0e399715",
  type: "page-type/track",
  slug: "paul-cardall-faithful-sacred-nature",
  ownLength: 3.346216666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-faithful"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0zq4jJ83wSHJTE7bQEqEtm",
      externalLink: "https://open.spotify.com/track/0zq4jJ83wSHJTE7bQEqEtm",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Sacred Nature",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "sacrednature|7FQRbf8gbKw8KZQZAJWxH2|200773",
  song: "song/paul-cardall-sacred-nature",
} as const satisfies Track
