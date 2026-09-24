import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310FurEliseJam = {
  id: "01a0afa2-0a8f-7469-857f-a9be0cf476fe",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-fur-elise-jam",
  ownLength: 2.1148833333333332,
  ownProgress: 2.1148833333333332,
  partOfCollections: [
    "release/the-piano-guys-3-10",
    "release/the-piano-guys-the-piano-guys-solo-sessions-jon-schmidt-vol-2",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Für Elise Jam",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "furelisejam|0jW6R8CVyVohuUJVcuweDI|126893",
  song: "song/the-piano-guys-fur-elise-jam",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 1,
      position: 3,
      externalId: "243OYD9RRSZbBFEcDLrQv4",
      externalLink: "https://open.spotify.com/track/243OYD9RRSZbBFEcDLrQv4",
    },
    {
      release: "release/the-piano-guys-the-piano-guys-solo-sessions-jon-schmidt-vol-2",
      discNumber: 1,
      position: 7,
      externalId: "121xDi99fhyvOQy8MLOuKm",
      externalLink: "https://open.spotify.com/track/121xDi99fhyvOQy8MLOuKm",
    },
  ],
} as const satisfies Track
