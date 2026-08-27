---
id: 073d31df-0c51-54c7-9cc8-80c36b9ce2d9
page-type-slug: finding
title: "Credential stripped CLI tests fail not skip"
domain-slug: domain/test
---

# Claim

A credential-stripped workspace sweep, measured 2026-08-02 as pre-existing and independent of #17480, reports 18 failing tests all in `packages/agents/cli` (11 in `list.cli.test.ts`, 4 in `reap`, 2 in `send`, 1 in `reset`) that cannot reach the database without `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY`, while `packages/agents/shared` is clean and the sibling `wake-source-tags.smoke.test.ts` correctly skips (3 skip, 0 fail) instead of failing when credentials are absent.

# Evidence

Project #17516, domain `test`. Separated by `athena-lead` out of #17480's verdict, where it was found and correctly refused as out-of-scope. Not a regression: measured pre-existing with #17480's code entirely out of the picture.

**The measurement.** Credential-stripped, the workspace sweep reports 18 failing tests, all in `packages/agents/cli` — 11 in `list.cli.test.ts`, 4 in `reap`, 2 in `send`, 1 in `reset`. All are `ops seat …` suites that spawn the `ops` CLI and cannot reach the database without `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Zero failures anywhere in `packages/agents/shared`.

Isolated by #17480's worker with plain `bun test` on one file, no `ops tests run` in the path:
`bun test packages/agents/cli/src/agent/list.cli.test.ts` → 20 pass, 0 fail
`env -u SUPABASE_URL -u SUPABASE_SERVICE_ROLE_KEY bun test <same>` → 9 pass, 11 fail

**Why it is a defect rather than a fact of life.** The sibling population already demonstrates correct behavior: `wake-source-tags.smoke.test.ts` credential-stripped returns 3 skip, 0 fail — run directly. A suite that cannot reach its dependency should skip and say so, not fail. These 18 fail, so a credential-stripped run cannot distinguish a real break from an absent secret, and anyone taking a credential-free baseline reads a failure and learns nothing. That is exactly what happened here: #17480's C4 asked for a credential-stripped sweep to be green, and could not be satisfied for reasons having nothing to do with #17480.

**Bar.** A credential-stripped workspace sweep is either green, or every non-green is a declared skip naming the credential it wants. Whichever way each of the 18 goes — skip-guard or fixture — the test is that the run's result means something again.

**Not in scope.** `packages/agents/shared` is clean and #17480's isolation work is landed and verified. Nothing here revisits it.
