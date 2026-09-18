import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleWeCouldBeKind = {
  id: "01a0b4c8-3118-7c17-bd71-f11240ec523e",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-we-could-be-kind",
  ownLength: 3.2091,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  position: 18,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6m5zkdFC91eeX8lcXZt1vn",
      externalLink: "https://open.spotify.com/track/6m5zkdFC91eeX8lcXZt1vn",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "We Could Be Kind",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" },
    { externalId: "3nNqVtVWWbakB2px2HphUw", artistName: "Akelee" },
    { externalId: "1PdisgvacJ6lqkRwiCasuU", artistName: "J Daniel" },
  ],
  trackKey:
    "wecouldbekind|1PdisgvacJ6lqkRwiCasuU,3nNqVtVWWbakB2px2HphUw,7FQRbf8gbKw8KZQZAJWxH2|192546",
} as const satisfies Track
