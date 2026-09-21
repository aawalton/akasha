import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsOnTopOfTheWorld = {
  id: "01a0c43f-d4f8-79ca-adb8-60b5480c452d",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-on-top-of-the-world",
  ownLength: 3.164,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-night-visions"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Qj1WXW41Mn3Fh9V2sHphM",
      externalLink: "https://open.spotify.com/track/6Qj1WXW41Mn3Fh9V2sHphM",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "On Top Of The World",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "ontopoftheworld|53XhwfbYqKCa1cC15pYq2q|189840",
  song: "song/imagine-dragons-on-top-of-the-world",
} as const satisfies Track
