import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaFlamesFlames = {
  id: "01a15994-8c56-792c-98e6-948ee6ae154d",
  type: "page-type/track",
  slug: "sia-flames-flames",
  ownLength: 3.25,
  ownProgress: 3.25,
  partOfCollections: ["release/sia-flames"],
  status: "completed",
  unit: "unit/minutes",
  title: "Flames",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "David Guetta" }, { artist: "artist/sia" }],
  trackKey: "flames|1Cs0zKBU1kc0i8ypK3B9ai,5WUlDfRSoLAfcVSX1WnrxN|195000",
  song: "song/sia-flames",
  carriedBy: [
    {
      release: "release/sia-flames",
      discNumber: 1,
      position: 1,
      externalId: "33IOhptvC2Qoy2UhjiHXLV",
      externalLink: "https://open.spotify.com/track/33IOhptvC2Qoy2UhjiHXLV",
    },
  ],
  createdAt: "2026-10-20T13:51:09.878Z",
  updatedAt: "2026-10-20T14:01:17.710Z",
  progressedAt: "2026-10-20T14:01:17.710Z",
} as const satisfies Track
