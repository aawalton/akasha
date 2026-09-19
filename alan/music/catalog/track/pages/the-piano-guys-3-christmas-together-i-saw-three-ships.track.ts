import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChristmasTogetherISawThreeShips = {
  id: "01a0afa2-10e9-71f3-9694-8a9ec843d01e",
  type: "page-type/track",
  slug: "the-piano-guys-3-christmas-together-i-saw-three-ships",
  ownLength: 2.701033333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-christmas-together"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "78nKXeLoOWkuCDVEGTLLFs",
      externalLink: "https://open.spotify.com/track/78nKXeLoOWkuCDVEGTLLFs",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "I Saw Three Ships",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "isawthreeships|0jW6R8CVyVohuUJVcuweDI|162062",
  song: "song/the-piano-guys-i-saw-three-ships",
} as const satisfies Track
