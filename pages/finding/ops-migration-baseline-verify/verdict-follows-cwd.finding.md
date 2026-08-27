---
id: b3683539-18a8-5f6f-9266-0859e6a96c74
page-type-slug: finding
title: "Verdict follows cwd"
domain-slug: domain/global
---

# Claim

`ops migration baseline-verify` reaches a different verdict depending on the directory it is invoked from, because the tree its origin/main comparison renders against is `process.cwd()` rather than a repository it resolves.

# Evidence

Invoked from `~/code` it prints `COMPLETE	schema_baseline	340 seq(s) checked, functions match origin/main` and exits 0. Invoked from `~/instructions` against the same database minutes later it prints 114 lines, every one `NOTE	<path>	baselineOnly`, and also exits 0.

The instructions repository carries no `packages/shared/supabase/database/schema` tree, so `origin/main` renders empty there and every baseline file is classified as standing on one side only. A `NOTE` is the non-blocking class, so the run that compared against nothing and the run that compared against main are both exit 0, and the verb's own help calls exit 0 "baseline complete and byte-identical to origin/main on every function".

Observed 2026-08-13 while moving the verb's body into the instructions repository. Both readings reproduce identically on the delegating form and on the moved form, so the behaviour predates the move.
