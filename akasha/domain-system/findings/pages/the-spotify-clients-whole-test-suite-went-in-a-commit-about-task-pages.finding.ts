import type { Finding } from "../finding.page-type.ts"

export const theSpotifyClientsWholeTestSuiteWentInACommitAboutTaskPages = {
  id: "01a06275-4a8f-7001-8ac3-4c7a4dd150bd",
  pageTypeSlug: "finding",
  slug: "the-spotify-clients-whole-test-suite-went-in-a-commit-about-task-pages",
  domainSlug: "domain/music",
  claim:
    "`collections/music-spotify/src` carried no test before this migration. Its 21 test files and 2,899 lines went in commit `09f964f5c5` on 30 August 2026, whose subject is `Ablate the task pages and every page's conditional reading of them`. The build output still holds all 21 as `.unit.test.d.ts` declarations.",
  evidence:
    "`find collections/music-spotify/src -name '*test*'` answers nothing. `find collections/music-spotify/dist -name '*.unit.test.d.ts'` answers 21 paths: albums, artists, audiobooks, browse, chapters, client, endpoints/tracks, episodes, follow, harness, library, personalization, pkce-store, player, playlists, restriction, scopes, search, shows, token-store and users.\n\n`git log --diff-filter=D --name-only -- 'collections/music-spotify/**/*.unit.test.ts'` names one commit, `09f964f5c5d10f9f2e7295c4482b107c9710b5c6`, by Alan Walton on Sun 30 August 2026 10:52:59 -0600. Its stat line for those paths reads `21 files changed, 2899 deletions(-)`. Summing `git show 09f964f5c5^:<path> | wc -l` over the 21 gives the same 2,899.\n\nThe subject of that commit is about task pages. The Spotify tests are not named in it, and the package's `package.json` kept a `test` script reading `bun test`, which answers clean over a folder holding no test.\n\nThe recreation at `akasha/alan/music/spotify` lands 10 test files and 85 tests, covering the pacing gap, the 429 wait and its one retry, the 401 refresh and its one retry, the token store round trip, the PKCE handoff, the paging, and the two consent steps. It does not recreate what the 2,899 lines proved about the eleven families nothing imports.",
} as const satisfies Finding
