import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OctoberRoadSpecialEditionMyTravelingStar = {
  id: "01a0abeb-3895-7abb-80ce-d85755fa618f",
  type: "page-type/track",
  slug: "james-taylor-2-october-road-special-edition-my-traveling-star",
  ownLength: 3.8866666666666667,
  ownProgress: 3.8866666666666667,
  partOfCollections: ["release/james-taylor-2-october-road-special-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Traveling Star",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "mytravelingstar|0vn7UBvSQECKJm2817Yf1P|233200",
  song: "song/james-taylor-my-traveling-star",
  carriedBy: [
    {
      release: "release/james-taylor-2-october-road-special-edition",
      discNumber: 1,
      position: 7,
      externalId: "4WFC5oosVJnVD0hgfx4cM9",
      externalLink: "https://open.spotify.com/track/4WFC5oosVJnVD0hgfx4cM9",
    },
  ],
} as const satisfies Track
