import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveFathersEyesLive = {
  id: "01a0afa2-1426-70b6-a0e3-adf84ef278ac",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-fathers-eyes-live",
  ownLength: 4.170216666666667,
  ownProgress: 4.170216666666667,
  partOfCollections: ["release/the-piano-guys-3-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fathers' Eyes (Live)",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "fatherseyeslive|0jW6R8CVyVohuUJVcuweDI|250213",
  song: "song/the-piano-guys-fathers-eyes",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-live",
      discNumber: 1,
      position: 10,
      externalId: "2l82fJTaKU3fuDPku9dc7c",
      externalLink: "https://open.spotify.com/track/2l82fJTaKU3fuDPku9dc7c",
    },
  ],
} as const satisfies Track
