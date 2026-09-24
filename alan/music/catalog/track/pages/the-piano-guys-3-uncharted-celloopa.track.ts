import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedCelloopa = {
  id: "01a0afa2-1201-78ed-85db-789f82406fc8",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-celloopa",
  ownLength: 2.7781166666666666,
  ownProgress: 2.7781166666666666,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  status: "completed",
  unit: "unit/minutes",
  title: "Celloopa",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "celloopa|0jW6R8CVyVohuUJVcuweDI|166687",
  song: "song/the-piano-guys-celloopa",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-uncharted",
      discNumber: 1,
      position: 6,
      externalId: "2phRXHs8UKSvVvhoOQhjJt",
      externalLink: "https://open.spotify.com/track/2phRXHs8UKSvVvhoOQhjJt",
    },
  ],
} as const satisfies Track
