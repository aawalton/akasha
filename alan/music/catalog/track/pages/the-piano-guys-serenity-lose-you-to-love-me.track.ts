import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityLoseYouToLoveMe = {
  id: "01a0afa2-09e5-746f-940b-f48fe4f7b88a",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-lose-you-to-love-me",
  ownLength: 4.96355,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0i4RHjmmo6OcGuBYhzhwF4",
      externalLink: "https://open.spotify.com/track/0i4RHjmmo6OcGuBYhzhwF4",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Lose You To Love Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "42kJx1vTbVTE3f78Khiiyn", artistName: "Chuck Myers" },
    { externalId: "2Kmde61lMC5krhNprC9v5F", artistName: "Eric Shumway" },
    { externalId: "3B05AVEBbrBHzXR80NAbSH", artistName: "Rickey Shumway" },
  ],
  trackKey:
    "loseyoutoloveme|0jW6R8CVyVohuUJVcuweDI,2Kmde61lMC5krhNprC9v5F,3B05AVEBbrBHzXR80NAbSH,42kJx1vTbVTE3f78Khiiyn|297813",
  song: "song/the-piano-guys-lose-you-to-love-me",
} as const satisfies Track
