import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysRelaxingPianoWhatWasIMadeFor = {
  id: "01a0afa1-ca91-78a6-8098-b79b0abe5079",
  type: "page-type/track",
  slug: "the-piano-guys-relaxing-piano-what-was-i-made-for",
  ownLength: 4.180616666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-relaxing-piano"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "412o7iyKyd6PtaAWvJz6eL",
      externalLink: "https://open.spotify.com/track/412o7iyKyd6PtaAWvJz6eL",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "What Was I Made For?",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "whatwasimadefor|0jW6R8CVyVohuUJVcuweDI|250837",
  song: "song/billie-eilish-what-was-i-made-for",
} as const satisfies Track
