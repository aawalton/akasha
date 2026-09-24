import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NewMoonShineShedALittleLight = {
  id: "01a0abeb-3f96-71af-827c-d744977c6fe5",
  type: "page-type/track",
  slug: "james-taylor-2-new-moon-shine-shed-a-little-light",
  ownLength: 3.8688833333333332,
  ownProgress: 3.8688833333333332,
  partOfCollections: ["release/james-taylor-2-new-moon-shine"],
  status: "completed",
  unit: "unit/minutes",
  title: "Shed a Little Light",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "shedalittlelight|0vn7UBvSQECKJm2817Yf1P|232133",
  song: "song/james-taylor-shed-a-little-light",
  carriedBy: [
    {
      release: "release/james-taylor-2-new-moon-shine",
      discNumber: 1,
      position: 4,
      externalId: "6HEuDvRMsTTL0ttclm5MiB",
      externalLink: "https://open.spotify.com/track/6HEuDvRMsTTL0ttclm5MiB",
    },
  ],
} as const satisfies Track
