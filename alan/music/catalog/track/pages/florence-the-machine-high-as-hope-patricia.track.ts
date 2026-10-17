import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineHighAsHopePatricia = {
  id: "01a14a1f-5931-7d57-99ce-ea77933d998d",
  type: "page-type/track",
  slug: "florence-the-machine-high-as-hope-patricia",
  ownLength: 3.62355,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-high-as-hope"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Patricia",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/florence-the-machine" }],
  trackKey: "patricia|1moxjboGR7GNWYIMWsRjgG|217413",
  song: "song/florence-the-machine-patricia",
  carriedBy: [
    {
      release: "release/florence-the-machine-high-as-hope",
      discNumber: 1,
      position: 7,
      externalId: "6nmr64Mo4RD3R1pLshvmoG",
      externalLink: "https://open.spotify.com/track/6nmr64Mo4RD3R1pLshvmoG",
    },
  ],
  createdAt: "2026-10-17T13:48:50.850Z",
  updatedAt: "2026-10-17T13:48:50.850Z",
} as const satisfies Track
