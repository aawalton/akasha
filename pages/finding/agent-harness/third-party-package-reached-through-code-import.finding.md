---
id: 412470ab-9917-5eaf-a3fa-ad9656b31963
page-type-slug: finding
title: "Third party package reached through code import"
domain-slug: domain/agent-harness
---

# Claim

Two third-party npm packages are now resolved into the dispatcher's own process from the
instructions repository, and they are the first. Every other reference `codeModule` carries names
a workspace in the code repository's own monorepo. `domains/agent-harness.md` Effects Are Not
Dependencies says a third-party package is what holds a part in the code repository, so whether a
moved body may reach one is a question the rule appears to answer and nothing has settled.

# Evidence

Commit `1398588a1` moved the `sms`, `email`, `notion` and `drive` verb bodies here. Six of the
eight reach only code-repository capabilities. The two consent verbs do not:
`tools/commands/email/auth/login.ts` declares `const GMAIL = "@googleapis/gmail"` and
`tools/commands/drive/auth/login.ts` declares `const DRIVE = "@googleapis/drive"`, each handed to
`tools/lib/google-oauth-consent.ts`, which resolves it and constructs `auth.OAuth2` from it.

Every package specifier under `tools/lib` and `tools/commands` on 2026-08-13 is `@shared/*`,
`@agents/*`, `@alanwalton/*`, `@books/*`, `@collections/*` or `@infra/*` — all workspaces in the
code repository — plus exactly those two. They are the whole of the departure.

The boundary is doing something different here. A narrow interface and the code-repository
capability it names move on the same commit and the same deploy, which is the argument
`tools/lib/code-import.ts` makes for declaring shapes rather than importing types: a mirror that
cannot go stale in a way that matters. `@googleapis/gmail` moves on Google's schedule and on
whenever the code repository bumps it, neither of which this repository sees.
`tools/lib/google-oauth-consent.ts` hand-declares that SDK's constructor options,
`generateAuthUrl`'s option names and `getToken`'s return shape.

The two verbs it affects are also the two in the namespace that cannot be exercised: both need
interactive browser consent against live credentials, so `--help` is the whole of what a seat can
compare. The declaration and the thing declared have never been run against each other.

A second seat working the same namespace read the rule the other way and was preparing to hand
both verbs back unmoved on this ground. Two readings of one rule, from two seats on one task, is
why this is a finding rather than a repair.
