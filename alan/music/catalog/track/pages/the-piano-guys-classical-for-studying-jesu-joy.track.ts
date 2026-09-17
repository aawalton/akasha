import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysClassicalForStudyingJesuJoy = {
  id: "01a0afa1-c8c7-7d30-b92d-99f97880bdd2",
  type: "page-type/track",
  slug: "the-piano-guys-classical-for-studying-jesu-joy",
  ownLength: 3.269216666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-classical-for-studying"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1jANKFNy2VhTiRhq59CunA",
      externalLink: "https://open.spotify.com/track/1jANKFNy2VhTiRhq59CunA",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Jesu Joy",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "jesujoy|0jW6R8CVyVohuUJVcuweDI|196153",
} as const satisfies Track
