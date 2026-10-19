import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixAtHome2Home = {
  id: "01a1546f-24f4-74dd-8bd9-c71a954e3bb1",
  type: "page-type/track",
  slug: "pentatonix-at-home-2-home",
  ownLength: 2.5100333333333333,
  ownProgress: 2.5100333333333333,
  partOfCollections: ["release/pentatonix-at-home-2", "release/pentatonix-at-home"],
  status: "completed",
  unit: "unit/minutes",
  title: "Home",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "home|26AHtbjWKiwYzsoGoUZq53|150602",
  song: "song/pentatonix-home",
  carriedBy: [
    {
      release: "release/pentatonix-at-home",
      discNumber: 1,
      position: 1,
      externalId: "0H57PuLoLHpFgzK5dsU3zl",
      externalLink: "https://open.spotify.com/track/0H57PuLoLHpFgzK5dsU3zl",
    },
    {
      release: "release/pentatonix-at-home-2",
      discNumber: 1,
      position: 1,
      externalId: "5GI96fTs0xkKXfgShNn975",
      externalLink: "https://open.spotify.com/track/5GI96fTs0xkKXfgShNn975",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T14:01:21.162Z",
  progressedAt: "2026-10-19T14:01:21.162Z",
} as const satisfies Track
