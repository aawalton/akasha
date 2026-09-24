import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallGraceInGriefSerenity = {
  id: "01a0b4c8-25a3-740e-927d-0d99bf20e2b2",
  type: "page-type/track",
  slug: "paul-cardall-grace-in-grief-serenity",
  ownLength: 3.4583333333333335,
  ownProgress: 3.4583333333333335,
  partOfCollections: ["release/paul-cardall-grace-in-grief"],
  status: "completed",
  unit: "unit/minutes",
  title: "Serenity",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "serenity|7FQRbf8gbKw8KZQZAJWxH2|207500",
  song: "song/paul-cardall-serenity",
  carriedBy: [
    {
      release: "release/paul-cardall-grace-in-grief",
      discNumber: 1,
      position: 5,
      externalId: "5AdKBr5FSUxqiXXdD3k0a8",
      externalLink: "https://open.spotify.com/track/5AdKBr5FSUxqiXXdD3k0a8",
    },
  ],
} as const satisfies Track
