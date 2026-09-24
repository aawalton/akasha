import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3FollowYouFollowYou = {
  id: "01a0afa2-0247-7ca9-845b-d9d0cab05439",
  type: "page-type/track",
  slug: "the-piano-guys-3-follow-you-follow-you",
  ownLength: 3.186,
  ownProgress: 3.186,
  partOfCollections: [
    "release/the-piano-guys-3-follow-you",
    "release/the-piano-guys-3-unstoppable-2",
    "release/the-piano-guys-piano-focus",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Follow You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "followyou|0jW6R8CVyVohuUJVcuweDI|191160",
  song: "song/the-piano-guys-follow-you",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-follow-you",
      discNumber: 1,
      position: 1,
      externalId: "3TuSr70bXooym0mzwYBdtx",
      externalLink: "https://open.spotify.com/track/3TuSr70bXooym0mzwYBdtx",
    },
    {
      release: "release/the-piano-guys-3-unstoppable-2",
      discNumber: 1,
      position: 10,
      externalId: "7sbUz0bj7ycK7C748gzc58",
      externalLink: "https://open.spotify.com/track/7sbUz0bj7ycK7C748gzc58",
    },
    {
      release: "release/the-piano-guys-piano-focus",
      discNumber: 1,
      position: 11,
      externalId: "5OJi4LVsOhzE0km9KIjDnp",
      externalLink: "https://open.spotify.com/track/5OJi4LVsOhzE0km9KIjDnp",
    },
  ],
} as const satisfies Track
