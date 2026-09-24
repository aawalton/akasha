import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emBeiholdInfraredChildOfTheMoon = {
  id: "01a0d3ab-ba24-7b78-8580-5b8538a56099",
  type: "page-type/track",
  slug: "em-beihold-infrared-child-of-the-moon",
  ownLength: 2.439,
  ownProgress: 2.439,
  partOfCollections: ["release/em-beihold-infrared"],
  status: "completed",
  unit: "unit/minutes",
  title: "Child of the Moon",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/em-beihold" }],
  trackKey: "childofthemoon|7o2ZQYM7nTsaVdkXY38UAA|146340",
  song: "song/em-beihold-child-of-the-moon",
  carriedBy: [
    {
      release: "release/em-beihold-infrared",
      discNumber: 1,
      position: 2,
      externalId: "1UN1y27KKlmmgz8ILGa66h",
      externalLink: "https://open.spotify.com/track/1UN1y27KKlmmgz8ILGa66h",
    },
  ],
} as const satisfies Track
