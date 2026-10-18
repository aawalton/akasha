import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMeaningOfLifeHeat = {
  id: "01a14f45-0239-7f32-9e2e-d57700b3117a",
  type: "page-type/track",
  slug: "kelly-clarkson-meaning-of-life-heat",
  ownLength: 3.1666666666666665,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-meaning-of-life", "release/kelly-clarkson-heat"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Heat",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "heat|3BmGtnKgCSGYIUhmivXKWX|190000",
  song: "song/kelly-clarkson-heat",
  carriedBy: [
    {
      release: "release/kelly-clarkson-heat",
      discNumber: 1,
      position: 1,
      externalId: "5J4tUNYGJCYbi8VG7mbpna",
      externalLink: "https://open.spotify.com/track/5J4tUNYGJCYbi8VG7mbpna",
    },
    {
      release: "release/kelly-clarkson-meaning-of-life",
      discNumber: 1,
      position: 3,
      externalId: "1zv5ce0HHLD90EByNsgBfD",
      externalLink: "https://open.spotify.com/track/1zv5ce0HHLD90EByNsgBfD",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
