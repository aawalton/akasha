import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3EyeOfTheTigerEyeOfTheTiger = {
  id: "01a0afa2-03a2-7ad5-bb1e-7439c132dbbb",
  type: "page-type/track",
  slug: "the-piano-guys-3-eye-of-the-tiger-eye-of-the-tiger",
  ownLength: 4.046083333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-eye-of-the-tiger"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5k4ajHSHBw42NgLV05C1rg",
      externalLink: "https://open.spotify.com/track/5k4ajHSHBw42NgLV05C1rg",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Eye of the Tiger",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "eyeofthetiger|0jW6R8CVyVohuUJVcuweDI|242765",
  song: "song/the-piano-guys-eye-of-the-tiger",
} as const satisfies Track
