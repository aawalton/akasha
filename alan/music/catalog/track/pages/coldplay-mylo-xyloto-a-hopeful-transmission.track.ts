import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoAHopefulTransmission = {
  id: "01a0b9ee-ddd5-7522-94db-04f89cb75981",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-a-hopeful-transmission",
  ownLength: 0.55,
  ownProgress: 0.55,
  partOfCollections: ["release/coldplay-mylo-xyloto"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Hopeful Transmission",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "ahopefultransmission|4gzpq5DPGxSnKTe4SA8HAU|33000",
  song: "song/coldplay-a-hopeful-transmission",
  carriedBy: [
    {
      release: "release/coldplay-mylo-xyloto",
      discNumber: 1,
      position: 12,
      externalId: "6n1x3DYFDpRau83XsI32NU",
      externalLink: "https://open.spotify.com/track/6n1x3DYFDpRau83XsI32NU",
    },
  ],
} as const satisfies Track
