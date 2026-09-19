import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheGodsWeCanTouchYouKeepMeCrawling = {
  id: "01a0b637-f476-7d6b-af81-df3994aa459d",
  type: "page-type/track",
  slug: "aurora-the-gods-we-can-touch-you-keep-me-crawling",
  ownLength: 2.98555,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-gods-we-can-touch"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "04glgY1l3EWiEOGAORgC9Z",
      externalLink: "https://open.spotify.com/track/04glgY1l3EWiEOGAORgC9Z",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "You Keep Me Crawling",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "youkeepmecrawling|1WgXqy2Dd70QQOU7Ay074N|179133",
  song: "song/aurora-you-keep-me-crawling",
} as const satisfies Track
