import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele25WhenWeWereYoung = {
  id: "01a0d52b-c25a-7086-ad30-e8da775cafdd",
  type: "page-type/track",
  slug: "adele-25-when-we-were-young",
  ownLength: 4.848333333333334,
  ownProgress: 0,
  partOfCollections: ["release/adele-25", "release/adele-when-we-were-young"],
  status: "not-started",
  unit: "unit/minutes",
  title: "When We Were Young",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "whenwewereyoung|4dpARuHxo51G3z768sgnrY|290900",
  song: "song/adele-when-we-were-young",
  carriedBy: [
    {
      release: "release/adele-25",
      discNumber: 1,
      position: 4,
      externalId: "7GgWAITsYJaRM3r50rfh5w",
      externalLink: "https://open.spotify.com/track/7GgWAITsYJaRM3r50rfh5w",
    },
    {
      release: "release/adele-when-we-were-young",
      discNumber: 1,
      position: 1,
      externalId: "4Tt2ahBQFQVt8uhmenn6D4",
      externalLink: "https://open.spotify.com/track/4Tt2ahBQFQVt8uhmenn6D4",
    },
  ],
} as const satisfies Track
