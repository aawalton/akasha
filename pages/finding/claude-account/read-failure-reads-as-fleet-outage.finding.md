---
id: e2fbb226-1d96-5f4b-bbbd-0e4c72d2979f
page-type-slug: finding
title: "Read failure reads as fleet outage"
domain-slug: page-type/claude-account
---

# Claim

A failed credentials read and a fleet with no renewable credential produce the same `null`, so the supervisor tells Alan every refresh token in the fleet needs a person when the real fault is that it could not read the table.

# Evidence

`getRenewableRegistrationCredential` in `packages/agents/oauth/src/oauth-credentials.ts` returns `null` from two places: line 349, after walking every candidate and finding none that can renew, and line 352, from a `catch` around the whole body. It calls the raw `getAllCredentials()`, which throws — the caught-and-flattened `getAllCredentialsFromDb` wrapper sits beside it and is not the one used here.

Its only caller, `selectAccountAndWriteCredential` in `packages/agents/supervisor/src/supervisor-agent.ts` line 194, reads that `null` one way: `if (!fallback) throw noRenewableCredentialError(effectiveAccount)`. That error states "No Claude account holds a renewable credential — the registration fallback walked every managed account after X failed and none could authenticate. This is a fleet-wide auth outage, not one account's: every refresh token needs a person."

On a database read failure none of that happened. Nothing was walked, no account was found unable to authenticate, and the remedy the message gives — re-auth an account interactively — repairs nothing.

The walk carries no test of its own; its callers are covered by injection while its ordering and skip logic are not. Measured 2026-08-13 on deployed main at `c5a68fe1a2`: `ops claude-account census` reports 8 of 8 accounts renewable, so the exhausted branch is currently unreachable in production and only the read-failure branch can fire.
