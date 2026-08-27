---
id: fd198a28-bd36-598e-a403-94f1d63db5da
page-type-slug: finding
title: "A failed page write during a token refresh discards the fresh credential and reports the refresh failed"
domain-slug: domain/claude-account-credential
---

# Claim

A failed page write during a token refresh discards the freshly issued credential and reports the refresh as failed, against the Design line saying a credential push into a page never fails the refresh it sits beside.

# Evidence

`refreshOAuthTokenWithOutcome` in `tools/lib/oauth-credentials.ts` exchanges the refresh token, then calls `await db.updateTokenIfNewer({...})` with the new pair, inside the function's one `try`. Its `catch` logs and returns `{ ok: false, terminal: false, reason: "exception" }`, so the freshly issued `data.access_token` and `data.refresh_token` are never returned to the caller and are held nowhere.

`pageCredentialStore().updateTokenIfNewer` in `tools/lib/oauth-page-db.ts` throws when `pushCredentialToPage` answers `refused` or `skipped` — among them the case where no page stands at the account's path, and the case where the account name does not match the shape a path is written from.

The exchange consumes the refresh token it was given. So on that path the page keeps the spent token, the replacement is discarded, and the account cannot refresh again without a person logging in.

This was not reachable while the page write was a separate mirror: `sendRowCredentialToPage` carried its own catch and could not fail its caller. It became reachable when the refresh was pointed at the page store directly, which is also what removed the mirror.

`domains/claude-account-credential.md` carries the Design line "A credential push into a page never fails the refresh it sits beside", so this is a departure from a stated invariant rather than an open question.

Not observed in the wild: all eight accounts currently have both a page and a sops sidecar, and `page-drift` reads 8 current, 0 behind. This records a reachable path, not a failure seen.
