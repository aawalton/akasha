import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineLungsBirdSong = {
  id: "01a14a1f-5935-7436-b568-9e9859520e06",
  type: "page-type/track",
  slug: "florence-the-machine-lungs-bird-song",
  ownLength: 2.926,
  ownProgress: 2.926,
  partOfCollections: ["release/florence-the-machine-lungs"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bird Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/florence-the-machine" }],
  trackKey: "birdsong|1moxjboGR7GNWYIMWsRjgG|175560",
  song: "song/florence-the-machine-bird-song",
  carriedBy: [
    {
      release: "release/florence-the-machine-lungs",
      discNumber: 2,
      position: 2,
      externalId: "1XbrnMyEFOZxaMwplryTQ8",
      externalLink: "https://open.spotify.com/track/1XbrnMyEFOZxaMwplryTQ8",
    },
  ],
  createdAt: "2026-10-17T13:48:50.850Z",
  updatedAt: "2026-10-17T14:00:54.619Z",
} as const satisfies Track
