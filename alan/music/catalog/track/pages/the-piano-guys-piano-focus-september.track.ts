import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPianoFocusSeptember = {
  id: "01a0afa1-c3e2-7740-bb11-20a71a4eaa9b",
  type: "page-type/track",
  slug: "the-piano-guys-piano-focus-september",
  ownLength: 3.4138333333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-piano-focus"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5TtYpSpplG3bmSg7436jbC",
      externalLink: "https://open.spotify.com/track/5TtYpSpplG3bmSg7436jbC",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "September",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "september|0jW6R8CVyVohuUJVcuweDI|204830",
} as const satisfies Track
