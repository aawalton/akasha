import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OctoberRoadSpecialEditionOctoberRoad = {
  id: "01a0abeb-37e8-7071-a552-628498979f03",
  type: "page-type/track",
  slug: "james-taylor-2-october-road-special-edition-october-road",
  ownLength: 3.9444333333333335,
  ownProgress: 3.9444333333333335,
  partOfCollections: ["release/james-taylor-2-october-road-special-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "October Road",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "octoberroad|0vn7UBvSQECKJm2817Yf1P|236666",
  song: "song/james-taylor-october-road",
  carriedBy: [
    {
      release: "release/james-taylor-2-october-road-special-edition",
      discNumber: 1,
      position: 2,
      externalId: "0nILp5SpecXFvJQotZe48y",
      externalLink: "https://open.spotify.com/track/0nILp5SpecXFvJQotZe48y",
    },
  ],
} as const satisfies Track
