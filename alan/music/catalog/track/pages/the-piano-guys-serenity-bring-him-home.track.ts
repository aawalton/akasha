import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityBringHimHome = {
  id: "01a0afa2-095b-7ccc-96cb-7b43a140ec61",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-bring-him-home",
  ownLength: 4.2551,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0CmKXpiwghfbKSlGkpNKW0",
      externalLink: "https://open.spotify.com/track/0CmKXpiwghfbKSlGkpNKW0",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Bring Him Home",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "bringhimhome|0jW6R8CVyVohuUJVcuweDI|255306",
  song: "song/the-piano-guys-bring-him-home",
} as const satisfies Track
