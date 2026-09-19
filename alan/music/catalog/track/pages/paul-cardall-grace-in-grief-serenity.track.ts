import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallGraceInGriefSerenity = {
  id: "01a0b4c8-25a3-740e-927d-0d99bf20e2b2",
  type: "page-type/track",
  slug: "paul-cardall-grace-in-grief-serenity",
  ownLength: 3.4583333333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-grace-in-grief"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5AdKBr5FSUxqiXXdD3k0a8",
      externalLink: "https://open.spotify.com/track/5AdKBr5FSUxqiXXdD3k0a8",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Serenity",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "serenity|7FQRbf8gbKw8KZQZAJWxH2|207500",
  song: "song/paul-cardall-serenity",
} as const satisfies Track
