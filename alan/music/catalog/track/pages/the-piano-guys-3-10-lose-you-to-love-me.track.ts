import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310LoseYouToLoveMe = {
  id: "01a0afa2-0af2-743d-ba1d-a827130bf826",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-lose-you-to-love-me",
  ownLength: 4.963633333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3o1FeZiMPHD8E0LwLKLh3d",
      externalLink: "https://open.spotify.com/track/3o1FeZiMPHD8E0LwLKLh3d",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Lose You To Love Me",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "42kJx1vTbVTE3f78Khiiyn", artistName: "Chuck Myers" },
    { externalId: "2Kmde61lMC5krhNprC9v5F", artistName: "Eric Shumway" },
    { externalId: "3B05AVEBbrBHzXR80NAbSH", artistName: "Rickey Shumway" },
  ],
  trackKey:
    "loseyoutoloveme|0jW6R8CVyVohuUJVcuweDI,2Kmde61lMC5krhNprC9v5F,3B05AVEBbrBHzXR80NAbSH,42kJx1vTbVTE3f78Khiiyn|297818",
  song: "song/the-piano-guys-lose-you-to-love-me",
} as const satisfies Track
