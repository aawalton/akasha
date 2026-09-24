import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3EyesClosedEyesClosed = {
  id: "01a0afa1-ead0-7203-8f14-3aaffcc6e7e0",
  type: "page-type/track",
  slug: "the-piano-guys-3-eyes-closed-eyes-closed",
  ownLength: 4.0759,
  ownProgress: 4.0759,
  partOfCollections: [
    "release/the-piano-guys-3-eyes-closed",
    "release/the-piano-guys-3-unstoppable-2",
    "release/the-piano-guys-autumn-on-piano",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Eyes Closed",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "eyesclosed|0jW6R8CVyVohuUJVcuweDI|244554",
  song: "song/the-piano-guys-eyes-closed",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-eyes-closed",
      discNumber: 1,
      position: 1,
      externalId: "4XZ21h3GvuSwjZthlXQ5T7",
      externalLink: "https://open.spotify.com/track/4XZ21h3GvuSwjZthlXQ5T7",
    },
    {
      release: "release/the-piano-guys-3-unstoppable-2",
      discNumber: 1,
      position: 14,
      externalId: "7pnd8pyDrzVGKY9kEHNVD1",
      externalLink: "https://open.spotify.com/track/7pnd8pyDrzVGKY9kEHNVD1",
    },
    {
      release: "release/the-piano-guys-autumn-on-piano",
      discNumber: 1,
      position: 8,
      externalId: "2VVmlrQyuxfVfVVhhZHvkU",
      externalLink: "https://open.spotify.com/track/2VVmlrQyuxfVfVVhhZHvkU",
    },
  ],
} as const satisfies Track
