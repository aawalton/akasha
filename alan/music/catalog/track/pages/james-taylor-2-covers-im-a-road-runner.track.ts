import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversImARoadRunner = {
  id: "01a0abeb-33d6-7aec-b9c2-7d32b178126a",
  type: "page-type/track",
  slug: "james-taylor-2-covers-im-a-road-runner",
  ownLength: 3.2931,
  ownProgress: 3.2931,
  partOfCollections: ["release/james-taylor-2-covers"],
  status: "completed",
  unit: "unit/minutes",
  title: "(I'm A) Road Runner",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "imaroadrunner|0vn7UBvSQECKJm2817Yf1P|197586",
  song: "song/james-taylor-im-a-road-runner",
  carriedBy: [
    {
      release: "release/james-taylor-2-covers",
      discNumber: 1,
      position: 2,
      externalId: "1WhUsyBScyAZBLL9FHVKfG",
      externalLink: "https://open.spotify.com/track/1WhUsyBScyAZBLL9FHVKfG",
    },
  ],
} as const satisfies Track
