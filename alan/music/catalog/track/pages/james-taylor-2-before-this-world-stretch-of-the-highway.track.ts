import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2BeforeThisWorldStretchOfTheHighway = {
  id: "01a0abeb-3041-70df-8dba-20f264c50baa",
  type: "page-type/track",
  slug: "james-taylor-2-before-this-world-stretch-of-the-highway",
  ownLength: 5.5371,
  ownProgress: 5.5371,
  partOfCollections: ["release/james-taylor-2-before-this-world"],
  status: "completed",
  unit: "unit/minutes",
  title: "Stretch Of The Highway",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "stretchofthehighway|0vn7UBvSQECKJm2817Yf1P|332226",
  song: "song/james-taylor-stretch-of-the-highway",
  carriedBy: [
    {
      release: "release/james-taylor-2-before-this-world",
      discNumber: 1,
      position: 4,
      externalId: "08KqE9veXI1H9kQgVVEXDx",
      externalLink: "https://open.spotify.com/track/08KqE9veXI1H9kQgVVEXDx",
    },
  ],
} as const satisfies Track
