import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310ThinkingOutLoud = {
  id: "01a0afa2-0ad1-7f4c-9b50-e0ebfb48f554",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-thinking-out-loud",
  ownLength: 3.877266666666667,
  ownProgress: 3.877266666666667,
  partOfCollections: [
    "release/the-piano-guys-3-10",
    "release/the-piano-guys-3-classical-love-romance",
    "release/the-piano-guys-3-pop-on-piano",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Thinking Out Loud",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "thinkingoutloud|0jW6R8CVyVohuUJVcuweDI|232636",
  song: "song/the-piano-guys-thinking-out-loud",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 1,
      position: 5,
      externalId: "55Kunp4OMnygqTnW7jgua4",
      externalLink: "https://open.spotify.com/track/55Kunp4OMnygqTnW7jgua4",
    },
    {
      release: "release/the-piano-guys-3-classical-love-romance",
      discNumber: 1,
      position: 2,
      externalId: "5j4aplOEPlnQQojKXL0NX8",
      externalLink: "https://open.spotify.com/track/5j4aplOEPlnQQojKXL0NX8",
    },
    {
      release: "release/the-piano-guys-3-pop-on-piano",
      discNumber: 1,
      position: 2,
      externalId: "752jJnfS04iL1jSlpp9Ttj",
      externalLink: "https://open.spotify.com/track/752jJnfS04iL1jSlpp9Ttj",
    },
  ],
} as const satisfies Track
