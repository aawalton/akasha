import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraMusicForTheFellowWitchesOutThereChurchyard = {
  id: "01a0b638-0a1b-7e7e-8993-15ea31ea6d3c",
  type: "page-type/track",
  slug: "aurora-music-for-the-fellow-witches-out-there-churchyard",
  ownLength: 3.7668166666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-music-for-the-fellow-witches-out-there"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7ljXAnmjdO9MsUnF5PBf7F",
      externalLink: "https://open.spotify.com/track/7ljXAnmjdO9MsUnF5PBf7F",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Churchyard",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "churchyard|1WgXqy2Dd70QQOU7Ay074N|226009",
  song: "song/aurora-churchyard",
} as const satisfies Track
