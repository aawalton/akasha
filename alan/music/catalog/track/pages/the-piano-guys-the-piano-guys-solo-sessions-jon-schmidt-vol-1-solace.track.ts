import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysThePianoGuysSoloSessionsJonSchmidtVol1Solace = {
  id: "01a0afa1-c565-7007-bbb2-70512bb1627a",
  type: "page-type/track",
  slug: "the-piano-guys-the-piano-guys-solo-sessions-jon-schmidt-vol-1-solace",
  ownLength: 3.8269166666666665,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-the-piano-guys-solo-sessions-jon-schmidt-vol-1"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7jxSZjuVfjbE7hzO1iyKpQ",
      externalLink: "https://open.spotify.com/track/7jxSZjuVfjbE7hzO1iyKpQ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Solace",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "2YQ4MY2VwOMv43C0GemUY5", artistName: "Jon Schmidt" }],
  trackKey: "solace|2YQ4MY2VwOMv43C0GemUY5|229615",
  song: "song/the-piano-guys-solace",
} as const satisfies Track
