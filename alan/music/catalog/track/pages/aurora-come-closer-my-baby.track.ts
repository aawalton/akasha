import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserMyBaby = {
  id: "01a0b637-e79e-7ab1-a50a-957686bb2b10",
  type: "page-type/track",
  slug: "aurora-come-closer-my-baby",
  ownLength: 4.094216666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-come-closer"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3gWbOMDM3wfkBBdsiTMdiB",
      externalLink: "https://open.spotify.com/track/3gWbOMDM3wfkBBdsiTMdiB",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "MY BABY",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey: "mybaby|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|245653",
} as const satisfies Track
