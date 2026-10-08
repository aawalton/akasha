import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSacredIiSacred = {
  id: "01a0c622-1306-7586-87b0-678bb02ea669",
  type: "page-type/track",
  slug: "jessica-baio-sacred-ii-sacred",
  ownLength: 2.7191666666666667,
  ownProgress: 2.7191666666666667,
  partOfCollections: ["release/jessica-baio-sacred-ii", "release/jessica-baio-sacred"],
  status: "completed",
  unit: "unit/minutes",
  title: "sacred",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jessica-baio" }],
  trackKey: "sacred|0VMFTqmv0hYlWruyBERT95|163150",
  song: "song/jessica-baio-sacred",
  carriedBy: [
    {
      release: "release/jessica-baio-sacred",
      discNumber: 1,
      position: 5,
      externalId: "1ZoA7sZbEldHktjfodfgLJ",
      externalLink: "https://open.spotify.com/track/1ZoA7sZbEldHktjfodfgLJ",
    },
    {
      release: "release/jessica-baio-sacred-ii",
      discNumber: 2,
      position: 5,
      externalId: "5KzX2IOdckBZhT6my7qY2v",
      externalLink: "https://open.spotify.com/track/5KzX2IOdckBZhT6my7qY2v",
    },
  ],
  createdAt: "2026-09-21T22:41:56.998Z",
  updatedAt: "2026-09-24T20:00:07.000Z",
} as const satisfies Track
