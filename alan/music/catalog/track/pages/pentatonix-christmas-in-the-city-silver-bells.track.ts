import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixChristmasInTheCitySilverBells = {
  id: "01a1546f-24f5-70ad-abed-fac7ed60516d",
  type: "page-type/track",
  slug: "pentatonix-christmas-in-the-city-silver-bells",
  ownLength: 3.319916666666667,
  ownProgress: 3.319916666666667,
  partOfCollections: ["release/pentatonix-christmas-in-the-city"],
  status: "completed",
  unit: "unit/minutes",
  title: "Silver Bells",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "silverbells|26AHtbjWKiwYzsoGoUZq53|199195",
  song: "song/pentatonix-silver-bells",
  carriedBy: [
    {
      release: "release/pentatonix-christmas-in-the-city",
      discNumber: 1,
      position: 10,
      externalId: "3WcHA575wLGxprWCfQ27sK",
      externalLink: "https://open.spotify.com/track/3WcHA575wLGxprWCfQ27sK",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T14:01:21.162Z",
  progressedAt: "2026-10-19T14:01:21.162Z",
} as const satisfies Track
