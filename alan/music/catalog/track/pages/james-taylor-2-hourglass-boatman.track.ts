import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassBoatman = {
  id: "01a0abeb-3b4e-754a-91b7-a2355a377ce2",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-boatman",
  ownLength: 3.9433333333333334,
  ownProgress: 3.9433333333333334,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Boatman",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "boatman|0vn7UBvSQECKJm2817Yf1P|236600",
  song: "song/james-taylor-boatman",
  carriedBy: [
    {
      release: "release/james-taylor-2-hourglass",
      discNumber: 1,
      position: 11,
      externalId: "4K5KFqVDdDInzT6NWklNMH",
      externalLink: "https://open.spotify.com/track/4K5KFqVDdDInzT6NWklNMH",
    },
  ],
} as const satisfies Track
