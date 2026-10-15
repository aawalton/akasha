import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const phoebeBridgersLostWeekendKillMe = {
  id: "01a13fd9-71f7-7bc6-9756-6ed293ab5491",
  type: "page-type/track",
  slug: "phoebe-bridgers-lost-weekend-kill-me",
  ownLength: 4.6924,
  ownProgress: 0,
  partOfCollections: ["release/phoebe-bridgers-lost-weekend"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Kill Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/phoebe-bridgers" }],
  trackKey: "killme|1r1uxoy19fzMxunt3ONAkG|281544",
  song: "song/phoebe-bridgers-kill-me",
  carriedBy: [
    {
      release: "release/phoebe-bridgers-lost-weekend",
      discNumber: 1,
      position: 3,
      externalId: "2EPxhPbZczxce6wHbuOlQ6",
      externalLink: "https://open.spotify.com/track/2EPxhPbZczxce6wHbuOlQ6",
    },
  ],
  createdAt: "2026-10-15T13:56:17.521Z",
  updatedAt: "2026-10-15T13:56:17.521Z",
} as const satisfies Track
