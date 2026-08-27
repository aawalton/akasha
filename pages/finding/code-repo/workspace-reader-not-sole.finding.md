---
id: 5917eeff-61b9-553f-a50a-dabaad40f24b
page-type-slug: finding
title: "Workspace reader not sole"
domain-slug: repo/code-repo
---

# Claim

`listWorkspaceDirs` states a coverage it does not have. Its docblock says "Because every consumer routes through this one function, switching any block between literal and glob form is a change to this function plus the array, not an edit to every reader." One consumer does not: `buildWorkspaceMap` in the supervisor's `oauth-proxy-tree-version.ts` reads the same array with its own expander, taking one trailing `/*` where the shared reader expands two. A depth-2 entry would be dropped there in silence.

# Evidence

Read against the code repo's working tree at `383bf60d35`, 2026-08-07.

`packages/shared/workspace-paths/src/index.ts` carries the quoted sentence in its module docblock. Its `parseTrailingStarGlob` strips trailing `/*` segments in a loop and returns a depth, so `prefix/*` and `prefix/*/*` both expand and any other shape throws; the same docblock discusses depth-2 at length, explaining that a depth-2 glob under `addons/` is deliberately avoided for an unrelated bun reason and that "the parser still supports depth-2 globs for other blocks".

`packages/agents/supervisor/src/oauth-proxy-tree-version.ts:103-121` is `buildWorkspaceMap`. It reads the root manifest itself, then for each entry tests `g.endsWith("/*")`, slices the last two characters off, and `readdirSync`s exactly one level. Its own comment calls one trailing `/*` "the only glob shape the root `workspaces` array uses". Handed `a/b/*/*` it would take the base as `a/b/*`, find no such directory, and `continue` — the block dropped with no error and no log.

Latent rather than firing today: the array holds 350 entries, of which 3 are globs and all 3 are depth-1 (`packages/temper/addons/*`, `packages/temper/shared/capture/*`, `packages/temper/shared/addon-libraries/*`), so the two readers currently agree on all 379 directories.

What the divergence would cost is not a build error. The map is the runtime-dependency closure the OAuth proxy's version hash is computed over, and the module's own docblock says a package "can only enter the closure if it maps here" — so a dropped block silently narrows the hash, which is the same failure `#14746` was: a change confined to a dependency left the marker unbumped and running proxies kept stale code.

Found ingesting a quarantined instructions document that recorded the second expander; that record is queued for removal with it.
