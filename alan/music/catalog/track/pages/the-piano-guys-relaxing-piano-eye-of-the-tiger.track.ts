import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysRelaxingPianoEyeOfTheTiger = {
  id: "01a0afa1-cb22-7b3d-8cff-00bedc96f10c",
  type: "page-type/track",
  slug: "the-piano-guys-relaxing-piano-eye-of-the-tiger",
  ownLength: 4.046083333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-relaxing-piano"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3uG3JxL93eoKMamQzpNdcC",
      externalLink: "https://open.spotify.com/track/3uG3JxL93eoKMamQzpNdcC",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Eye of the Tiger",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "eyeofthetiger|0jW6R8CVyVohuUJVcuweDI|242765",
} as const satisfies Track
