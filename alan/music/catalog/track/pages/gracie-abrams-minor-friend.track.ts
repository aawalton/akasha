import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const gracieAbramsMinorFriend = {
  id: "01a13fd8-9f1f-776c-89cc-e1641fca6d78",
  type: "page-type/track",
  slug: "gracie-abrams-minor-friend",
  ownLength: 2.9491,
  ownProgress: 2.9491,
  partOfCollections: ["release/gracie-abrams-minor"],
  status: "completed",
  unit: "unit/minutes",
  title: "Friend",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/gracie-abrams" }],
  trackKey: "friend|4tuJ0bMpJh08umKkEXKUI5|176946",
  song: "song/gracie-abrams-friend",
  carriedBy: [
    {
      release: "release/gracie-abrams-minor",
      discNumber: 1,
      position: 1,
      externalId: "6fGSHpEipD1YjtLLChnBzW",
      externalLink: "https://open.spotify.com/track/6fGSHpEipD1YjtLLChnBzW",
    },
  ],
  createdAt: "2026-10-15T13:55:23.541Z",
  updatedAt: "2026-10-15T14:00:29.023Z",
} as const satisfies Track
