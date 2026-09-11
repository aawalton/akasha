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
      statement: "Exactly one spotify module states that every call goes through it.",
      workingMemory:
        "Two do. `spotify-fetching` is `the one function every call to Spotify is made through` and `spotify-client` is `one paced queue every Spotify Web API call goes through`. Both are true: fetching is a seventeen-line indirection over `fetch` that a test swaps out, and the token calls in `spotify-auth` and `spotify-auth-cli` reach it without the queue. The distinction rides on the words `Web API`, so a reader opens both to learn which one to import.",
    },
    {
      statement: "The PKCE handoff carries nothing the exchange does not read.",
      workingMemory:
        "`spotify-pkce-store` writes a verifier and a state, and its shape refuses a handoff carrying anything else. The exchange step in `spotify-auth-cli` reads `handoff.verifier` alone. A grep over `alan/music/spotify` finds `state` read back nowhere. It is sent to Spotify in the authorize URL, but Alan hand-copies only the code off the callback page, so nothing ever compares the state that comes back. Either the exchange checks it or the store stops keeping it.",
    },
    {
      statement: "Every module under the spotify domain has a test.",
      workingMemory:
        'Ten of the thirteen state `test: "ts"`. Three state none: `spotify-credentials`, which reads the three secrets out of the environment and throws on a missing one; `spotify-scopes`, which joins the scope list into one space-parted line; and `spotify-tracks`, which reads one track by its id and names its artists. None of the three can be proved without reaching Spotify unless the call goes through `spotify-fetching`, which a test swaps out.',
    },
    {
      statement: "A Spotify call asks the environment only for the secrets that call uses.",
      workingMemory:
        "`basicAuthHeader` takes the client id and secret out of `getCredentials()`, which `requireEnv`s `SPOTIFY_REDIRECT_URI` beside them and throws where it is unset. `forceRefresh` reaches it, so a refresh demands a redirect URI it never sends. `alanwalton-web` and `alanwalton-atlas` mount only the client id and secret, and no `alanwalton-secrets-spotify-redirect-uri` page exists. The only such page is `collections-secrets-spotify-redirect-uri`, mounted by nothing.\n",
    },
    {
      statement: "No spotify module page states something its code does not do.",
      workingMemory:
        "Three found. `spotify-tracks` states `A track names its own artists` while `trackSchema` has `artists` optional. `spotify-client` states `A 429 is retried once` while its 401 branch recurses without `rateLimitRetries`, dropping the budget to zero, so a 429 after a refresh is retried a second time. `spotify-client` states `No call is made outside the queue` while `forceRefresh()` runs outside `enqueue`, and `spotify-auth` and `spotify-auth-cli` reach `fetchSpotify` unpaced.\n",
    },
    {
      statement: "One way of paging serves every Spotify read.",
      workingMemory:
        "Three exist. `paginateOffset` in `spotify-client` slices to `max` and is right. `searchPaginate` in `spotify-search` breaks on `items.length >= options.max` without slicing, so a page wider than `max` overshoots; its test uses a one-item page, which hides it. `paginateCursor` in `spotify-client` has no caller and no test, because `getRecentlyPlayed` hands back the raw cursor page instead.",
    },
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
    {
      statement:
        "Every export in the spotify domain is reached by something other than its own test.",
      workingMemory:
        "Four are not. `paginateCursor` in `spotify-client` has no caller at all. `RequestOptions.rawContentType` in `spotify-client` is read where a body is built and set by nobody. `removeToken` in `spotify-token-store` is called only by its own test. The three `collections-secrets-spotify-*` secret pages are mounted by no cluster service.",
    },
  ],
} as const satisfies Initiative
