import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3PopOnPianoSomeoneToYou = {
  id: "01a0afa1-cdd2-72a0-bf9a-14d2b13694bf",
  type: "page-type/track",
  slug: "the-piano-guys-3-pop-on-piano-someone-to-you",
  ownLength: 3.4433333333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-pop-on-piano"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0wwDnCFc5LaSQ5dZNNjH7c",
      externalLink: "https://open.spotify.com/track/0wwDnCFc5LaSQ5dZNNjH7c",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Someone To You",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "someonetoyou|0jW6R8CVyVohuUJVcuweDI|206600",
  song: "song/the-piano-guys-someone-to-you",
} as const satisfies Track
