import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele21RumourHasIt = {
  id: "01a0d52b-c25a-73d4-a8f6-b237669ce6fa",
  type: "page-type/track",
  slug: "adele-21-rumour-has-it",
  ownLength: 3.7211,
  ownProgress: 0,
  partOfCollections: ["release/adele-21"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Rumour Has It",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "rumourhasit|4dpARuHxo51G3z768sgnrY|223266",
  song: "song/adele-rumour-has-it",
  carriedBy: [
    {
      release: "release/adele-21",
      discNumber: 1,
      position: 2,
      externalId: "2A73XBDBQgmdXO8VsXPWIs",
      externalLink: "https://open.spotify.com/track/2A73XBDBQgmdXO8VsXPWIs",
    },
  ],
} as const satisfies Track
