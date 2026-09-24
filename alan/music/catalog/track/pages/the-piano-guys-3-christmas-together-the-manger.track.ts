import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChristmasTogetherTheManger = {
  id: "01a0afa2-110c-718c-86b0-2b30ed479e3a",
  type: "page-type/track",
  slug: "the-piano-guys-3-christmas-together-the-manger",
  ownLength: 4.0072833333333335,
  ownProgress: 4.0072833333333335,
  partOfCollections: ["release/the-piano-guys-3-christmas-together"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Manger",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "themanger|0jW6R8CVyVohuUJVcuweDI|240437",
  song: "song/the-piano-guys-the-manger",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-christmas-together",
      discNumber: 1,
      position: 11,
      externalId: "5Azhx9AoHz79HY7YbIt7ds",
      externalLink: "https://open.spotify.com/track/5Azhx9AoHz79HY7YbIt7ds",
    },
  ],
} as const satisfies Track
