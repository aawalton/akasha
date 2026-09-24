import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillWakeMeUpBeforeYouGoGo = {
  id: "01a0afa1-e092-7277-9f9e-e154bd65aea8",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-wake-me-up-before-you-go-go",
  ownLength: 3.9680833333333334,
  ownProgress: 3.9680833333333334,
  partOfCollections: ["release/the-piano-guys-3-chill"],
  status: "completed",
  unit: "unit/minutes",
  title: "Wake Me Up Before You Go-Go",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "wakemeupbeforeyougogo|0jW6R8CVyVohuUJVcuweDI|238085",
  song: "song/the-piano-guys-wake-me-up-before-you-go-go",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-chill",
      discNumber: 1,
      position: 2,
      externalId: "6wfKswmsUoucuBXnsK0NzB",
      externalLink: "https://open.spotify.com/track/6wfKswmsUoucuBXnsK0NzB",
    },
  ],
} as const satisfies Track
