import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyNessunDorma = {
  id: "01a0afa1-de33-7093-8621-3260f1de33e3",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-nessun-dorma",
  ownLength: 2.4590833333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-lullaby"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4snFyjWPGLNewIjxFPVwfT",
      externalLink: "https://open.spotify.com/track/4snFyjWPGLNewIjxFPVwfT",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Nessun Dorma",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "nessundorma|0jW6R8CVyVohuUJVcuweDI|147545",
  song: "song/the-piano-guys-nessun-dorma",
} as const satisfies Track
