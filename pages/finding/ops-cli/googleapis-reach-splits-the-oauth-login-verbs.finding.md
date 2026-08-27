---
id: e95e43de-ecc5-5eb5-ada2-43f55c1f834b
page-type-slug: finding
title: "Googleapis reach splits the oauth login verbs"
domain-slug: domain/ops-cli
---

# Claim

Two seats moving bodies on 2026-08-13 answered the same question opposite ways, and the repository now holds both answers. `ops email auth login` and `ops drive auth login` moved here and reach `@googleapis/gmail` and `@googleapis/drive` through `codeModule`; `ops calendar auth login` did not move, on the ground that reaching `@googleapis/calendar` that way is what `domains/agent-harness.md` Effects Are Not Dependencies forbids. The three verbs are the same body with a different package name.

# Evidence

`pages/finding/ops-cli/calendar-auth-login-body-cannot-move.finding.md` states the case for leaving it: the rule reads "A third-party package is one; an effect is not", and the package's version is pinned by a `package.json` this repository does not hold. Its own last line hands the exception to Alan rather than settling it.

The case for moving it, which is what landed at `1398588a1`: nothing is installed here and this repository's `package.json` does not change. `Bun.resolveSync(ref, codeRoot())` resolves out of the code repository's `node_modules`, which is the same mechanism and the same tree every other capability is reached through — `@shared/cli-core/exit`, `@shared/pages-access` and `@alanwalton/sms-core` all resolve that way. `tools/lib/code-import.ts` states its two arms as a path beneath the code root and "anything else is a package specifier read through that package's own `exports` map", drawing no line at the workspace boundary. Before this commit every specifier named from here happened to be a workspace package; that was the corpus, not a stated bound.

What the two seats could prove differs. The calendar seat had `--help` alone. The `--callback-url` path on the email and drive verbs drives the moved body short of a real consent: `ops email auth login --callback-url 'http://127.0.0.1:45775/callback?code=deadbeef-not-a-real-code'` constructs `auth.OAuth2` out of the resolved package, calls `getToken`, and comes back `invalid_grant` at exit 70 — byte-identical before and after the move, as are the three refusal branches above it. The unproved branch is the loopback listener, which is `Bun.serve` and moves under either reading.

`tools/lib/google-oauth-consent.ts` holds the shared body. Backing it out is one write of that file and the two command files; nothing else reads it.

Not established: which reading Alan wants.
