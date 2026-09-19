import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtBartendersBlues = {
  id: "01a0abeb-4658-735a-a1bb-8e9917826531",
  type: "page-type/track",
  slug: "james-taylor-2-jt-bartenders-blues",
  ownLength: 4.207466666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-jt"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Pm0IxpzPNGF9O6fvYyP2q",
      externalLink: "https://open.spotify.com/track/1Pm0IxpzPNGF9O6fvYyP2q",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Bartender's Blues",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "bartendersblues|0vn7UBvSQECKJm2817Yf1P|252448",
  song: "song/james-taylor-bartenders-blues",
} as const satisfies Track
