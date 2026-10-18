import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeMyMistake = {
  id: "01a14f45-0230-79be-bb64-546321f0b2f0",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-deluxe-my-mistake",
  ownLength: 3.27705,
  ownProgress: 3.27705,
  partOfCollections: [
    "release/kelly-clarkson-chemistry-deluxe",
    "release/kelly-clarkson-chemistry",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "my mistake",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "mymistake|3BmGtnKgCSGYIUhmivXKWX|196623",
  song: "song/kelly-clarkson-my-mistake",
  carriedBy: [
    {
      release: "release/kelly-clarkson-chemistry",
      discNumber: 1,
      position: 11,
      externalId: "6j7QoUcmUwe1FFEoTiwjjd",
      externalLink: "https://open.spotify.com/track/6j7QoUcmUwe1FFEoTiwjjd",
    },
    {
      release: "release/kelly-clarkson-chemistry-deluxe",
      discNumber: 1,
      position: 11,
      externalId: "5FafgdK8RntiA7xu2ZsuZZ",
      externalLink: "https://open.spotify.com/track/5FafgdK8RntiA7xu2ZsuZZ",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
