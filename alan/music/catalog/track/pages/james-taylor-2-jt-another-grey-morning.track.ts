import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtAnotherGreyMorning = {
  id: "01a0abeb-463d-75ff-ac30-a87ef4365de6",
  type: "page-type/track",
  slug: "james-taylor-2-jt-another-grey-morning",
  ownLength: 2.73785,
  ownProgress: 2.73785,
  partOfCollections: ["release/james-taylor-2-jt"],
  status: "completed",
  unit: "unit/minutes",
  title: "Another Grey Morning",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "anothergreymorning|0vn7UBvSQECKJm2817Yf1P|164271",
  song: "song/james-taylor-another-grey-morning",
  carriedBy: [
    {
      release: "release/james-taylor-2-jt",
      discNumber: 1,
      position: 4,
      externalId: "3eC5kxXAJ24pVZQkdi8r6U",
      externalLink: "https://open.spotify.com/track/3eC5kxXAJ24pVZQkdi8r6U",
    },
  ],
} as const satisfies Track
