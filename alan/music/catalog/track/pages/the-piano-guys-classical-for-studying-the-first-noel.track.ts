import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysClassicalForStudyingTheFirstNoel = {
  id: "01a0afa1-c913-7639-8e99-bd9caa1ac0ab",
  type: "page-type/track",
  slug: "the-piano-guys-classical-for-studying-the-first-noel",
  ownLength: 2.816666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-classical-for-studying"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7amrodXJN48qEqs5Lld0Dp",
      externalLink: "https://open.spotify.com/track/7amrodXJN48qEqs5Lld0Dp",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The First Noel",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "thefirstnoel|0jW6R8CVyVohuUJVcuweDI|169000",
} as const satisfies Track
