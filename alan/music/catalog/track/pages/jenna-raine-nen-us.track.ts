import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineNenUs = {
  id: "01a0c621-29ba-7345-a8c3-2d6391e52fc2",
  type: "page-type/track",
  slug: "jenna-raine-nen-us",
  ownLength: 3.27145,
  ownProgress: 3.27145,
  partOfCollections: ["release/jenna-raine-nen", "release/jenna-raine-us"],
  status: "completed",
  unit: "unit/minutes",
  title: "us",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "us|3aHe9rMa5HFTjXHw8tEz0A|196287",
  song: "song/jenna-raine-us",
  carriedBy: [
    {
      release: "release/jenna-raine-nen",
      discNumber: 1,
      position: 2,
      externalId: "3tIEWhT7hGcISGkX6zPIse",
      externalLink: "https://open.spotify.com/track/3tIEWhT7hGcISGkX6zPIse",
    },
    {
      release: "release/jenna-raine-us",
      discNumber: 1,
      position: 1,
      externalId: "4uNau7PgXWFfSaxwU9xsDW",
      externalLink: "https://open.spotify.com/track/4uNau7PgXWFfSaxwU9xsDW",
    },
  ],
} as const satisfies Track
