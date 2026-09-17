import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysClassicalForStudyingEyeOfTheTiger = {
  id: "01a0afa1-c933-7550-bff6-c28a9fde760d",
  type: "page-type/track",
  slug: "the-piano-guys-classical-for-studying-eye-of-the-tiger",
  ownLength: 4.046083333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-classical-for-studying"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5aq6WiMcbRBNb6tsgcpYfW",
      externalLink: "https://open.spotify.com/track/5aq6WiMcbRBNb6tsgcpYfW",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Eye of the Tiger",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "eyeofthetiger|0jW6R8CVyVohuUJVcuweDI|242765",
} as const satisfies Track
