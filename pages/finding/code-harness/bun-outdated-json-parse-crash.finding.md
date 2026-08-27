---
id: 574e02ca-78b6-5e33-bd2b-6ffe78fe4550
page-type-slug: finding
title: "Bun outdated JSON parse crash"
domain-slug: domain/global
---

# Claim

FizzBee explores a `oneof` selection assigned directly to a dotted instance-field target (for example `self.status = oneof TERMINAL`) as a choice but never lands it as an assignment, so a fizz spec written that way passes vacuously with no authoring mistake required.

# Evidence

Found and independently reproduced by worker-16242 during project #16242. Two probes differing in one line gave opposite verdicts: `self.status = oneof TERMINAL` on a dotted field passed a `NeverTerminal` assertion that should have failed (false green); rewriting as `chosen = oneof TERMINAL; self.status = chosen` correctly failed it.

Confirmed blast radius: `dispatcher.fizz` was vacuous — pinned at `running` forever, making `WorkerSelfDelete`/`HeartbeatReap` unreachable, so `EventuallyReaped`/`NoSpuriousDelete` passed proving nothing. Unique state count: 2 before fix, 12 after (6x expansion) — proof the spec explored almost nothing. Fixed inline by worker-16242, same package.

Still carrying the pattern as of 2026-07-25, all green: `orchestrator/spec/ci-pod-reaper.fizz` (4 sites, hand-written, no TS source), `worker/spec/subscriber-isolation.fizz` (4), `worker/spec/dispatch.fizz` (2), `worker/spec/lifecycle.fizz` (1).

`check-fizz-subset` cannot catch this — it verifies TS/fizz alignment, and here both sides are faithfully wrong together.

Structural fix candidate: `@shared/fizz-compiler` should reject or auto-lower the dotted oneof target; it already emits the local-then-assign form for a role's oneof initial state, but raw `topLevelActions` bodies pass through unvalidated.

Generalisable defense proposed: falsify a spec against a deliberately-broken variant before trusting it. Worker-16242 did this (root-only IsDesired collapses `desired-pipeline-seqs.fizz` from 563 to 38 states, reds `NoStrandedSubtree`). Candidate signals: implausibly small unique-state count is suspect; a spec never observed failing was never shown capable of failing.

Related: #16290 (fizz spec sound over incomplete writer domain), #16291 (check-fizz-subset prints no-op remediation) — three formal-methods defects, one evening, 2026-07-25, all green.

Project #16292, someday_maybe, domain code-harness. Captured, never formally defined; moved off retired `notes` attribute 2026-08-15.
