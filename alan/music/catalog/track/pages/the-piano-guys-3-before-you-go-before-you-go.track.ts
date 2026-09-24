import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3BeforeYouGoBeforeYouGo = {
  id: "01a0afa2-07fe-727b-a171-8f61def26f1b",
  type: "page-type/track",
  slug: "the-piano-guys-3-before-you-go-before-you-go",
  ownLength: 3.8839166666666665,
  ownProgress: 3.8839166666666665,
  partOfCollections: ["release/the-piano-guys-3-before-you-go", "release/the-piano-guys-3-chill"],
  status: "completed",
  unit: "unit/minutes",
  title: "Before You Go",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "beforeyougo|0jW6R8CVyVohuUJVcuweDI|233035",
  song: "song/the-piano-guys-before-you-go",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-before-you-go",
      discNumber: 1,
      position: 1,
      externalId: "5JLUo91wuHD9coSvZn0Nl9",
      externalLink: "https://open.spotify.com/track/5JLUo91wuHD9coSvZn0Nl9",
    },
    {
      release: "release/the-piano-guys-3-chill",
      discNumber: 1,
      position: 9,
      externalId: "6DcQaaai7MGhgMXEaCg0oF",
      externalLink: "https://open.spotify.com/track/6DcQaaai7MGhgMXEaCg0oF",
    },
  ],
} as const satisfies Track
