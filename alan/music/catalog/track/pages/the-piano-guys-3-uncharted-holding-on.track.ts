import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedHoldingOn = {
  id: "01a0afa2-1245-73ca-8e1a-4976031c9f15",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-holding-on",
  ownLength: 3.441666666666667,
  ownProgress: 3.441666666666667,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  status: "completed",
  unit: "unit/minutes",
  title: "Holding On",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "holdingon|0jW6R8CVyVohuUJVcuweDI|206500",
  song: "song/the-piano-guys-holding-on",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-uncharted",
      discNumber: 1,
      position: 8,
      externalId: "4NtdfercTqkeThHmZwMrtZ",
      externalLink: "https://open.spotify.com/track/4NtdfercTqkeThHmZwMrtZ",
    },
  ],
} as const satisfies Track
