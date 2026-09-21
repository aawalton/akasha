import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsBelieverFeatLilWayneBelieverFeatLilWayne = {
  id: "01a0c43f-dc69-7fdd-88eb-ce018fc8307e",
  type: "page-type/track",
  slug: "imagine-dragons-believer-feat-lil-wayne-believer-feat-lil-wayne",
  ownLength: 3.66175,
  ownProgress: 3.66175,
  partOfCollections: ["release/imagine-dragons-believer-feat-lil-wayne"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2sU9EjevkrU9OkPZudvFNN",
      externalLink: "https://open.spotify.com/track/2sU9EjevkrU9OkPZudvFNN",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Believer (feat. Lil Wayne)",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" },
    { externalId: "55Aa2cqylxrFIXC767Z865", artistName: "Lil Wayne" },
  ],
  trackKey: "believerfeatlilwayne|53XhwfbYqKCa1cC15pYq2q,55Aa2cqylxrFIXC767Z865|219705",
  song: "song/imagine-dragons-believer",
  carriedBy: [
    {
      release: "release/imagine-dragons-believer-feat-lil-wayne",
      discNumber: 1,
      position: 1,
      externalId: "2sU9EjevkrU9OkPZudvFNN",
      externalLink: "https://open.spotify.com/track/2sU9EjevkrU9OkPZudvFNN",
    },
  ],
} as const satisfies Track
