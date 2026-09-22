import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxCallDownTheDragonSetInStone = {
  id: "01a0c95d-fe76-7e24-8861-97fbdb0be463",
  type: "page-type/track",
  slug: "lilith-max-call-down-the-dragon-set-in-stone",
  ownLength: 3.0508333333333333,
  ownProgress: 0,
  partOfCollections: ["release/lilith-max-call-down-the-dragon"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Set in Stone",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "797SPxZf82IYq3XCM8c9AM", artistName: "Lilith Max" }],
  trackKey: "setinstone|797SPxZf82IYq3XCM8c9AM|183050",
  song: "song/lilith-max-set-in-stone",
  carriedBy: [
    {
      release: "release/lilith-max-call-down-the-dragon",
      discNumber: 1,
      position: 5,
      externalId: "3D3CyaCVZ32qnAPFdnIpQ6",
      externalLink: "https://open.spotify.com/track/3D3CyaCVZ32qnAPFdnIpQ6",
    },
  ],
} as const satisfies Track
