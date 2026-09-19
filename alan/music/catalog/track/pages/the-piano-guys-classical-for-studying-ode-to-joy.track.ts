import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysClassicalForStudyingOdeToJoy = {
  id: "01a0afa1-c87f-7c9f-9dc0-f97170366570",
  type: "page-type/track",
  slug: "the-piano-guys-classical-for-studying-ode-to-joy",
  ownLength: 1.7685166666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-classical-for-studying"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0HeQdNfA86f81ht5zAlSSB",
      externalLink: "https://open.spotify.com/track/0HeQdNfA86f81ht5zAlSSB",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Ode To Joy",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "odetojoy|0jW6R8CVyVohuUJVcuweDI|106111",
  song: "song/the-piano-guys-ode-to-joy",
} as const satisfies Track
