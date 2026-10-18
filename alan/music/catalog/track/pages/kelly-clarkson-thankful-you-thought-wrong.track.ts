import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulYouThoughtWrong = {
  id: "01a14f45-0243-7ff0-a721-48ae79da2f21",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-you-thought-wrong",
  ownLength: 3.832666666666667,
  ownProgress: 3.832666666666667,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  status: "completed",
  unit: "unit/minutes",
  title: "You Thought Wrong",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "youthoughtwrong|3BmGtnKgCSGYIUhmivXKWX|229960",
  song: "song/kelly-clarkson-you-thought-wrong",
  carriedBy: [
    {
      release: "release/kelly-clarkson-thankful",
      discNumber: 1,
      position: 8,
      externalId: "6rtczkcbMUTUpq0XaPUZW5",
      externalLink: "https://open.spotify.com/track/6rtczkcbMUTUpq0XaPUZW5",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
