import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysRelaxingPianoOdeToJoy = {
  id: "01a0afa1-cbe4-792a-abca-c469269c825d",
  type: "page-type/track",
  slug: "the-piano-guys-relaxing-piano-ode-to-joy",
  ownLength: 1.7685166666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-relaxing-piano"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3FoabcSrHvvRyNa6GAPaqS",
      externalLink: "https://open.spotify.com/track/3FoabcSrHvvRyNa6GAPaqS",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Ode To Joy",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "odetojoy|0jW6R8CVyVohuUJVcuweDI|106111",
} as const satisfies Track
