import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGhostStoriesOceans = {
  id: "01a0b9ee-d902-7288-80f7-eabcde465c62",
  type: "page-type/track",
  slug: "coldplay-ghost-stories-oceans",
  ownLength: 5.3613333333333335,
  ownProgress: 5.3613333333333335,
  partOfCollections: ["release/coldplay-ghost-stories"],
  status: "completed",
  unit: "unit/minutes",
  title: "Oceans",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "oceans|4gzpq5DPGxSnKTe4SA8HAU|321680",
  song: "song/coldplay-oceans",
  carriedBy: [
    {
      release: "release/coldplay-ghost-stories",
      discNumber: 1,
      position: 7,
      externalId: "2u4uhtETtcULnkBfFHSnDX",
      externalLink: "https://open.spotify.com/track/2u4uhtETtcULnkBfFHSnDX",
    },
  ],
} as const satisfies Track
