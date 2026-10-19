import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixTheLuckyOnes2TheLuckyOnes = {
  id: "01a1546f-2500-7766-92b7-d2071a792428",
  type: "page-type/track",
  slug: "pentatonix-the-lucky-ones-2-the-lucky-ones",
  ownLength: 3.1828,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-the-lucky-ones-2", "release/pentatonix-the-lucky-ones"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Lucky Ones",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "theluckyones|26AHtbjWKiwYzsoGoUZq53|190968",
  song: "song/pentatonix-the-lucky-ones",
  carriedBy: [
    {
      release: "release/pentatonix-the-lucky-ones",
      discNumber: 1,
      position: 1,
      externalId: "0TTgxsnxlokIfNlVYm323b",
      externalLink: "https://open.spotify.com/track/0TTgxsnxlokIfNlVYm323b",
    },
    {
      release: "release/pentatonix-the-lucky-ones-2",
      discNumber: 1,
      position: 11,
      externalId: "4SkB0VRqQRadilDld97XCj",
      externalLink: "https://open.spotify.com/track/4SkB0VRqQRadilDld97XCj",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
