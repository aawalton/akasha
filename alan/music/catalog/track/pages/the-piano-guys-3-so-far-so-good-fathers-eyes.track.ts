import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodFathersEyes = {
  id: "01a0afa2-1b69-799d-a294-aa6f475cdf28",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-fathers-eyes",
  ownLength: 3.914066666666667,
  ownProgress: 3.914066666666667,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fathers' Eyes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "fatherseyes|0jW6R8CVyVohuUJVcuweDI|234844",
  song: "song/the-piano-guys-fathers-eyes",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-so-far-so-good",
      discNumber: 1,
      position: 5,
      externalId: "3YSwdpFAYzm5C0OQlenezw",
      externalLink: "https://open.spotify.com/track/3YSwdpFAYzm5C0OQlenezw",
    },
  ],
} as const satisfies Track
