import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedCelloopa = {
  id: "01a0afa2-1201-78ed-85db-789f82406fc8",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-celloopa",
  ownLength: 2.7781166666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2phRXHs8UKSvVvhoOQhjJt",
      externalLink: "https://open.spotify.com/track/2phRXHs8UKSvVvhoOQhjJt",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Celloopa",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "celloopa|0jW6R8CVyVohuUJVcuweDI|166687",
  song: "song/the-piano-guys-celloopa",
} as const satisfies Track
