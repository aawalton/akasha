import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixAtHome2BreakMyHeart = {
  id: "01a1546f-24f3-737b-8b75-6b7805c0e9af",
  type: "page-type/track",
  slug: "pentatonix-at-home-2-break-my-heart",
  ownLength: 3.6418166666666667,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-at-home-2", "release/pentatonix-at-home"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Break My Heart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "breakmyheart|26AHtbjWKiwYzsoGoUZq53|218509",
  song: "song/pentatonix-break-my-heart",
  carriedBy: [
    {
      release: "release/pentatonix-at-home",
      discNumber: 1,
      position: 4,
      externalId: "4l1scKvNopAhTFFL6FHQ2H",
      externalLink: "https://open.spotify.com/track/4l1scKvNopAhTFFL6FHQ2H",
    },
    {
      release: "release/pentatonix-at-home-2",
      discNumber: 1,
      position: 4,
      externalId: "3mYuiO7dq6hfWk7wPG6LXF",
      externalLink: "https://open.spotify.com/track/3mYuiO7dq6hfWk7wPG6LXF",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
