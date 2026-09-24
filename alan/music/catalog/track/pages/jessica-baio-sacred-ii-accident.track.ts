import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSacredIiAccident = {
  id: "01a0c622-1980-797f-a877-1f7275f9faf7",
  type: "page-type/track",
  slug: "jessica-baio-sacred-ii-accident",
  ownLength: 3.2835666666666667,
  ownProgress: 3.2835666666666667,
  partOfCollections: [
    "release/jessica-baio-sacred-ii",
    "release/jessica-baio-sacred",
    "release/jessica-baio-accident",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "accident",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jessica-baio" }],
  trackKey: "accident|0VMFTqmv0hYlWruyBERT95|197014",
  song: "song/jessica-baio-accident",
  carriedBy: [
    {
      release: "release/jessica-baio-accident",
      discNumber: 1,
      position: 1,
      externalId: "1fhsnAVVCVZlt90lheuA5C",
      externalLink: "https://open.spotify.com/track/1fhsnAVVCVZlt90lheuA5C",
    },
    {
      release: "release/jessica-baio-sacred",
      discNumber: 1,
      position: 4,
      externalId: "3HU3krmJidI4hudL9Gdmza",
      externalLink: "https://open.spotify.com/track/3HU3krmJidI4hudL9Gdmza",
    },
    {
      release: "release/jessica-baio-sacred-ii",
      discNumber: 2,
      position: 4,
      externalId: "7MGunAjXp4YRRIFKZ1Lt3Z",
      externalLink: "https://open.spotify.com/track/7MGunAjXp4YRRIFKZ1Lt3Z",
    },
  ],
} as const satisfies Track
