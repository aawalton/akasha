import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPianoFocusEyeOfTheTiger = {
  id: "01a0afa1-c37c-77d4-896d-1973f534f897",
  type: "page-type/track",
  slug: "the-piano-guys-piano-focus-eye-of-the-tiger",
  ownLength: 4.046083333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-piano-focus"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0X2hERsj0DBsTEi7zMpujO",
      externalLink: "https://open.spotify.com/track/0X2hERsj0DBsTEi7zMpujO",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Eye of the Tiger",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "eyeofthetiger|0jW6R8CVyVohuUJVcuweDI|242765",
} as const satisfies Track
