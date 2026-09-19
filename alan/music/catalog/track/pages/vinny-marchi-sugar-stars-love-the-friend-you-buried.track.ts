import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsLoveTheFriendYouBuried = {
  id: "01a0b112-93c3-74fb-bf1c-c75f2f356895",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-love-the-friend-you-buried",
  ownLength: 3.3124666666666664,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3RjCKCctSwmabMFIjP1Eqk",
      externalLink: "https://open.spotify.com/track/3RjCKCctSwmabMFIjP1Eqk",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "love, the friend you buried",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "lovethefriendyouburied|5USAMqcbMAzF3HBmeD5pJF|198748",
  song: "song/vinny-marchi-love-the-friend-you-buried",
} as const satisfies Track
