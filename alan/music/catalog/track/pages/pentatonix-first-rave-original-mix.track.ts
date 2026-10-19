import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixFirstRaveOriginalMix = {
  id: "01a1546f-24f8-7565-a7b9-0de533ed1c35",
  type: "page-type/track",
  slug: "pentatonix-first-rave-original-mix",
  ownLength: 4.375,
  ownProgress: 4.375,
  partOfCollections: ["release/pentatonix-first"],
  status: "completed",
  unit: "unit/minutes",
  title: "Rave (Original Mix)",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artistName: "Lincoln Ehlert" }],
  trackKey: "raveoriginalmix|1j62Em4xZKPlhPK3enfvWa|262500",
  song: "song/pentatonix-rave",
  carriedBy: [
    {
      release: "release/pentatonix-first",
      discNumber: 1,
      position: 3,
      externalId: "26nkKPpzDSC33TDpBv7Z9T",
      externalLink: "https://open.spotify.com/track/26nkKPpzDSC33TDpBv7Z9T",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T14:01:21.162Z",
  progressedAt: "2026-10-19T14:01:21.162Z",
} as const satisfies Track
