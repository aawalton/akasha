import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulThankful = {
  id: "01a14f45-0243-739e-ac45-82d6a48cbc17",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-thankful",
  ownLength: 3.00355,
  ownProgress: 3.00355,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  status: "completed",
  unit: "unit/minutes",
  title: "Thankful",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "thankful|3BmGtnKgCSGYIUhmivXKWX|180213",
  song: "song/kelly-clarkson-thankful",
  carriedBy: [
    {
      release: "release/kelly-clarkson-thankful",
      discNumber: 1,
      position: 9,
      externalId: "51Fy2Y20yZjaL3ffarnW2M",
      externalLink: "https://open.spotify.com/track/51Fy2Y20yZjaL3ffarnW2M",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
