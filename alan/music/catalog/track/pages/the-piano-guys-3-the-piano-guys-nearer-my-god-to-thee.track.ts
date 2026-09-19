import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysNearerMyGodToThee = {
  id: "01a0afa2-1ab3-7d2c-9c26-d109ac0fa970",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-nearer-my-god-to-thee",
  ownLength: 3.0205,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "15CfgHZuNDYfFpEPUnQd53",
      externalLink: "https://open.spotify.com/track/15CfgHZuNDYfFpEPUnQd53",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Nearer My God to Thee",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "nearermygodtothee|0jW6R8CVyVohuUJVcuweDI|181230",
  song: "song/the-piano-guys-nearer-my-god-to-thee",
} as const satisfies Track
