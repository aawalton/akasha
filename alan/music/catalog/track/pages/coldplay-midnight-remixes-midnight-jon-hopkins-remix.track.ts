import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMidnightRemixesMidnightJonHopkinsRemix = {
  id: "01a0b9ee-f76c-7ff3-89fe-50654505c532",
  type: "page-type/track",
  slug: "coldplay-midnight-remixes-midnight-jon-hopkins-remix",
  ownLength: 10.09565,
  ownProgress: 10.09565,
  partOfCollections: ["release/coldplay-midnight-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Midnight - Jon Hopkins Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "Jon Hopkins" }],
  trackKey: "midnightjonhopkinsremix|4gzpq5DPGxSnKTe4SA8HAU,7yxi31szvlbwvKq9dYOmFI|605739",
  song: "song/coldplay-midnight",
  carriedBy: [
    {
      release: "release/coldplay-midnight-remixes",
      discNumber: 1,
      position: 4,
      externalId: "5PKa9j9Fqmu2qQZMCQxN0w",
      externalLink: "https://open.spotify.com/track/5PKa9j9Fqmu2qQZMCQxN0w",
    },
  ],
} as const satisfies Track
