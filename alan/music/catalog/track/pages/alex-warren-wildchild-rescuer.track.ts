import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexWarrenWildchildRescuer = {
  id: "01a144f7-5600-72f2-bff6-8167adc38a6c",
  type: "page-type/track",
  slug: "alex-warren-wildchild-rescuer",
  ownLength: 3.3194333333333335,
  ownProgress: 0,
  partOfCollections: ["release/alex-warren-wildchild", "release/alex-warren-rescuer"],
  status: "not-started",
  unit: "unit/minutes",
  title: "RESCUER",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/alex-warren" }],
  trackKey: "rescuer|0fTSzq9jAh4c36UVb4V7CB|199166",
  song: "song/alex-warren-rescuer",
  carriedBy: [
    {
      release: "release/alex-warren-rescuer",
      discNumber: 1,
      position: 1,
      externalId: "19Lnk1Q2FJcB3Hia0wfgye",
      externalLink: "https://open.spotify.com/track/19Lnk1Q2FJcB3Hia0wfgye",
    },
    {
      release: "release/alex-warren-wildchild",
      discNumber: 1,
      position: 4,
      externalId: "5QccUp5xZ4pp9cZOHnZJLU",
      externalLink: "https://open.spotify.com/track/5QccUp5xZ4pp9cZOHnZJLU",
    },
  ],
  createdAt: "2026-10-16T13:47:02.519Z",
  updatedAt: "2026-10-16T13:47:02.519Z",
} as const satisfies Track
