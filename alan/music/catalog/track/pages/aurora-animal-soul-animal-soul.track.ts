import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraAnimalSoulAnimalSoul = {
  id: "01a0b638-007f-7680-b9ee-493fd7f819d9",
  type: "page-type/track",
  slug: "aurora-animal-soul-animal-soul",
  ownLength: 3.0366666666666666,
  ownProgress: 3.0366666666666666,
  partOfCollections: ["release/aurora-animal-soul"],
  status: "completed",
  unit: "unit/minutes",
  title: "Animal Soul",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "animalsoul|1WgXqy2Dd70QQOU7Ay074N|182200",
  song: "song/aurora-animal-soul",
  carriedBy: [
    {
      release: "release/aurora-animal-soul",
      discNumber: 1,
      position: 1,
      externalId: "6KLkPSUno2eKn6L23liMbf",
      externalLink: "https://open.spotify.com/track/6KLkPSUno2eKn6L23liMbf",
    },
  ],
} as const satisfies Track
