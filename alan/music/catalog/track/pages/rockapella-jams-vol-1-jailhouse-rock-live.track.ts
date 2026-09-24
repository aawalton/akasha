import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1JailhouseRockLive = {
  id: "01a0d52b-52dd-7445-893d-55c3391d5d0b",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-jailhouse-rock-live",
  ownLength: 2.1322666666666668,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-jams-vol-1"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Jailhouse Rock (Live)",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "jailhouserocklive|1AFSUleuDTapVhm5zUf4ix|127936",
  song: "song/rockapella-jailhouse-rock",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 16,
      externalId: "3UsJvxk86fgpAAQJ0mpcAe",
      externalLink: "https://open.spotify.com/track/3UsJvxk86fgpAAQJ0mpcAe",
    },
  ],
} as const satisfies Track
