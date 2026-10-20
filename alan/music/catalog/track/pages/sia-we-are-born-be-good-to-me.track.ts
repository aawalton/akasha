import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaWeAreBornBeGoodToMe = {
  id: "01a15994-8c70-7dd3-9db9-14029358c52d",
  type: "page-type/track",
  slug: "sia-we-are-born-be-good-to-me",
  ownLength: 3.9431,
  ownProgress: 0,
  partOfCollections: ["release/sia-we-are-born"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Be Good To Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sia" }],
  trackKey: "begoodtome|5WUlDfRSoLAfcVSX1WnrxN|236586",
  song: "song/sia-be-good-to-me",
  carriedBy: [
    {
      release: "release/sia-we-are-born",
      discNumber: 1,
      position: 5,
      externalId: "1Gv7poXKlQnLjUO8KtxBFF",
      externalLink: "https://open.spotify.com/track/1Gv7poXKlQnLjUO8KtxBFF",
    },
  ],
  createdAt: "2026-10-20T13:51:09.878Z",
  updatedAt: "2026-10-20T13:51:09.878Z",
} as const satisfies Track
