import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele30MyLittleLove = {
  id: "01a0d52b-c25a-7273-9224-949c639548aa",
  type: "page-type/track",
  slug: "adele-30-my-little-love",
  ownLength: 6.485116666666666,
  ownProgress: 6.485116666666666,
  partOfCollections: ["release/adele-30"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Little Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "mylittlelove|4dpARuHxo51G3z768sgnrY|389107",
  song: "song/adele-my-little-love",
  carriedBy: [
    {
      release: "release/adele-30",
      discNumber: 1,
      position: 3,
      externalId: "2DuPBbS5mIldXnh7Wum8Cy",
      externalLink: "https://open.spotify.com/track/2DuPBbS5mIldXnh7Wum8Cy",
    },
  ],
} as const satisfies Track
