import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversWichitaLineman = {
  id: "01a0abeb-33f4-757f-b34d-a12706cda5e5",
  type: "page-type/track",
  slug: "james-taylor-2-covers-wichita-lineman",
  ownLength: 3.6871,
  ownProgress: 3.6871,
  partOfCollections: ["release/james-taylor-2-covers"],
  status: "completed",
  unit: "unit/minutes",
  title: "Wichita Lineman",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "wichitalineman|0vn7UBvSQECKJm2817Yf1P|221226",
  song: "song/james-taylor-wichita-lineman",
  carriedBy: [
    {
      release: "release/james-taylor-2-covers",
      discNumber: 1,
      position: 3,
      externalId: "368v5JTGPeCAUtqoyZyBRY",
      externalLink: "https://open.spotify.com/track/368v5JTGPeCAUtqoyZyBRY",
    },
  ],
} as const satisfies Track
