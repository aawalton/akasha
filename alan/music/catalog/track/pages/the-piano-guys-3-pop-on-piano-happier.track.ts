import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3PopOnPianoHappier = {
  id: "01a0afa1-cea8-72fd-be0f-99adac7e962f",
  type: "page-type/track",
  slug: "the-piano-guys-3-pop-on-piano-happier",
  ownLength: 3.74,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-pop-on-piano"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4WisyS4wK9Jd2BOIM8GxI6",
      externalLink: "https://open.spotify.com/track/4WisyS4wK9Jd2BOIM8GxI6",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Happier",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "happier|0jW6R8CVyVohuUJVcuweDI|224400",
  song: "song/the-piano-guys-happier",
} as const satisfies Track
