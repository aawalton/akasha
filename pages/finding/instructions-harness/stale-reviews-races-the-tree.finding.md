---
id: f481085e-0a6a-5478-b4d4-b15e171003bf
page-type-slug: finding
title: "The stale-reviews tool crashes when another seat removes a tracked path mid-run"
domain-slug: domain/global
---

# Claim

`tools/stale-reviews.ts` crashes when a document `git ls-files` returned is removed from disk before the tool opens it. It enumerates tracked paths and then opens each one, and the instructions repository is written continuously by many seats. On 2026-08-19 a run died with ENOENT on `domains/commands/ops-inference-pool-probe.md`, a path another agent removed mid-run.

# Evidence

Seen twice on 2026-08-19: once by the seat opening the review-documents pass, whose first run died on `domains/commands/ops-inference-pool-probe.md`, and once reported by the reviewer of `domains/agent-harness.md` for the same path.

Measured: that the crash is an unguarded `readFileSync` on a path taken from `git ls-files`, and that a rerun succeeds. Not measured: how often the race fires in practice, or whether any other tool enumerating the tracked set has the same shape.
