import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1WorkinMyWayToYou = {
  id: "01a0d52b-52de-70ec-85e8-f2437226d205",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-workin-my-way-to-you",
  ownLength: 3.0120666666666667,
  ownProgress: 3.0120666666666667,
  partOfCollections: [
    "release/rockapella-jams-vol-1",
    "release/rockapella-where-in-the-world-is-carmen-sandiego-ep",
    "release/rockapella-workin-my-way-to-you",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Workin My Way to You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "workinmywaytoyou|1AFSUleuDTapVhm5zUf4ix|180724",
  song: "song/rockapella-workin-my-way-to-you",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 13,
      externalId: "5NLvCwsBTxmHDAgURDP32G",
      externalLink: "https://open.spotify.com/track/5NLvCwsBTxmHDAgURDP32G",
    },
    {
      release: "release/rockapella-where-in-the-world-is-carmen-sandiego-ep",
      discNumber: 1,
      position: 5,
      externalId: "7v2YHezY7svN51vnmkwg5n",
      externalLink: "https://open.spotify.com/track/7v2YHezY7svN51vnmkwg5n",
    },
    {
      release: "release/rockapella-workin-my-way-to-you",
      discNumber: 1,
      position: 1,
      externalId: "2hOpji4m0nkSqdIgxANqfY",
      externalLink: "https://open.spotify.com/track/2hOpji4m0nkSqdIgxANqfY",
    },
  ],
} as const satisfies Track
