import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedTheJungleBookSarabande = {
  id: "01a0afa2-1223-779b-8506-502a70501b57",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-the-jungle-book-sarabande",
  ownLength: 3.7020833333333334,
  ownProgress: 3.7020833333333334,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Jungle Book / Sarabande",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "thejunglebooksarabande|0jW6R8CVyVohuUJVcuweDI|222125",
  song: "song/the-piano-guys-the-jungle-book-sarabande",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-uncharted",
      discNumber: 1,
      position: 7,
      externalId: "6ekMALFUBI4AaxazzS3hiC",
      externalLink: "https://open.spotify.com/track/6ekMALFUBI4AaxazzS3hiC",
    },
  ],
} as const satisfies Track
