---
id: b2c5e47c-3a0a-5040-b43c-e7b28011fe30
slug: drive-and-oauth-verbs-exit-70-on-a-capability-throw
page-type-slug: finding
title: "Drive and oauth verbs exit 70 on a capability throw"
domain-slug: domain/ops-cli
---

# Claim

`ops drive fetch` given a file id that matches nothing exits 70 with a bare `File not found: <id>.`, and both `ops email auth login` and `ops drive auth login` exit 70 with a bare `invalid_grant` when the authorization code they are handed is not a real one. All three are a caller's mistake reported as an unhandled defect. None is changed by the move — each did this before and after.

# Evidence

Measured 2026-08-13 while proving the moved bodies, against the live tree and then a worktree, byte-identical both ways:

    $ ops drive fetch 1AbCdEfGhIjKlMnOpQrStUvWxYz0123456
    File not found: 1AbCdEfGhIjKlMnOpQrStUvWxYz0123456.
    exit=70

    $ ops email auth login --callback-url 'http://127.0.0.1:45775/callback?code=deadbeef-not-a-real-code'
    invalid_grant
    exit=70

The id and the code were chosen to match nothing, so nothing was downloaded and no token was minted; the round trip to Google ran and its refusal came back.

The throw is the third-party client's in both. `fetchFileMetadata` in `packages/alanwalton/drive/google/src/files.ts` calls `client.raw.files.get` and neither catches nor classifies what it throws; `getToken` on the `@googleapis/*` OAuth2 client does the same. `exitCodeForThrowable` in `@shared/cli-core/exit` classifies by `instanceof` across four arms, so a `GaxiosError` matches none and falls through to 70.

Each verb classifies its own refusals correctly, which is what makes the gap visible from outside: `ops drive fetch 'https://example.com/not-a-drive-url'` exits 1, and `ops email auth login --callback-url 'not a url'` exits 1. Two refusals a caller can trigger on one verb exit under different rules for no reason a caller can see.

By the vocabulary `tools/lib/code-errors.ts` states, the drive case is a data refusal and the token case an input refusal.

The fix now belongs on the moved bodies rather than in the code repository, needing no deploy. It was NOT made: the task forbids changing a verb's behaviour while moving it.

`calendar-missing-event-exits-70.md`, `lifecycle-verbs-exit-70-on-missing-page.md` and `inference-plan-apply-exit-70-outside-code-repo.md` report the same shape from three other namespaces.
