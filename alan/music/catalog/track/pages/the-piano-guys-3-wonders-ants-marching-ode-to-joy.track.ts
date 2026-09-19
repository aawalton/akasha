import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersAntsMarchingOdeToJoy = {
  id: "01a0afa2-15da-737a-bca8-d9c074d26734",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-ants-marching-ode-to-joy",
  ownLength: 2.82755,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1q4fLbiyzSFXMNxZrpThOn",
      externalLink: "https://open.spotify.com/track/1q4fLbiyzSFXMNxZrpThOn",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Ants Marching / Ode to Joy",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "antsmarchingodetojoy|0jW6R8CVyVohuUJVcuweDI|169653",
  song: "song/the-piano-guys-ants-marching-ode-to-joy",
} as const satisfies Track
