import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallBeCalmBrainHealthyMusicSweetEscape = {
  id: "01a0b4c8-6acc-751e-b8f8-5cee5f4be62a",
  type: "page-type/track",
  slug: "paul-cardall-be-calm-brain-healthy-music-sweet-escape",
  ownLength: 3.14355,
  ownProgress: 3.14355,
  partOfCollections: [
    "release/paul-cardall-be-calm-brain-healthy-music",
    "release/paul-cardall-sacred-piano",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Sweet Escape",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "sweetescape|7FQRbf8gbKw8KZQZAJWxH2|188613",
  song: "song/paul-cardall-sweet-escape",
  carriedBy: [
    {
      release: "release/paul-cardall-be-calm-brain-healthy-music",
      discNumber: 1,
      position: 4,
      externalId: "7bwd9S6n7kHPHKj2Tal7Fo",
      externalLink: "https://open.spotify.com/track/7bwd9S6n7kHPHKj2Tal7Fo",
    },
    {
      release: "release/paul-cardall-sacred-piano",
      discNumber: 1,
      position: 5,
      externalId: "4gyhq95o5WmoWjUeFkqkAV",
      externalLink: "https://open.spotify.com/track/4gyhq95o5WmoWjUeFkqkAV",
    },
  ],
} as const satisfies Track
