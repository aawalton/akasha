import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplaySpeedOfSoundThingsIDontUnderstand = {
  id: "01a0b9ee-fff7-7764-afe8-0ea6456f892a",
  type: "page-type/track",
  slug: "coldplay-speed-of-sound-things-i-dont-understand",
  ownLength: 4.9271,
  ownProgress: 4.9271,
  partOfCollections: ["release/coldplay-speed-of-sound"],
  status: "completed",
  unit: "unit/minutes",
  title: "Things I Don't Understand",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "thingsidontunderstand|4gzpq5DPGxSnKTe4SA8HAU|295626",
  song: "song/coldplay-things-i-dont-understand",
  carriedBy: [
    {
      release: "release/coldplay-speed-of-sound",
      discNumber: 1,
      position: 2,
      externalId: "5AeARoYmk0okMRWAlPHLzj",
      externalLink: "https://open.spotify.com/track/5AeARoYmk0okMRWAlPHLzj",
    },
  ],
} as const satisfies Track
