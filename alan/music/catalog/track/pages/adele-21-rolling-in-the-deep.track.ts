import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele21RollingInTheDeep = {
  id: "01a0d52b-c25a-778f-99b6-dc5ed64a59a6",
  type: "page-type/track",
  slug: "adele-21-rolling-in-the-deep",
  ownLength: 3.80155,
  ownProgress: 3.80155,
  partOfCollections: ["release/adele-21", "release/adele-rolling-in-the-deep"],
  status: "completed",
  unit: "unit/minutes",
  title: "Rolling in the Deep",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "rollinginthedeep|4dpARuHxo51G3z768sgnrY|228093",
  song: "song/adele-rolling-in-the-deep",
  carriedBy: [
    {
      release: "release/adele-21",
      discNumber: 1,
      position: 1,
      externalId: "1c8gk2PeTE04A1pIDH9YMk",
      externalLink: "https://open.spotify.com/track/1c8gk2PeTE04A1pIDH9YMk",
    },
    {
      release: "release/adele-rolling-in-the-deep",
      discNumber: 1,
      position: 1,
      externalId: "3GkqnS8Lt8LDZV565ITUwh",
      externalLink: "https://open.spotify.com/track/3GkqnS8Lt8LDZV565ITUwh",
    },
  ],
} as const satisfies Track
