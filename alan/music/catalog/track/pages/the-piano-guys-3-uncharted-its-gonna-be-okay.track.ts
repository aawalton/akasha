import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedItsGonnaBeOkay = {
  id: "01a0afa2-11b9-7731-8c74-fe84a18d32fa",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-its-gonna-be-okay",
  ownLength: 3.5093666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6DNVulVDW2tia3ZIpZjcIR",
      externalLink: "https://open.spotify.com/track/6DNVulVDW2tia3ZIpZjcIR",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "(It's Gonna Be) Okay",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "1RTHEDesKGANeFDXyDJBQU", artistName: "Al van der Beek" },
  ],
  trackKey: "itsgonnabeokay|0jW6R8CVyVohuUJVcuweDI,1RTHEDesKGANeFDXyDJBQU|210562",
} as const satisfies Track
