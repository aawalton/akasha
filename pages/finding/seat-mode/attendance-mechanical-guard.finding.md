---
id: 0ceac9ce-bece-57a4-beea-9ea6f8701e43
page-type-slug: finding
title: "Attendance mechanical guard"
domain-slug: page-property-definition/seat-mode
---

# Claim

Project #17288 (domain: seat-mode) found that fixing the known sites (its sibling) is not enough — what fails silently cannot be found by looking for it, and every known instance of gating attendance-dependent behaviour on launch mode was found by accident — so this child builds a mechanical guard, at the precedent set by #16266 (a non-nullable field that fails typecheck), permitting genuinely mechanical cases like `alert.ts:35`.

# Evidence

Project #17288 (domain: seat-mode, status: someday_maybe, live-on: deploy); never defined, moved off retired `notes` on 2026-08-15. Sibling of the row that fixes the seven known sites (see #17287): without this child, that sibling fixes what someone happened to notice and an eighth site is written next month.

Why: what fails silently cannot be found by looking for it. An instrument that refuses interrupts you, so you examine it; one that abstains silently never interrupts anyone, so nobody looks. Every instance of this conflation in the estate was found by accident: #15495 by four days of frozen data, #16266 during unrelated work, the seven in #17287 during an audit Alan asked about a different question. The remedy is never a sweep — a plan whose first step is "find them all" has already failed.

Precedent, landed and specific: #16266 did not merely rewire `supervisor-limit-resume`; it made the monitor field NON-NULLABLE (`supervisor-monitors-wire.ts:34-36`) so reintroducing `args.headless ? … : null` FAILS TYPECHECK. That is the rung to match — the earliest, most deterministic mechanism able to express the rule.

Success criteria: (1) a new site gating attendance-dependent behaviour on launch mode cannot land — the check is mechanical (a type or repo check), not a review convention or doc; (2) authored at the earliest rung that can express it — types before checks, checks before tests; if a type can make the gate unrepresentable, a lint rule is the wrong answer; (3) permits the legitimate case explicitly — `alert.ts:35`, `session-flush`'s durability gate, `decideRestartPlacement` genuinely need launch mode; a check forbidding what is sometimes correct gets suppressed, so the predicate must be right, not merely strict; (4) demonstrated failing on a known-bad input, not only passing on the current tree; (5) does not claim to have found the remaining instances — its value is the count stops growing, a different claim from zero, and the row says so.
