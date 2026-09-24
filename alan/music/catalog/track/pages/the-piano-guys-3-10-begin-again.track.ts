import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310BeginAgain = {
  id: "01a0afa2-0cc2-70ca-a138-d9a48cdf1e6e",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-begin-again",
  ownLength: 4.0917666666666666,
  ownProgress: 4.0917666666666666,
  partOfCollections: [
    "release/the-piano-guys-3-10",
    "release/the-piano-guys-3-classical-love-romance",
    "release/the-piano-guys-3-pop-on-piano",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Begin Again",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "beginagain|0jW6R8CVyVohuUJVcuweDI|245506",
  song: "song/taylor-swift-begin-again",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 2,
      position: 7,
      externalId: "5voYhW2rWkcbFDHceCHVWq",
      externalLink: "https://open.spotify.com/track/5voYhW2rWkcbFDHceCHVWq",
    },
    {
      release: "release/the-piano-guys-3-classical-love-romance",
      discNumber: 1,
      position: 5,
      externalId: "1qSF2qBpQrsgGztDQfTPrR",
      externalLink: "https://open.spotify.com/track/1qSF2qBpQrsgGztDQfTPrR",
    },
    {
      release: "release/the-piano-guys-3-pop-on-piano",
      discNumber: 1,
      position: 10,
      externalId: "3M6uWdYTUPOh5bXqdgCKL7",
      externalLink: "https://open.spotify.com/track/3M6uWdYTUPOh5bXqdgCKL7",
    },
  ],
} as const satisfies Track
