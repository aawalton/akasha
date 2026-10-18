import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonHeatRemixesHeatKokiriRemix = {
  id: "01a14f45-0234-70f8-b1bf-3c6f13ab0a52",
  type: "page-type/track",
  slug: "kelly-clarkson-heat-remixes-heat-kokiri-remix",
  ownLength: 3.131466666666667,
  ownProgress: 0,
  partOfCollections: [
    "release/kelly-clarkson-heat-remixes",
    "release/kelly-clarkson-heat-kokiri-remix",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Heat - Kokiri Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }, { artistName: "Kokiri" }],
  trackKey: "heatkokiriremix|1owCC0eLSdPUND3qAAFEmv,3BmGtnKgCSGYIUhmivXKWX|187888",
  song: "song/kelly-clarkson-heat",
  carriedBy: [
    {
      release: "release/kelly-clarkson-heat-kokiri-remix",
      discNumber: 1,
      position: 1,
      externalId: "4NvhdHAOMkcsQajCweWI8C",
      externalLink: "https://open.spotify.com/track/4NvhdHAOMkcsQajCweWI8C",
    },
    {
      release: "release/kelly-clarkson-heat-remixes",
      discNumber: 1,
      position: 3,
      externalId: "1q0lVTftpOtl6VEQv0PjyX",
      externalLink: "https://open.spotify.com/track/1q0lVTftpOtl6VEQv0PjyX",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
