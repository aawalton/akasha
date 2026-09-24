import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMidnightRemixesMidnightHenrikSchwarzRemix = {
  id: "01a0b9ee-f728-7c0f-a765-3a45c3323f55",
  type: "page-type/track",
  slug: "coldplay-midnight-remixes-midnight-henrik-schwarz-remix",
  ownLength: 8.693783333333334,
  ownProgress: 8.693783333333334,
  partOfCollections: ["release/coldplay-midnight-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Midnight - Henrik Schwarz Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "Henrik Schwarz" }],
  trackKey: "midnighthenrikschwarzremix|1ooAqaFu4Ac3BO2HpL4V2R,4gzpq5DPGxSnKTe4SA8HAU|521627",
  song: "song/coldplay-midnight",
  carriedBy: [
    {
      release: "release/coldplay-midnight-remixes",
      discNumber: 1,
      position: 2,
      externalId: "5r2MY01a6rIInRAqXYyh6y",
      externalLink: "https://open.spotify.com/track/5r2MY01a6rIInRAqXYyh6y",
    },
  ],
} as const satisfies Track
