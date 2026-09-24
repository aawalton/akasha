import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedCantStopTheFeeling = {
  id: "01a0afa2-1267-79b0-9099-ba1cb244f249",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-cant-stop-the-feeling",
  ownLength: 3.0458333333333334,
  ownProgress: 3.0458333333333334,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  status: "completed",
  unit: "unit/minutes",
  title: "Can't Stop the Feeling",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "cantstopthefeeling|0jW6R8CVyVohuUJVcuweDI|182750",
  song: "song/the-piano-guys-cant-stop-the-feeling",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-uncharted",
      discNumber: 1,
      position: 9,
      externalId: "7LfVbcoCLy1u3zKUwO9VxN",
      externalLink: "https://open.spotify.com/track/7LfVbcoCLy1u3zKUwO9VxN",
    },
  ],
} as const satisfies Track
