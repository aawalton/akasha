import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SomeoneYouLovedSomeoneYouLoved = {
  id: "01a0afa2-1d78-7258-8d15-f326b48ae52a",
  type: "page-type/track",
  slug: "the-piano-guys-3-someone-you-loved-someone-you-loved",
  ownLength: 3.3857666666666666,
  ownProgress: 3.3857666666666666,
  partOfCollections: [
    "release/the-piano-guys-3-someone-you-loved",
    "release/the-piano-guys-serenity",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Someone You Loved",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "someoneyouloved|0jW6R8CVyVohuUJVcuweDI|203146",
  song: "song/the-piano-guys-someone-you-loved",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-someone-you-loved",
      discNumber: 1,
      position: 1,
      externalId: "0PiNYPMkmHxtDS0EZKK35X",
      externalLink: "https://open.spotify.com/track/0PiNYPMkmHxtDS0EZKK35X",
    },
    {
      release: "release/the-piano-guys-serenity",
      discNumber: 1,
      position: 2,
      externalId: "6exccVMFxHjO0gsWeLum7Q",
      externalLink: "https://open.spotify.com/track/6exccVMFxHjO0gsWeLum7Q",
    },
  ],
} as const satisfies Track
