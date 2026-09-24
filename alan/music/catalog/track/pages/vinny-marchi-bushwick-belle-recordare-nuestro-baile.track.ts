import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBushwickBelleRecordareNuestroBaile = {
  id: "01a0b112-8ee7-7f4d-a90d-fb543c7c986c",
  type: "page-type/track",
  slug: "vinny-marchi-bushwick-belle-recordare-nuestro-baile",
  ownLength: 3.66865,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-bushwick-belle"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Recordaré Nuestro Baile",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "recordarenuestrobaile|5USAMqcbMAzF3HBmeD5pJF|220119",
  song: "song/vinny-marchi-recordare-nuestro-baile",
  carriedBy: [
    {
      release: "release/vinny-marchi-bushwick-belle",
      discNumber: 1,
      position: 3,
      externalId: "28zGfJ9GZpOjCTpvbO0gry",
      externalLink: "https://open.spotify.com/track/28zGfJ9GZpOjCTpvbO0gry",
    },
  ],
} as const satisfies Track
