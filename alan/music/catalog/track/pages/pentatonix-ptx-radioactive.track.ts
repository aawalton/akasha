import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixPtxRadioactive = {
  id: "01a1546f-24fc-7863-8a45-605acec4bd40",
  type: "page-type/track",
  slug: "pentatonix-ptx-radioactive",
  ownLength: 3.774,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-ptx"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Radioactive",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }, { artist: "artist/lindsey-stirling" }],
  trackKey: "radioactive|26AHtbjWKiwYzsoGoUZq53,378dH6EszOLFShpRzAQkVM|226440",
  song: "song/pentatonix-radioactive",
  carriedBy: [
    {
      release: "release/pentatonix-ptx",
      discNumber: 1,
      position: 17,
      externalId: "7dJGehjbhJvs3K4fWwYTW1",
      externalLink: "https://open.spotify.com/track/7dJGehjbhJvs3K4fWwYTW1",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
