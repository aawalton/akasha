import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedUncharted = {
  id: "01a0afa2-12aa-7aaf-bb93-8579c16ded5a",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-uncharted",
  ownLength: 3.535416666666667,
  ownProgress: 3.535416666666667,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  status: "completed",
  unit: "unit/minutes",
  title: "Uncharted",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "uncharted|0jW6R8CVyVohuUJVcuweDI|212125",
  song: "song/the-piano-guys-uncharted",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-uncharted",
      discNumber: 1,
      position: 11,
      externalId: "5vJev1rsuQ71Uonb1gxmnw",
      externalLink: "https://open.spotify.com/track/5vJev1rsuQ71Uonb1gxmnw",
    },
  ],
} as const satisfies Track
