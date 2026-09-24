import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2BeginAgain = {
  id: "01a0afa2-1fc6-77d4-b224-80e996afdbb8",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-begin-again",
  ownLength: 4.154166666666667,
  ownProgress: 4.154166666666667,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Begin Again",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "beginagain|0jW6R8CVyVohuUJVcuweDI|249250",
  song: "song/taylor-swift-begin-again",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys-2",
      discNumber: 1,
      position: 1,
      externalId: "0yZ9AtjultQdU5KL7mL1ai",
      externalLink: "https://open.spotify.com/track/0yZ9AtjultQdU5KL7mL1ai",
    },
  ],
} as const satisfies Track
