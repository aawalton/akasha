import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3InTheStarsInTheStars = {
  id: "01a0afa1-efd1-7897-8036-83184971a3da",
  type: "page-type/track",
  slug: "the-piano-guys-3-in-the-stars-in-the-stars",
  ownLength: 3.6346,
  ownProgress: 3.6346,
  partOfCollections: [
    "release/the-piano-guys-3-in-the-stars",
    "release/the-piano-guys-3-unstoppable-2",
    "release/the-piano-guys-piano-focus",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "In The Stars",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "inthestars|0jW6R8CVyVohuUJVcuweDI|218076",
  song: "song/the-piano-guys-in-the-stars",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-in-the-stars",
      discNumber: 1,
      position: 1,
      externalId: "4zkLrc401RiE6YuekwE7Ju",
      externalLink: "https://open.spotify.com/track/4zkLrc401RiE6YuekwE7Ju",
    },
    {
      release: "release/the-piano-guys-3-unstoppable-2",
      discNumber: 1,
      position: 7,
      externalId: "7wZ8Fr8qK8a2VVH5ZaAisA",
      externalLink: "https://open.spotify.com/track/7wZ8Fr8qK8a2VVH5ZaAisA",
    },
    {
      release: "release/the-piano-guys-piano-focus",
      discNumber: 1,
      position: 5,
      externalId: "3mz1dfIoOV8ICAAyIhuhPY",
      externalLink: "https://open.spotify.com/track/3mz1dfIoOV8ICAAyIhuhPY",
    },
  ],
} as const satisfies Track
