import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyEyeOfTheTiger = {
  id: "01a0afa1-dd4a-7bba-85f1-6d7b328a7843",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-eye-of-the-tiger",
  ownLength: 4.046083333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-lullaby"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1cc4zvf99J2lceYa6bk8ln",
      externalLink: "https://open.spotify.com/track/1cc4zvf99J2lceYa6bk8ln",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Eye of the Tiger",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "eyeofthetiger|0jW6R8CVyVohuUJVcuweDI|242765",
} as const satisfies Track
