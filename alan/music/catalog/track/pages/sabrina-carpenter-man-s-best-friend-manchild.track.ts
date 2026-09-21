import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterManSBestFriendManchild = {
  id: "01a0b111-1b3b-7914-8d25-ed6d77448b3d",
  type: "page-type/track",
  slug: "sabrina-carpenter-man-s-best-friend-manchild",
  ownLength: 3.56075,
  ownProgress: 3.56075,
  partOfCollections: [
    "release/sabrina-carpenter-man-s-best-friend",
    "release/sabrina-carpenter-manchild",
    "release/sabrina-carpenter-mans-best-friend-bonus-track-version",
  ],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2BwO5K8Q7EPAJSGze3AAh9",
      externalLink: "https://open.spotify.com/track/2BwO5K8Q7EPAJSGze3AAh9",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Manchild",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "manchild|74KM79TiuVKeVCqs8QtB0B|213645",
  song: "song/sabrina-carpenter-manchild",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-man-s-best-friend",
      discNumber: 1,
      position: 1,
      externalId: "2BwO5K8Q7EPAJSGze3AAh9",
      externalLink: "https://open.spotify.com/track/2BwO5K8Q7EPAJSGze3AAh9",
    },
    {
      release: "release/sabrina-carpenter-manchild",
      discNumber: 1,
      position: 1,
      externalId: "42UBPzRMh5yyz0EDPr6fr1",
      externalLink: "https://open.spotify.com/track/42UBPzRMh5yyz0EDPr6fr1",
    },
    {
      release: "release/sabrina-carpenter-mans-best-friend-bonus-track-version",
      discNumber: 1,
      position: 1,
      externalId: "2drFqkshUs2oyuNIKyqbRK",
      externalLink: "https://open.spotify.com/track/2drFqkshUs2oyuNIKyqbRK",
    },
  ],
} as const satisfies Track
