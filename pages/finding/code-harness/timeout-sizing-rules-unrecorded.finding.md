---
id: 338fd2ca-1b31-5333-b13a-274dbfce57b2
page-type-slug: finding
title: "Timeout sizing rules unrecorded"
domain-slug: domain/global
---

# Claim

Neither of the two timeout-sizing rules Alan has given is recorded anywhere in the repo: a timeout bounding real work is sized at ~2x the expected case (given 2026-07-25), and a timeout wrapping another timeout is sized as inner cap + overhead + margin, for diagnosability (given 2026-07-25 22:43Z). `TICK_DEADLINE_MS` (180s), which wraps `WORKTREE_CONFIG_LOAD_CAP_MS` (150s), was never derived by either rule and leaves only 7s of slack over the inner cap plus its overhead.

# Evidence

Project #16341 (domain: code-harness, status: someday_maybe, live-on: commit). No initiative named.

Alan's ruling, 2026-07-25 22:43Z, in answer to "When one timeout wraps another, does your 2x-expected-case rule size the OUTER one — or should the outer be sized from the inner cap, so the inner error always fires first?": "Outer = inner cap + overhead + margin (diagnosability wins)."

Neither rule is recorded in the repo — a grep across `.claude/`, `docs/` and every package `CLAUDE.md` finds nothing for this rule or the earlier 2x-expected-case rule (given the same evening). Both exist only in transcripts. They apply to disjoint cases: a timeout bounding real work uses ~2x expected case; one wrapping another timeout uses inner cap + overhead + margin, so an over-cap inner operation surfaces its own precise error rather than an opaque outer one.

Deliverable 1: record both rules as a Functional Principle (`.claude/docs/`, routed from root `CLAUDE.md`).

Deliverable 2: apply to `TICK_DEADLINE_MS` (180s), wrapping `WORKTREE_CONFIG_LOAD_CAP_MS` (150s), never derived. Worked derivation, to be recomputed against production: 150s inner + 23s overhead (7.4s+15.6s, unverified provenance, re-measure before use — an agent on this subsystem quoted ~22s for a graph build from a workstation reading when production is 42.8s floor/54s p50/424s max) + 46s margin = 196s. Current 180s leaves only 7s over the 173s floor. #16203's scope forbade raising the deadline; Alan's ruling supersedes that here, and the commit must say so.

Deliverable 3: sweep other nested timeouts for the same mis-sizing: `SUBPROCESS_TIMEOUT_MS`, `CAPACITY_WAIT_TIMEOUT_MS`, and the 3-minute Kubernetes rollout wait that failed four app-deploy steps the same night (#16325, wraps an unbounded scheduling wait).

Verification (not automated): a unit test asserting `outer > inner_cap + measured_overhead` per pair. Whether the right error surfaces in production is an owner watch, not an automated criterion.
