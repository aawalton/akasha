import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidInMyMindProducerMan = {
  id: "01a0c95e-c5a0-7cab-a105-ef908937578b",
  type: "page-type/track",
  slug: "lyn-lapid-in-my-mind-producer-man",
  ownLength: 2.3612,
  ownProgress: 0,
  partOfCollections: ["release/lyn-lapid-in-my-mind", "release/lyn-lapid-producer-man"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Producer Man",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "4pfy05cNNTacuOQ6SiSu4v", artistName: "Lyn Lapid" }],
  trackKey: "producerman|4pfy05cNNTacuOQ6SiSu4v|141672",
  song: "song/lyn-lapid-producer-man",
  carriedBy: [
    {
      release: "release/lyn-lapid-in-my-mind",
      discNumber: 1,
      position: 3,
      externalId: "77PJk1kzFc00QSc6eONEiT",
      externalLink: "https://open.spotify.com/track/77PJk1kzFc00QSc6eONEiT",
    },
    {
      release: "release/lyn-lapid-producer-man",
      discNumber: 1,
      position: 1,
      externalId: "5BArc3UpONi77FMkNT4LYU",
      externalLink: "https://open.spotify.com/track/5BArc3UpONi77FMkNT4LYU",
    },
  ],
} as const satisfies Track
