import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSueMeRemixesSueMeDaveAudeRemix = {
  id: "01a0b111-30af-72bc-85de-e655e70b522a",
  type: "page-type/track",
  slug: "sabrina-carpenter-sue-me-remixes-sue-me-dave-aude-remix",
  ownLength: 3.828116666666667,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-sue-me-remixes"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3WjGTNxFlIDjo9mjmToKf3",
      externalLink: "https://open.spotify.com/track/3WjGTNxFlIDjo9mjmToKf3",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Sue Me - Dave Audé Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "1vWImodgVqIgTUkekGEfR9", artistName: "Dave Audé" },
  ],
  trackKey: "suemedaveauderemix|1vWImodgVqIgTUkekGEfR9,74KM79TiuVKeVCqs8QtB0B|229687",
  song: "song/sabrina-carpenter-sue-me",
} as const satisfies Track
