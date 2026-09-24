import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySpeedOfSoundSpeedOfSound = {
  id: "01a0b9ee-ffd1-7539-a8b9-9a0bd1952c35",
  type: "page-type/track",
  slug: "coldplay-speed-of-sound-speed-of-sound",
  ownLength: 4.807333333333333,
  ownProgress: 4.807333333333333,
  partOfCollections: ["release/coldplay-speed-of-sound"],
  status: "completed",
  unit: "unit/minutes",
  title: "Speed of Sound",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "speedofsound|4gzpq5DPGxSnKTe4SA8HAU|288440",
  song: "song/coldplay-speed-of-sound",
  carriedBy: [
    {
      release: "release/coldplay-speed-of-sound",
      discNumber: 1,
      position: 1,
      externalId: "7nkF0Ti82lcxlsUcNATQa2",
      externalLink: "https://open.spotify.com/track/7nkF0Ti82lcxlsUcNATQa2",
    },
  ],
} as const satisfies Track
