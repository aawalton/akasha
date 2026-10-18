import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawayBecauseOfYou = {
  id: "01a14f45-022d-7415-8872-7daf9e912983",
  type: "page-type/track",
  slug: "kelly-clarkson-breakaway-because-of-you",
  ownLength: 3.6582166666666667,
  ownProgress: 3.6582166666666667,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  status: "completed",
  unit: "unit/minutes",
  title: "Because of You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "becauseofyou|3BmGtnKgCSGYIUhmivXKWX|219493",
  song: "song/kelly-clarkson-because-of-you",
  carriedBy: [
    {
      release: "release/kelly-clarkson-breakaway",
      discNumber: 1,
      position: 4,
      externalId: "3f3omU8n47Mqyab5nCaGyT",
      externalLink: "https://open.spotify.com/track/3f3omU8n47Mqyab5nCaGyT",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
