import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreAndTheHoundRepriseAndTheHoundReprise = {
  id: "01a0ce87-1458-793f-8926-cc17d0cdb75d",
  type: "page-type/track",
  slug: "yaelokre-and-the-hound-reprise-and-the-hound-reprise",
  ownLength: 2.27805,
  ownProgress: 0,
  partOfCollections: ["release/yaelokre-and-the-hound-reprise"],
  status: "not-started",
  unit: "unit/minutes",
  title: "And the Hound - Reprise",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3rRyfgGByetsaaujkjQ7rY", artistName: "Yaelokre" }],
  trackKey: "andthehoundreprise|3rRyfgGByetsaaujkjQ7rY|136683",
  song: "song/yaelokre-and-the-hound",
  carriedBy: [
    {
      release: "release/yaelokre-and-the-hound-reprise",
      discNumber: 1,
      position: 1,
      externalId: "04SHKIDLsuB8QGCX6rXbU0",
      externalLink: "https://open.spotify.com/track/04SHKIDLsuB8QGCX6rXbU0",
    },
  ],
} as const satisfies Track
