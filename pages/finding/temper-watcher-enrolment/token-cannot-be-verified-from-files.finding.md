---
id: 917d1b45-aae5-594e-94d1-ac727509948a
slug: token-cannot-be-verified-from-files
page-type-slug: finding
title: "Watcher token cannot be verified from files"
domain-slug: page-type/temper-watcher-enrolment
---

# Claim

The watcher's bearer token is resolved by searching every enrolment for the one whose token equals the token presented. A sops sidecar holds a value encrypted and no networked reader decrypts one, so that search cannot be answered from files. The page type can be documented but not flipped, and its rows cannot be retired, until the token stops being verified by lookup.

# Evidence

Measured 2026-08-20 by running each of the following.

`packages/temper/web/app/lib/watcher-auth.ts:15-19` narrows on the secret's own value: `where: [{key: "watcherToken", eq: wtToken}]`. Five deployed routes call it, registered at `packages/temper/web/app/routes.ts:44-48`. The workstation client presents the token to them over the public internet from `packages/temper/scripts/src/watcher/import-data-mining.ts:118`, `import-listings.ts:155` and `import-pricing.ts:151`.

`domains/page-type-backing-file-secret.md` settles where such a value stands: in a sops file beside the page, entered through `tools/page-secret.ts`, and withheld from a read that did not ask for it.

That withholding was confirmed rather than assumed. `bun tools/page-secret.ts --file-path claude-accounts/aawalton.md` reports the sidecar holds `access-token` and `refresh-token`. Asking the query service for the same page, `curl http://127.0.0.1:8787/page/claude-account/aawalton`, returns neither — only the non-secret `access-token-expires-at`. Grepping `sops` and `secret` over `services/page-query-service.ts` and `packages/shared/pages/access/src/file-read.ts` matches nothing. Every consumer of a sops secret in the corpus is a workstation tool under `instructions/tools/`; no pod reads one.

Two shapes would resolve it, and both are decisions rather than measurements. The enrolment could carry a hash of the token in frontmatter and keep the token in the sidecar for the client that presents it, which makes the lookup answerable and the frontmatter safe. Or the upload routes could write files through the page query service as the other temper importers now do, at which point the token has no reader and the type goes.

Not measured: whether those five routes still carry traffic the file-writing importers do not already cover.
