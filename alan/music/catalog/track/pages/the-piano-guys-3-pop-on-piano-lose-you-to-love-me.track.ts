import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3PopOnPianoLoseYouToLoveMe = {
  id: "01a0afa1-ce40-7396-a1c2-3556aee705e4",
  type: "page-type/track",
  slug: "the-piano-guys-3-pop-on-piano-lose-you-to-love-me",
  ownLength: 4.963633333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-pop-on-piano"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Lw00ZkPlcvclWykdkbG1V",
      externalLink: "https://open.spotify.com/track/3Lw00ZkPlcvclWykdkbG1V",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Lose You To Love Me",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "loseyoutoloveme|0jW6R8CVyVohuUJVcuweDI|297818",
  song: "song/the-piano-guys-lose-you-to-love-me",
} as const satisfies Track
