import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasHymnsWeThreeKings = {
  id: "01a0b4c8-5480-76c7-b311-d2121df9672d",
  type: "page-type/track",
  slug: "paul-cardall-christmas-hymns-we-three-kings",
  ownLength: 5.372,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas-hymns"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4j7ifaHv7N34zbP3Gxo5mn",
      externalLink: "https://open.spotify.com/track/4j7ifaHv7N34zbP3Gxo5mn",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "We Three Kings",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "wethreekings|7FQRbf8gbKw8KZQZAJWxH2|322320",
} as const satisfies Track
