import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonHeatRemixesHeatLukeSolomonRemix = {
  id: "01a14f45-0235-7f98-ad9a-0c8877f48cde",
  type: "page-type/track",
  slug: "kelly-clarkson-heat-remixes-heat-luke-solomon-remix",
  ownLength: 3.5224,
  ownProgress: 0,
  partOfCollections: [
    "release/kelly-clarkson-heat-remixes",
    "release/kelly-clarkson-heat-luke-solomon-remix-2",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Heat - Luke Solomon Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }, { artistName: "Luke Solomon" }],
  trackKey: "heatlukesolomonremix|25CzLz5CINIKfN2r2bcl11,3BmGtnKgCSGYIUhmivXKWX|211344",
  song: "song/kelly-clarkson-heat",
  carriedBy: [
    {
      release: "release/kelly-clarkson-heat-luke-solomon-remix-2",
      discNumber: 1,
      position: 1,
      externalId: "6CcOWuyChykfG9boYsMv1x",
      externalLink: "https://open.spotify.com/track/6CcOWuyChykfG9boYsMv1x",
    },
    {
      release: "release/kelly-clarkson-heat-remixes",
      discNumber: 1,
      position: 7,
      externalId: "7s3sqbkF7tuD4WlRCOGnfl",
      externalLink: "https://open.spotify.com/track/7s3sqbkF7tuD4WlRCOGnfl",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
