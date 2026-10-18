import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberDontWasteYourTime = {
  id: "01a14f45-023a-74c4-88b7-fee3f9f54164",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-dont-waste-your-time",
  ownLength: 3.588216666666667,
  ownProgress: 3.588216666666667,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  status: "completed",
  unit: "unit/minutes",
  title: "Don't Waste Your Time",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "dontwasteyourtime|3BmGtnKgCSGYIUhmivXKWX|215293",
  song: "song/kelly-clarkson-don-t-waste-your-time",
  carriedBy: [
    {
      release: "release/kelly-clarkson-my-december",
      discNumber: 1,
      position: 5,
      externalId: "33XaLfS6lcitzafRtG2sVg",
      externalLink: "https://open.spotify.com/track/33XaLfS6lcitzafRtG2sVg",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
