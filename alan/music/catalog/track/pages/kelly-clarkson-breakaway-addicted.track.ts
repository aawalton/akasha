import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawayAddicted = {
  id: "01a14f45-022d-7b43-b7ab-2bac63c6be8f",
  type: "page-type/track",
  slug: "kelly-clarkson-breakaway-addicted",
  ownLength: 3.9566666666666666,
  ownProgress: 3.9566666666666666,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  status: "completed",
  unit: "unit/minutes",
  title: "Addicted",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "addicted|3BmGtnKgCSGYIUhmivXKWX|237400",
  song: "song/kelly-clarkson-addicted",
  carriedBy: [
    {
      release: "release/kelly-clarkson-breakaway",
      discNumber: 1,
      position: 6,
      externalId: "4qGGfl1Y4pLeerhRaI2MIq",
      externalLink: "https://open.spotify.com/track/4qGGfl1Y4pLeerhRaI2MIq",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
