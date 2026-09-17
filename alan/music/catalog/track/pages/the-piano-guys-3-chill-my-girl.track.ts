import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillMyGirl = {
  id: "01a0afa1-e071-75b5-81bc-6a0be9461795",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-my-girl",
  ownLength: 3.9403,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-chill"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4WBnIZM50ar3cWplqV4TI4",
      externalLink: "https://open.spotify.com/track/4WBnIZM50ar3cWplqV4TI4",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "My Girl",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "mygirl|0jW6R8CVyVohuUJVcuweDI|236418",
} as const satisfies Track
