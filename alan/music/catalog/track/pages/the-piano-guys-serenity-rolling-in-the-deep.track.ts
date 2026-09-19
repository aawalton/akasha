import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityRollingInTheDeep = {
  id: "01a0afa2-08d2-74c7-804d-335230ea8b6a",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-rolling-in-the-deep",
  ownLength: 3.8524333333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2glhwMIx8o8zeyIq7cveFl",
      externalLink: "https://open.spotify.com/track/2glhwMIx8o8zeyIq7cveFl",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Rolling in the Deep",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "rollinginthedeep|0jW6R8CVyVohuUJVcuweDI|231146",
  song: "song/the-piano-guys-rolling-in-the-deep",
} as const satisfies Track
