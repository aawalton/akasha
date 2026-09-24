import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraSofiaSofia = {
  id: "01a0b638-0501-7e86-848b-214b0a17913a",
  type: "page-type/track",
  slug: "aurora-sofia-sofia",
  ownLength: 7.288616666666667,
  ownProgress: 7.288616666666667,
  partOfCollections: ["release/aurora-sofia"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sofia",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "Askjell" },
    { artistName: "Iris Caltwait" },
    { artist: "artist/aurora" },
  ],
  trackKey: "sofia|1WgXqy2Dd70QQOU7Ay074N,3NABmtfO8G8s96WFGhbR7F,5jOiYJPp5e84cnK2KO1aNz|437317",
  song: "song/aurora-sofia",
  carriedBy: [
    {
      release: "release/aurora-sofia",
      discNumber: 1,
      position: 1,
      externalId: "6ZKgNecNAfYBhkti1IxwSw",
      externalLink: "https://open.spotify.com/track/6ZKgNecNAfYBhkti1IxwSw",
    },
  ],
} as const satisfies Track
