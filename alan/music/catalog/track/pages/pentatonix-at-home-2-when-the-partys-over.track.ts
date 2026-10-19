import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixAtHome2WhenThePartysOver = {
  id: "01a1546f-24f4-79a6-b3dc-85086364ca3d",
  type: "page-type/track",
  slug: "pentatonix-at-home-2-when-the-partys-over",
  ownLength: 3.1866166666666667,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-at-home-2", "release/pentatonix-at-home"],
  status: "not-started",
  unit: "unit/minutes",
  title: "when the party's over",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "whenthepartysover|26AHtbjWKiwYzsoGoUZq53|191197",
  song: "song/pentatonix-when-the-partys-over",
  carriedBy: [
    {
      release: "release/pentatonix-at-home",
      discNumber: 1,
      position: 3,
      externalId: "7H65YhSRqhuqagPlBwxNWp",
      externalLink: "https://open.spotify.com/track/7H65YhSRqhuqagPlBwxNWp",
    },
    {
      release: "release/pentatonix-at-home-2",
      discNumber: 1,
      position: 3,
      externalId: "0cWPcmNWz9Op5JXNKIoMUC",
      externalLink: "https://open.spotify.com/track/0cWPcmNWz9Op5JXNKIoMUC",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
