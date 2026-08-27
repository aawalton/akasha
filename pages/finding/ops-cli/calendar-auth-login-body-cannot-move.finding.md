---
id: 8bd5241b-9c8b-55f4-975f-6ac951cfc696
slug: calendar-auth-login-body-cannot-move
page-type-slug: finding
title: "Calendar auth login body cannot move"
domain-slug: domain/ops-cli
---

# Claim

`ops calendar auth login` is the one verb in the `calendar` namespace whose body cannot move to the instructions repository without editing the code repository. Its body is not parse-and-print: it is the construction of a third-party OAuth client and two network calls against Google, and the code repository exports no capability for either.

# Evidence

Observed 2026-08-13 running `domains/tasks/ops/move-command-bodies.md` over the `calendar` namespace. The other five verbs calling `runCodeVerb` moved and were proved; this one was left delegating.

`packages/alanwalton/calendar/google/src/calendar/auth-login.ts` imports `auth` from `@googleapis/calendar` and does three things with it: `new auth.OAuth2({ clientId, clientSecret, redirectUri })`, `oauth2.generateAuthUrl(...)`, and `oauth2.getToken(code)`. The last is a network call to Google's token endpoint. None is wrapped by anything the package exports — `client.ts` exports `makeCalendarClient` and `makeOAuthCalendarClient`, both of which build a client from a credential that already exists, and this verb exists to mint that credential.

So moving the body means one of two things. Either this repository resolves `@googleapis/calendar` itself through `codeModule` — which works, verified: `Bun.resolveSync` finds it from the code root and `auth.OAuth2` is a function — or the code repository grows an exported "make a consent URL" / "exchange this code" pair, which is an edit there and the task's invariant forbids it.

The first route is what `domains/agent-harness.md` Effects Are Not Dependencies rules on: "A third-party package is one; an effect is not." The loopback listener in this body is `Bun.serve`, a built-in, and would move freely. `@googleapis/calendar` is not, and its version is pinned by a `package.json` this repository does not hold.

The other imports would have moved cleanly: `readCalendarOauthAppCredentials` and `CALENDAR_OAUTH_SCOPE` from `../env`, `parseOauthCallbackUrl` from `../oauth-callback`, and `OperationalError` through `tools/lib/code-errors.ts`. The OAuth client is the whole of what holds this verb over there.

Weighing against forcing it: consent is interactive and the run mints a live refresh token, so `--help` is the only comparison available.

Not established: whether the `@googleapis/calendar` reach would be acceptable to Alan as a deliberate exception. That is his call rather than a finding.
