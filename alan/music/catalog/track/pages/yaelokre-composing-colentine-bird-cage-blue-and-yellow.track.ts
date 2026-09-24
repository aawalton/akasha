import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreComposingColentineBirdCageBlueAndYellow = {
  id: "01a0ce87-15c0-76d9-8119-268109f35130",
  type: "page-type/track",
  slug: "yaelokre-composing-colentine-bird-cage-blue-and-yellow",
  ownLength: 3.2413,
  ownProgress: 3.2413,
  partOfCollections: [
    "release/yaelokre-composing-colentine",
    "release/yaelokre-origins",
    "release/yaelokre-bird-cage-blue-and-yellow",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Bird cage blue and yellow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/yaelokre" }],
  trackKey: "birdcageblueandyellow|3rRyfgGByetsaaujkjQ7rY|194478",
  song: "song/yaelokre-bird-cage-blue-and-yellow",
  carriedBy: [
    {
      release: "release/yaelokre-bird-cage-blue-and-yellow",
      discNumber: 1,
      position: 1,
      externalId: "3bD1uexflHYUnZP1OmoVIZ",
      externalLink: "https://open.spotify.com/track/3bD1uexflHYUnZP1OmoVIZ",
    },
    {
      release: "release/yaelokre-composing-colentine",
      discNumber: 1,
      position: 2,
      externalId: "2yYnElFlBhbrNlsGspLNSX",
      externalLink: "https://open.spotify.com/track/2yYnElFlBhbrNlsGspLNSX",
    },
    {
      release: "release/yaelokre-origins",
      discNumber: 1,
      position: 2,
      externalId: "0vjwBEDmbaZ2i8hYo7txXJ",
      externalLink: "https://open.spotify.com/track/0vjwBEDmbaZ2i8hYo7txXJ",
    },
  ],
} as const satisfies Track
