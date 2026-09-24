import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele30CanIGetIt = {
  id: "01a0d52b-c25a-7bde-9a26-5a7e3e9040a7",
  type: "page-type/track",
  slug: "adele-30-can-i-get-it",
  ownLength: 3.5064,
  ownProgress: 3.5064,
  partOfCollections: ["release/adele-30"],
  status: "completed",
  unit: "unit/minutes",
  title: "Can I Get It",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "canigetit|4dpARuHxo51G3z768sgnrY|210384",
  song: "song/adele-can-i-get-it",
  carriedBy: [
    {
      release: "release/adele-30",
      discNumber: 1,
      position: 6,
      externalId: "6w8ZPYdnGajyfPddTWdthN",
      externalLink: "https://open.spotify.com/track/6w8ZPYdnGajyfPddTWdthN",
    },
  ],
} as const satisfies Track
