import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulJustMissedTheTrain = {
  id: "01a14f45-0243-7583-8586-0ebbe6b42cbf",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-just-missed-the-train",
  ownLength: 4.175333333333334,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Just Missed The Train",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "justmissedthetrain|3BmGtnKgCSGYIUhmivXKWX|250520",
  song: "song/kelly-clarkson-just-missed-the-train",
  carriedBy: [
    {
      release: "release/kelly-clarkson-thankful",
      discNumber: 1,
      position: 6,
      externalId: "5tHhzwooezatUFA0jZ9aC1",
      externalLink: "https://open.spotify.com/track/5tHhzwooezatUFA0jZ9aC1",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
