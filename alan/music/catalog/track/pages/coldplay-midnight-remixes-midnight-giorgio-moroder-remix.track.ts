import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMidnightRemixesMidnightGiorgioMoroderRemix = {
  id: "01a0b9ee-f749-7695-9bc2-ff9153c9f0fd",
  type: "page-type/track",
  slug: "coldplay-midnight-remixes-midnight-giorgio-moroder-remix",
  ownLength: 8.629083333333334,
  ownProgress: 8.629083333333334,
  partOfCollections: ["release/coldplay-midnight-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Midnight - Giorgio Moroder Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { artist: "artist/coldplay" },
    { artistName: "Geoff Swan" },
    { artistName: "Giorgio Moroder" },
    { artistName: "Spike" },
  ],
  trackKey:
    "midnightgiorgiomoroderremix|4gzpq5DPGxSnKTe4SA8HAU,6RqI7khBhEoxvoarTF71d1,6bCstT28hps6jk7uaROYJA,6jU2Tt13MmXYk0ZBv1KmfO|517745",
  song: "song/coldplay-midnight",
  carriedBy: [
    {
      release: "release/coldplay-midnight-remixes",
      discNumber: 1,
      position: 3,
      externalId: "31swZjlmMrWskTjlkkSVX1",
      externalLink: "https://open.spotify.com/track/31swZjlmMrWskTjlkkSVX1",
    },
  ],
} as const satisfies Track
