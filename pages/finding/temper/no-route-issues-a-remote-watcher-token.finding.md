---
id: bb1a1db5-5dc9-5f4f-9147-794e7aa11fe5
slug: no-route-issues-a-remote-watcher-token
page-type-slug: finding
title: "No route issues a watcher token to a remote client"
domain-slug: domain/temper
---

# Claim

A watcher running anywhere but this workstation has no way to obtain its bearer token, so `temper-watcher.exe` can serve nobody but Alan.

# Evidence

Measured 2026-08-20 while moving watcher verification onto files. `packages/temper/scripts/src/watcher-exe/main.ts` is one codebase shipping to two places: the workstation service runs it with `WATCHER_RUNTIME=source` (`runtime.ts:4`), and the same code ships as `temper-watcher.exe`, served by `packages/temper/web/app/routes/api.watcher.download.tsx` and self-updating from the server at `main.ts:69`.

The token now stands encrypted in the sops file beside `instructions:temper-watcher-enrolments/<account-user-id>.md` and reaches the process through `TEMPER_WATCHER_TOKEN`, which the workstation unit supplies by sourcing `~/.secrets.env`. A player's machine has no repository, no age key and no `sops`, so it cannot decrypt that file. The page query service does not serve a secret to any caller: a query naming `token` in its `select` returns the page without it, run against the live service on 2026-08-20.

`resolveWatcherToken` previously closed this gap by minting a token and writing it to the page itself. That was removed, because a token a client invents does not match the hash the server verifies against, so it would authenticate nothing while reporting success.

Three live watcher rows exist, one real. The two others are abandoned signup-flow accounts from 2026-07-25 that never signed in again. So nothing is blocked today; the gap binds the first remote user.

What would close it is a route that issues a token to a client already authenticated by its Supabase session, writing the hash to the enrolment page and the token to the sops file from the server side, and returning it once. That route does not exist and was not built here.
