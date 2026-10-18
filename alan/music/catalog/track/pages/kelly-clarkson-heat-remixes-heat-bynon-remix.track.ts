import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonHeatRemixesHeatBynonRemix = {
  id: "01a14f45-0234-7f4d-ad93-abbcf1d72a4f",
  type: "page-type/track",
  slug: "kelly-clarkson-heat-remixes-heat-bynon-remix",
  ownLength: 3.5368166666666667,
  ownProgress: 0,
  partOfCollections: [
    "release/kelly-clarkson-heat-remixes",
    "release/kelly-clarkson-heat-bynon-remix",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Heat - BYNON Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }, { artistName: "BYNON" }],
  trackKey: "heatbynonremix|033DxVOVQqNlUy6yEI03ar,3BmGtnKgCSGYIUhmivXKWX|212209",
  song: "song/kelly-clarkson-heat",
  carriedBy: [
    {
      release: "release/kelly-clarkson-heat-bynon-remix",
      discNumber: 1,
      position: 1,
      externalId: "2hAltUnZnhdbC3oLXEjl6q",
      externalLink: "https://open.spotify.com/track/2hAltUnZnhdbC3oLXEjl6q",
    },
    {
      release: "release/kelly-clarkson-heat-remixes",
      discNumber: 1,
      position: 4,
      externalId: "4kKBmVfpUijwjl6iQplbp0",
      externalLink: "https://open.spotify.com/track/4kKBmVfpUijwjl6iQplbp0",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
