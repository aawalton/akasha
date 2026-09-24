import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WhenYouReGoneTheStoryteller = {
  id: "01a0afa1-fd92-7b3e-96d1-f57c7090ea4b",
  type: "page-type/track",
  slug: "the-piano-guys-3-when-you-re-gone-the-storyteller",
  ownLength: 4.678566666666667,
  ownProgress: 4.678566666666667,
  partOfCollections: [
    "release/the-piano-guys-3-when-you-re-gone",
    "release/the-piano-guys-piano-focus",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "The Storyteller",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "thestoryteller|0jW6R8CVyVohuUJVcuweDI|280714",
  song: "song/the-piano-guys-the-storyteller",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-when-you-re-gone",
      discNumber: 1,
      position: 2,
      externalId: "74carSriOwIN8PTWoE9bJ1",
      externalLink: "https://open.spotify.com/track/74carSriOwIN8PTWoE9bJ1",
    },
    {
      release: "release/the-piano-guys-piano-focus",
      discNumber: 1,
      position: 3,
      externalId: "2JzswEgUwjTwkZ1ZqmDuti",
      externalLink: "https://open.spotify.com/track/2JzswEgUwjTwkZ1ZqmDuti",
    },
  ],
} as const satisfies Track
