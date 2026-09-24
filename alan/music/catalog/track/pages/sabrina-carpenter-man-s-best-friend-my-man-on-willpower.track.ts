import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterManSBestFriendMyManOnWillpower = {
  id: "01a0b111-1b89-767d-a681-9642ba2070ca",
  type: "page-type/track",
  slug: "sabrina-carpenter-man-s-best-friend-my-man-on-willpower",
  ownLength: 3.29695,
  ownProgress: 3.29695,
  partOfCollections: [
    "release/sabrina-carpenter-man-s-best-friend",
    "release/sabrina-carpenter-mans-best-friend-bonus-track-version",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "My Man on Willpower",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "mymanonwillpower|74KM79TiuVKeVCqs8QtB0B|197817",
  song: "song/sabrina-carpenter-my-man-on-willpower",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-man-s-best-friend",
      discNumber: 1,
      position: 3,
      externalId: "3EMfeKtNK4q4k3sVjwg5Yy",
      externalLink: "https://open.spotify.com/track/3EMfeKtNK4q4k3sVjwg5Yy",
    },
    {
      release: "release/sabrina-carpenter-mans-best-friend-bonus-track-version",
      discNumber: 1,
      position: 3,
      externalId: "55mSczJe2xInDWNT2mPaOC",
      externalLink: "https://open.spotify.com/track/55mSczJe2xInDWNT2mPaOC",
    },
  ],
} as const satisfies Track
