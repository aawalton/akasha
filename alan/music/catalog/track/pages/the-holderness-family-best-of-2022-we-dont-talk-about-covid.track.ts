import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOf2022WeDontTalkAboutCovid = {
  id: "01a0b4c6-c7de-7c8d-a242-91a8fa769869",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-2022-we-dont-talk-about-covid",
  ownLength: 2.6676,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-2022"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6yUhwwpbfWAYRxBJLEuzNt",
      externalLink: "https://open.spotify.com/track/6yUhwwpbfWAYRxBJLEuzNt",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "We Don't Talk About COVID",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "wedonttalkaboutcovid|6tITG4T8LpC0msapZ4wXGA|160056",
  song: "song/the-holderness-family-we-dont-talk-about-covid",
} as const satisfies Track
