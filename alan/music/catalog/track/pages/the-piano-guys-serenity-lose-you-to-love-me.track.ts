import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityLoseYouToLoveMe = {
  id: "01a0afa2-09e5-746f-940b-f48fe4f7b88a",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-lose-you-to-love-me",
  ownLength: 4.96355,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Lose You To Love Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artist: "artist/the-piano-guys" },
    { artistName: "Chuck Myers" },
    { artistName: "Eric Shumway" },
    { artistName: "Rickey Shumway" },
  ],
  trackKey:
    "loseyoutoloveme|0jW6R8CVyVohuUJVcuweDI,2Kmde61lMC5krhNprC9v5F,3B05AVEBbrBHzXR80NAbSH,42kJx1vTbVTE3f78Khiiyn|297813",
  song: "song/the-piano-guys-lose-you-to-love-me",
  carriedBy: [
    {
      release: "release/the-piano-guys-serenity",
      discNumber: 1,
      position: 13,
      externalId: "0i4RHjmmo6OcGuBYhzhwF4",
      externalLink: "https://open.spotify.com/track/0i4RHjmmo6OcGuBYhzhwF4",
    },
  ],
} as const satisfies Track
