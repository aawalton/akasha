import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OctoberRoadSpecialEditionSeptemberGrass = {
  id: "01a0abeb-37c9-7984-9721-b3eeb6094f32",
  type: "page-type/track",
  slug: "james-taylor-2-october-road-special-edition-september-grass",
  ownLength: 4.832666666666666,
  ownProgress: 4.832666666666666,
  partOfCollections: ["release/james-taylor-2-october-road-special-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "September Grass",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "septembergrass|0vn7UBvSQECKJm2817Yf1P|289960",
  song: "song/james-taylor-september-grass",
  carriedBy: [
    {
      release: "release/james-taylor-2-october-road-special-edition",
      discNumber: 1,
      position: 1,
      externalId: "5oT7HmkPkGsi0SAB10D34x",
      externalLink: "https://open.spotify.com/track/5oT7HmkPkGsi0SAB10D34x",
    },
  ],
} as const satisfies Track
