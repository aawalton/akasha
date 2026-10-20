import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaDanceAloneRemixesDanceAloneKitoRemix = {
  id: "01a15994-8c50-7ca8-8890-fdecb5bf0240",
  type: "page-type/track",
  slug: "sia-dance-alone-remixes-dance-alone-kito-remix",
  ownLength: 3.1645166666666666,
  ownProgress: 3.1645166666666666,
  partOfCollections: ["release/sia-dance-alone-remixes", "release/sia-dance-alone-kito-remix"],
  status: "completed",
  unit: "unit/minutes",
  title: "Dance Alone (Kito Remix)",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/sia" }, { artistName: "Kylie Minogue" }, { artistName: "Kito" }],
  trackKey:
    "dancealonekitoremix|3FLUBwpAnaIlIKeaBfsxFe,4RVnAU35WRWra6OZ3CbbMA,5WUlDfRSoLAfcVSX1WnrxN|189871",
  song: "song/sia-dance-alone",
  carriedBy: [
    {
      release: "release/sia-dance-alone-kito-remix",
      discNumber: 1,
      position: 1,
      externalId: "3pPGUUSytWxsBTWpRxV6QC",
      externalLink: "https://open.spotify.com/track/3pPGUUSytWxsBTWpRxV6QC",
    },
    {
      release: "release/sia-dance-alone-remixes",
      discNumber: 1,
      position: 3,
      externalId: "6NHS5ELWakVL2y5tpSfpmK",
      externalLink: "https://open.spotify.com/track/6NHS5ELWakVL2y5tpSfpmK",
    },
  ],
  createdAt: "2026-10-20T13:51:09.878Z",
  updatedAt: "2026-10-20T14:01:17.710Z",
  progressedAt: "2026-10-20T14:01:17.710Z",
} as const satisfies Track
