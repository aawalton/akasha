import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillJupiter = {
  id: "01a0afa1-e13a-7fab-97bf-7f54ddad18df",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-jupiter",
  ownLength: 3.223883333333333,
  ownProgress: 3.223883333333333,
  partOfCollections: ["release/the-piano-guys-3-chill"],
  status: "completed",
  unit: "unit/minutes",
  title: "Jupiter",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "jupiter|0jW6R8CVyVohuUJVcuweDI|193433",
  song: "song/the-piano-guys-jupiter",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-chill",
      discNumber: 1,
      position: 7,
      externalId: "2IpKKmIudVllzv6NKOtNwq",
      externalLink: "https://open.spotify.com/track/2IpKKmIudVllzv6NKOtNwq",
    },
  ],
} as const satisfies Track
