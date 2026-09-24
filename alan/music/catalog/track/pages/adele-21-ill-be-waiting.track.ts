import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele21IllBeWaiting = {
  id: "01a0d52b-c25a-73e9-910f-7b1b31d19517",
  type: "page-type/track",
  slug: "adele-21-ill-be-waiting",
  ownLength: 4.022516666666666,
  ownProgress: 0,
  partOfCollections: ["release/adele-21"],
  status: "not-started",
  unit: "unit/minutes",
  title: "I'll Be Waiting",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "illbewaiting|4dpARuHxo51G3z768sgnrY|241351",
  song: "song/adele-ill-be-waiting",
  carriedBy: [
    {
      release: "release/adele-21",
      discNumber: 1,
      position: 8,
      externalId: "5AKAyMEL5LqCkafztPdBSI",
      externalLink: "https://open.spotify.com/track/5AKAyMEL5LqCkafztPdBSI",
    },
  ],
} as const satisfies Track
