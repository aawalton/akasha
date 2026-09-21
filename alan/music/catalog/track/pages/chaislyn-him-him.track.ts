import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const chaislynHimHim = {
  id: "01a0b9ec-9746-7bd9-aac8-3d65590f7d0e",
  type: "page-type/track",
  slug: "chaislyn-him-him",
  ownLength: 3.33515,
  ownProgress: 3.33515,
  partOfCollections: ["release/chaislyn-him"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5YY8JhkNdV8BjMWMVOVQsm",
      externalLink: "https://open.spotify.com/track/5YY8JhkNdV8BjMWMVOVQsm",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Him",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3zmbniiciaBAJlSX1Bzq9R", artistName: "Chaislyn" }],
  trackKey: "him|3zmbniiciaBAJlSX1Bzq9R|200109",
  song: "song/chaislyn-him",
  carriedBy: [
    {
      release: "release/chaislyn-him",
      discNumber: 1,
      position: 1,
      externalId: "5YY8JhkNdV8BjMWMVOVQsm",
      externalLink: "https://open.spotify.com/track/5YY8JhkNdV8BjMWMVOVQsm",
    },
  ],
} as const satisfies Track
