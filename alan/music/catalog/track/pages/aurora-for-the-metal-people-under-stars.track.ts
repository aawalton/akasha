import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraForTheMetalPeopleUnderStars = {
  id: "01a0b638-06b8-74a8-989e-961c311e6c6f",
  type: "page-type/track",
  slug: "aurora-for-the-metal-people-under-stars",
  ownLength: 3.3171,
  ownProgress: 0,
  partOfCollections: ["release/aurora-for-the-metal-people"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6TcFwDCZvm9Lrcws3aTQ9N",
      externalLink: "https://open.spotify.com/track/6TcFwDCZvm9Lrcws3aTQ9N",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Under Stars",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "understars|1WgXqy2Dd70QQOU7Ay074N|199026",
  song: "song/aurora-under-stars",
} as const satisfies Track
