import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsLoomDontForgetMe = {
  id: "01a0c43f-b540-729d-89a4-1142c5d7e48a",
  type: "page-type/track",
  slug: "imagine-dragons-loom-dont-forget-me",
  ownLength: 2.974666666666667,
  ownProgress: 2.974666666666667,
  partOfCollections: ["release/imagine-dragons-loom"],
  status: "completed",
  unit: "unit/minutes",
  title: "Don’t Forget Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "dontforgetme|53XhwfbYqKCa1cC15pYq2q|178480",
  song: "song/imagine-dragons-don-t-forget-me",
  carriedBy: [
    {
      release: "release/imagine-dragons-loom",
      discNumber: 1,
      position: 7,
      externalId: "5SjNA4XCvnggm47yCdNGYe",
      externalLink: "https://open.spotify.com/track/5SjNA4XCvnggm47yCdNGYe",
    },
  ],
} as const satisfies Track
