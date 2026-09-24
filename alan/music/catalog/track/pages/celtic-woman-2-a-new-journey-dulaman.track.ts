import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyDulaman = {
  id: "01a0abea-74ed-7f21-9005-1d4b0c192834",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-dulaman",
  ownLength: 3.0917666666666666,
  ownProgress: 3.0917666666666666,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  status: "completed",
  unit: "unit/minutes",
  title: "Dúlaman",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "dulaman|6NWtt9pNOL2Gx7kBykdE5x|185506",
  song: "song/celtic-woman-dulaman",
  carriedBy: [
    {
      release: "release/celtic-woman-2-a-new-journey",
      discNumber: 1,
      position: 7,
      externalId: "6s4tmVUNIhCFzwdikt4l5m",
      externalLink: "https://open.spotify.com/track/6s4tmVUNIhCFzwdikt4l5m",
    },
  ],
} as const satisfies Track
