import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysClassicalForStudyingGhost = {
  id: "01a0afa1-ca0e-7271-a543-afddb0c7b742",
  type: "page-type/track",
  slug: "the-piano-guys-classical-for-studying-ghost",
  ownLength: 3.4423,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-classical-for-studying"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "08gusbNwqFeQbExWbNcEWg",
      externalLink: "https://open.spotify.com/track/08gusbNwqFeQbExWbNcEWg",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Ghost",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "ghost|0jW6R8CVyVohuUJVcuweDI|206538",
} as const satisfies Track
