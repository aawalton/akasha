import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillSweetChildOMine = {
  id: "01a0afa1-e0f1-7434-aa1a-81f61c322c87",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-sweet-child-o-mine",
  ownLength: 4.329166666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-chill"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0nmLUsH7krNeaz7KC8Qxih",
      externalLink: "https://open.spotify.com/track/0nmLUsH7krNeaz7KC8Qxih",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Sweet Child o' Mine",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "sweetchildomine|0jW6R8CVyVohuUJVcuweDI|259750",
} as const satisfies Track
