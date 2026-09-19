import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterManSBestFriendMyManOnWillpower = {
  id: "01a0b111-1b89-767d-a681-9642ba2070ca",
  type: "page-type/track",
  slug: "sabrina-carpenter-man-s-best-friend-my-man-on-willpower",
  ownLength: 3.29695,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-man-s-best-friend"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3EMfeKtNK4q4k3sVjwg5Yy",
      externalLink: "https://open.spotify.com/track/3EMfeKtNK4q4k3sVjwg5Yy",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "My Man on Willpower",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "mymanonwillpower|74KM79TiuVKeVCqs8QtB0B|197817",
  song: "song/sabrina-carpenter-my-man-on-willpower",
} as const satisfies Track
