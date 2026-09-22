import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappEverythingToEveryoneDeluxeBruises = {
  id: "01a0caa9-0fd0-7225-9683-70d5228118db",
  type: "page-type/track",
  slug: "renee-rapp-everything-to-everyone-deluxe-bruises",
  ownLength: 2.69115,
  ownProgress: 2.69115,
  partOfCollections: ["release/renee-rapp-everything-to-everyone-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bruises",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "bruises|2hUYKu1x0UZQXvzCmggvSn|161469",
  song: "song/renee-rapp-bruises",
  carriedBy: [
    {
      release: "release/renee-rapp-everything-to-everyone-deluxe",
      discNumber: 1,
      position: 8,
      externalId: "5kUqU9uLc98ndpJiqieN8K",
      externalLink: "https://open.spotify.com/track/5kUqU9uLc98ndpJiqieN8K",
    },
  ],
} as const satisfies Track
