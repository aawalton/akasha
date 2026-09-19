import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpenDarlingImAMess = {
  id: "01a0b111-297c-771a-b46b-23b9749b818b",
  type: "page-type/track",
  slug: "sabrina-carpenter-eyes-wide-open-darling-im-a-mess",
  ownLength: 2.9842166666666667,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-eyes-wide-open"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6rdKHwxWa9aqWyoGf1r20v",
      externalLink: "https://open.spotify.com/track/6rdKHwxWa9aqWyoGf1r20v",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Darling I'm a Mess",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "darlingimamess|74KM79TiuVKeVCqs8QtB0B|179053",
  song: "song/sabrina-carpenter-darling-im-a-mess",
} as const satisfies Track
