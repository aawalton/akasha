import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysRelaxingPianoMyGirl = {
  id: "01a0afa1-cba3-7a41-b4c0-ca5e3b0f900d",
  type: "page-type/track",
  slug: "the-piano-guys-relaxing-piano-my-girl",
  ownLength: 3.9403,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-relaxing-piano"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Y76cvCrqviJhODIpcTnWM",
      externalLink: "https://open.spotify.com/track/0Y76cvCrqviJhODIpcTnWM",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "My Girl",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "mygirl|0jW6R8CVyVohuUJVcuweDI|236418",
  song: "song/the-piano-guys-my-girl",
} as const satisfies Track
