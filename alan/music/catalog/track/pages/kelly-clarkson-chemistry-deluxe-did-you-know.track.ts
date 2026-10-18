import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeDidYouKnow = {
  id: "01a14f45-022e-7f24-8273-12c33bc24f25",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-deluxe-did-you-know",
  ownLength: 3.1512166666666666,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry-deluxe"],
  status: "not-started",
  unit: "unit/minutes",
  title: "did you know",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "didyouknow|3BmGtnKgCSGYIUhmivXKWX|189073",
  song: "song/kelly-clarkson-did-you-know",
  carriedBy: [
    {
      release: "release/kelly-clarkson-chemistry-deluxe",
      discNumber: 1,
      position: 16,
      externalId: "1RoXbREMm18VRMIlhepcmv",
      externalLink: "https://open.spotify.com/track/1RoXbREMm18VRMIlhepcmv",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
