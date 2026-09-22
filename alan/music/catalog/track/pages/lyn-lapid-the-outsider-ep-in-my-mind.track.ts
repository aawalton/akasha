import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidTheOutsiderEpInMyMind = {
  id: "01a0c95e-c104-7559-9566-4784eabe6891",
  type: "page-type/track",
  slug: "lyn-lapid-the-outsider-ep-in-my-mind",
  ownLength: 2.7133333333333334,
  ownProgress: 2.7133333333333334,
  partOfCollections: ["release/lyn-lapid-the-outsider-ep"],
  status: "completed",
  unit: "unit/minutes",
  title: "In My Mind",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "4pfy05cNNTacuOQ6SiSu4v", artistName: "Lyn Lapid" }],
  trackKey: "inmymind|4pfy05cNNTacuOQ6SiSu4v|162800",
  song: "song/lyn-lapid-in-my-mind",
  carriedBy: [
    {
      release: "release/lyn-lapid-the-outsider-ep",
      discNumber: 1,
      position: 7,
      externalId: "5wCKcesEqcBD8iEFAJFUdg",
      externalLink: "https://open.spotify.com/track/5wCKcesEqcBD8iEFAJFUdg",
    },
  ],
} as const satisfies Track
