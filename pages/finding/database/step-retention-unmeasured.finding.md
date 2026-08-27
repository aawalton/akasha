---
id: 2edf2a78-40d9-503e-9159-0fd9572c10a1
slug: step-retention-unmeasured
page-type-slug: finding
title: "Step retention unmeasured"
domain-slug: domain/database
---

# Claim

The step page-type's CI hot-path query is already isolated from the live step-row count by a dedicated partial index, so retaining terminal step rows costs CI nothing and its cost is externalized entirely onto other page-types' slug-only reads.

# Evidence

Measured 2026-07-25 by dalla while answering astra's Existence Check on #15895.

Established: 739,626 live step rows — 98.1% completed, 1.8% resolved; non-terminal 566 rows = 0.077%. Five step readers, none date-ranged: dispatcher level scan (status='dispatching', 98 rows), reaper (pod-joined), pipeline-worker (own pipeline), retry/force-fail CLI (one step), pipeline-step-inventory (one pipeline seq); screening record on #15895. The CI hot path is already isolated from the row count: loadDispatchingStepsPg uses the partial btree index pages_step_dispatching_created_at_idx — 36 buffers, 0.7ms, no Sort node; GENERIC_PLAN picks the same index. Verifies #15585's claim that cost is bounded by the live dispatching set.

Therefore: CI gains nothing from retention; the measured 70.7% cost is externalized onto every other page-type's slug-only reads (#15895's actual content). Retention is a cost CI pays for everyone else.

Open, first outcome is measurement not implementation: (1) retention window — no reader is date-ranged in code; how far back an operator inspects a terminal pipeline is unmeasured, derive from observed operator read recency, else an Alan question; (2) soft vs hard delete — soft-delete drops rows from every `WHERE deleted_at IS NULL` partial index but leaves them in the heap and in page_type_slug's distribution, whether that restores the discriminator needs measuring; (3) cascade — a step's parent workflow/pipeline pages have the same shape, scope deliberately so a retained pipeline keeps its steps.

Caveat on own basis: the reader inventory is a code sweep, not observed traffic. Falsifying instrument: pg_stat_statements fingerprints touching page_type_slug='step' (aranya holds those buckets). Project #16097, status someday_maybe, live-on: deploy, domain database.
