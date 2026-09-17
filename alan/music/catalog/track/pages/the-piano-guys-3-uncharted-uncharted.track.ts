import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedUncharted = {
  id: "01a0afa2-12aa-7aaf-bb93-8579c16ded5a",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-uncharted",
  ownLength: 3.535416666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5vJev1rsuQ71Uonb1gxmnw",
      externalLink: "https://open.spotify.com/track/5vJev1rsuQ71Uonb1gxmnw",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Uncharted",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "uncharted|0jW6R8CVyVohuUJVcuweDI|212125",
} as const satisfies Track
