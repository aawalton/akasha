---
id: 092ea235-d04b-578e-9bb8-a72d46f46e87
slug: five-copy-triage-doctrine-drift
page-type-slug: finding
title: "Five copy triage doctrine drift"
domain-slug: domain/global
---

# Claim

One CI-fan-out triage doctrine exists as five independent hand-authored copies with no derivation relationship or test tying them — a verb's own `--help` (highest-traffic, per root `CLAUDE.md:57`), two contradictory copies within `packages/infra/tests/CLAUDE.md` itself, root `CLAUDE.md`, and `.claude/docs/ops-namespaces.md` — and the drift is live: the `--help`'s first example errors (exit code 3) because a sweep updated the other copies but missed it.

# Evidence

[2026-07-26T02:41:26.490Z] Found by worker-16376 closing #16376. Worse than #16239's three-surface finding: LIVE.

Five copies of one triage doctrine — reading a consolidated CI fan-out failure — hand-authored, independent, none derived, no test/gate/check tying them: (1) the verb's own `--help`, highest traffic, root `CLAUDE.md:57` tells the fleet to prefer it. (2) `packages/infra/tests/CLAUDE.md` Triage section. (3) same file's layout cell, contradicting (2): Triage said attribution "navigates straight to the test's home," layout said "best-effort under interleaving." (4) root `CLAUDE.md`. (5) `.claude/docs/ops-namespaces.md`.

Drift is live, with an exit code: `--help`'s first example ERRORS.
`bun ops loki logs --pod <pod> --limit 9999` → "Loki query failed: 400 max entries limit per query exceeded, limit > max_entries_limit (9999 > 5000)", exit 3. Control `--limit 100` exits 0.

Sibling verbs and the package doc already forbade `--limit` above the cap. A sweep updated three copies; the highest-traffic one survived stale, owned by nobody — same pattern #16239 found: sweep covers docs, misses `--help`, which reads as code, greps as prose.

Not the fix: a string test pinning five docstrings (#16239's argument, endorsed here) — sweep coverage fails, not the string; a string test rots without catching the class.

Defect: no derivation relationship — copies drift however carefully written, since a change to one is invisible from the rest. Fix: one source, others referencing or generated from it, or fewer copies.

Worth checking whether five is general or an outlier: count other doctrines in `--help` and docs both.

Related, not absorbed: #16377 (`--help` prose is exempt from `CLAUDE.md:57`'s guarantee) — now THREE instances, this one. #16372 (triage-fanout attribution drifts on interleaved logs) is the doctrine's content, not the copy problem.

Captured, never defined — no objective of its own; moved off the retired `notes` attribute on 2026-08-15.
