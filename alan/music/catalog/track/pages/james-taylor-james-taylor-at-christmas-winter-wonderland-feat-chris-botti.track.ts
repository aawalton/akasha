import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylorJamesTaylorAtChristmasWinterWonderlandFeatChrisBotti = {
  id: "01a0abeb-2c3a-71b5-9406-e80277f01fa5",
  type: "page-type/track",
  slug: "james-taylor-james-taylor-at-christmas-winter-wonderland-feat-chris-botti",
  ownLength: 3.5637666666666665,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-james-taylor-at-christmas"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5lShdVp1NzcR6xu1Pl3Oc6",
      externalLink: "https://open.spotify.com/track/5lShdVp1NzcR6xu1Pl3Oc6",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Winter Wonderland (feat. Chris Botti)",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" },
    { externalId: "3eFo5fMv53RYZBYlvT5Z6a", artistName: "Chris Botti" },
  ],
  trackKey: "winterwonderlandfeatchrisbotti|0vn7UBvSQECKJm2817Yf1P,3eFo5fMv53RYZBYlvT5Z6a|213826",
  song: "song/james-taylor-winter-wonderland",
} as const satisfies Track
