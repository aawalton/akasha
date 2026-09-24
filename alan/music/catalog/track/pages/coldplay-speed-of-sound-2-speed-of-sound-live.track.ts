import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySpeedOfSound2SpeedOfSoundLive = {
  id: "01a0b9ef-001f-7f0f-99ef-0b574fe85d13",
  type: "page-type/track",
  slug: "coldplay-speed-of-sound-2-speed-of-sound-live",
  ownLength: 4.7499666666666664,
  ownProgress: 4.7499666666666664,
  partOfCollections: ["release/coldplay-speed-of-sound-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Speed of Sound - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "speedofsoundlive|4gzpq5DPGxSnKTe4SA8HAU|284998",
  song: "song/coldplay-speed-of-sound",
  carriedBy: [
    {
      release: "release/coldplay-speed-of-sound-2",
      discNumber: 1,
      position: 1,
      externalId: "4IGUhtEPrvDVQfpHp9QFPj",
      externalLink: "https://open.spotify.com/track/4IGUhtEPrvDVQfpHp9QFPj",
    },
  ],
} as const satisfies Track
