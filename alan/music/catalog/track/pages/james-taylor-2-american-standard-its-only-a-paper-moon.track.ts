import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardItsOnlyAPaperMoon = {
  id: "01a0abeb-2f9b-7045-8456-794e277a871d",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-its-only-a-paper-moon",
  ownLength: 3.1982166666666667,
  ownProgress: 3.1982166666666667,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  status: "completed",
  unit: "unit/minutes",
  title: "It's Only A Paper Moon",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "itsonlyapapermoon|0vn7UBvSQECKJm2817Yf1P|191893",
  song: "song/james-taylor-its-only-a-paper-moon",
  carriedBy: [
    {
      release: "release/james-taylor-2-american-standard",
      discNumber: 1,
      position: 13,
      externalId: "5hDZjGuwlmGEgbPf0yjj4z",
      externalLink: "https://open.spotify.com/track/5hDZjGuwlmGEgbPf0yjj4z",
    },
  ],
} as const satisfies Track
