import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserMyBaby = {
  id: "01a0b637-e79e-7ab1-a50a-957686bb2b10",
  type: "page-type/track",
  slug: "aurora-come-closer-my-baby",
  grade: "C",
  ownLength: 4.094216666666667,
  ownProgress: 4.094216666666667,
  partOfCollections: ["release/aurora-come-closer"],
  status: "completed",
  unit: "unit/minutes",
  title: "MY BABY",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey: "mybaby|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|245653",
  song: "song/aurora-my-baby",
  carriedBy: [
    {
      release: "release/aurora-come-closer",
      discNumber: 1,
      position: 5,
      externalId: "3gWbOMDM3wfkBBdsiTMdiB",
      externalLink: "https://open.spotify.com/track/3gWbOMDM3wfkBBdsiTMdiB",
    },
  ],
} as const satisfies Track
