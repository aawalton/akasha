import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3Unstoppable2WhenYoureGone = {
  id: "01a0afa1-da5f-7b07-af46-b6596c89a2c6",
  type: "page-type/track",
  slug: "the-piano-guys-3-unstoppable-2-when-youre-gone",
  ownLength: 3,
  ownProgress: 3,
  partOfCollections: [
    "release/the-piano-guys-3-unstoppable-2",
    "release/the-piano-guys-3-when-you-re-gone",
    "release/the-piano-guys-piano-focus",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "When You're Gone",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "whenyouregone|0jW6R8CVyVohuUJVcuweDI|180000",
  song: "song/the-piano-guys-when-youre-gone",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-unstoppable-2",
      discNumber: 1,
      position: 4,
      externalId: "2NSJIwZfkJOg1eYBX414sw",
      externalLink: "https://open.spotify.com/track/2NSJIwZfkJOg1eYBX414sw",
    },
    {
      release: "release/the-piano-guys-3-when-you-re-gone",
      discNumber: 1,
      position: 1,
      externalId: "5L7QKqXiuJieIUe7NddG5G",
      externalLink: "https://open.spotify.com/track/5L7QKqXiuJieIUe7NddG5G",
    },
    {
      release: "release/the-piano-guys-piano-focus",
      discNumber: 1,
      position: 6,
      externalId: "56XGOjaT2JGsf8JOEz76XU",
      externalLink: "https://open.spotify.com/track/56XGOjaT2JGsf8JOEz76XU",
    },
  ],
} as const satisfies Track
