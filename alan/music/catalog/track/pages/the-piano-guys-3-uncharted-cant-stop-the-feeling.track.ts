import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedCantStopTheFeeling = {
  id: "01a0afa2-1267-79b0-9099-ba1cb244f249",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-cant-stop-the-feeling",
  ownLength: 3.0458333333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7LfVbcoCLy1u3zKUwO9VxN",
      externalLink: "https://open.spotify.com/track/7LfVbcoCLy1u3zKUwO9VxN",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Can't Stop the Feeling",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "cantstopthefeeling|0jW6R8CVyVohuUJVcuweDI|182750",
} as const satisfies Track
