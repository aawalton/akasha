---
id: b01f0592-6cdb-5d1d-bf38-71bd782f6cbe
page-type-slug: finding
title: "Caller gate admits unidentified"
domain-slug: domain/global
---

# Claim

The caller-role gate does not refuse a caller with no `AGENT_ID`. `ops project check` and `ops project deploy` run the verb instead and fail later on their own terms, so an unidentified caller reaches work it was gated out of, and the failure it eventually meets says nothing about identity.

# Evidence

Measured 2026-08-03 while verifying #17600, whose checks stage escalated it.

`bun test packages/alanwalton/projects/cli` reports 1660 pass, 10 fail across 168 files. Every failure is in an "unidentified caller" suite: `src/project/check.cli.test.ts` and `src/project/deploy.cli.test.ts`. One names the shape directly — "ops project deploy — unidentified caller > takes no side effect — nothing is written to stdout" at `deploy.cli.test.ts:103`.

Not #17600's. Neither commit that row landed, `0703ce7f60` nor `a9e7162534`, touches either test file or the gate they exercise. #17600 changed `project-page-claim.ts` and `observe-settled-claim.ts` in the same package, which is why the failures surfaced in its checks stage rather than anyone else's.

The seat that met it established the same thing by a different route before escalating: a detached worktree at clean `8675d6b938` with its own `bun install` and none of its changes fails the same 10. I could not reproduce that leg — `ops worktree ephemeral` refuses a ref that local main has since moved past — so that half is its measurement rather than mine.

This has been red for at least as long as the direct-landing sentinel has stood, which is why nothing reported it: the route that lands code on local main runs no branch CI, and the package's own suite is only run by whoever happens to touch it.
