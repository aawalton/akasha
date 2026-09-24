import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3TheFirstNoelTheFirstNoel = {
  id: "01a0afa1-e669-72aa-a40d-cfca3a684206",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-first-noel-the-first-noel",
  ownLength: 2.816666666666667,
  ownProgress: 2.816666666666667,
  partOfCollections: [
    "release/the-piano-guys-3-the-first-noel",
    "release/the-piano-guys-classical-for-studying",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "The First Noel",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "thefirstnoel|0jW6R8CVyVohuUJVcuweDI|169000",
  song: "song/the-piano-guys-the-first-noel",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-first-noel",
      discNumber: 1,
      position: 1,
      externalId: "7EbQF0Tt5n7xgn62gJjGbi",
      externalLink: "https://open.spotify.com/track/7EbQF0Tt5n7xgn62gJjGbi",
    },
    {
      release: "release/the-piano-guys-classical-for-studying",
      discNumber: 1,
      position: 7,
      externalId: "7amrodXJN48qEqs5Lld0Dp",
      externalLink: "https://open.spotify.com/track/7amrodXJN48qEqs5Lld0Dp",
    },
  ],
} as const satisfies Track
