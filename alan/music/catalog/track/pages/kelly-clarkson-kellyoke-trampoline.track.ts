import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonKellyokeTrampoline = {
  id: "01a14f45-0238-7cd0-8317-146cab120137",
  type: "page-type/track",
  slug: "kelly-clarkson-kellyoke-trampoline",
  ownLength: 2.7570166666666664,
  ownProgress: 2.7570166666666664,
  partOfCollections: ["release/kelly-clarkson-kellyoke"],
  status: "completed",
  unit: "unit/minutes",
  title: "Trampoline",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "trampoline|3BmGtnKgCSGYIUhmivXKWX|165421",
  song: "song/kelly-clarkson-trampoline",
  carriedBy: [
    {
      release: "release/kelly-clarkson-kellyoke",
      discNumber: 1,
      position: 5,
      externalId: "7vG5fceEG1ZhMqa0uk1OgW",
      externalLink: "https://open.spotify.com/track/7vG5fceEG1ZhMqa0uk1OgW",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
