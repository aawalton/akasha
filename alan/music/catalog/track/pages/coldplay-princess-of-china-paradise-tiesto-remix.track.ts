import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayPrincessOfChinaParadiseTiestoRemix = {
  id: "01a0b9ee-f868-71a0-954e-3f06c4dc03cb",
  type: "page-type/track",
  slug: "coldplay-princess-of-china-paradise-tiesto-remix",
  ownLength: 4.772433333333334,
  ownProgress: 4.772433333333334,
  partOfCollections: ["release/coldplay-princess-of-china"],
  status: "completed",
  unit: "unit/minutes",
  title: "Paradise - Tiësto Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "Tiësto" }],
  trackKey: "paradisetiestoremix|2o5jDhtHVPhrJdv3cEQ99Z,4gzpq5DPGxSnKTe4SA8HAU|286346",
  song: "song/coldplay-paradise",
  carriedBy: [
    {
      release: "release/coldplay-princess-of-china",
      discNumber: 1,
      position: 3,
      externalId: "0pjMTISKHTJkogN1BPZxaC",
      externalLink: "https://open.spotify.com/track/0pjMTISKHTJkogN1BPZxaC",
    },
  ],
} as const satisfies Track
