import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const eppieSpotifyCleanup = {
  id: "01a090fb-cdee-7e42-9dc4-823acf3d43f9",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "eppie-spotify-cleanup",
  domain: "domain/spotify",
  persona: "eppie",
  intents: [
    {
      statement: "Consent asks for no scope the spotify domain never uses.",
      workingMemory:
        "`SPOTIFY_SCOPES` names sixteen. Five are never exercised: `playlist-modify-public`, `playlist-modify-private`, `user-library-modify`, `user-follow-modify` and `ugc-image-upload`. The domain reads the player, search, one track and the top items, and commands the player; it writes no playlist, saves no track, follows no artist and uploads no image. Dropping a scope means asking Alan for consent again, so this waits on the next consent rather than calling for one.",
    },
    {
      statement: "Spotify's cache folder carries no `collections` in its name.",
      workingMemory:
        "`spotify-cache-file` states the folder is `~/.cache/collections-music-spotify`, and it holds the live `token.json`, refreshed 2026-09-11T08:59, beside a `pkce.json` orphaned since 27 August though the handoff is meant to go once the code is exchanged. `collections/` is gone from the checkout and music departed from it. A rename carries the token across or Alan gives consent again, so the move is what makes this cost anything.",
    },
  ],
} as const satisfies Initiative
