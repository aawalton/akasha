import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixPtxVol1WeAreYoung = {
  id: "01a1546f-24fd-7a4f-b845-351391051e99",
  type: "page-type/track",
  slug: "pentatonix-ptx-vol-1-we-are-young",
  ownLength: 3.1169166666666666,
  ownProgress: 3.1169166666666666,
  partOfCollections: ["release/pentatonix-ptx-vol-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "We Are Young",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "weareyoung|26AHtbjWKiwYzsoGoUZq53|187015",
  song: "song/pentatonix-we-are-young",
  carriedBy: [
    {
      release: "release/pentatonix-ptx-vol-1",
      discNumber: 1,
      position: 7,
      externalId: "5mMoySkxdUWlTw6X2l4egi",
      externalLink: "https://open.spotify.com/track/5mMoySkxdUWlTw6X2l4egi",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T14:01:21.162Z",
  progressedAt: "2026-10-19T14:01:21.162Z",
} as const satisfies Track
