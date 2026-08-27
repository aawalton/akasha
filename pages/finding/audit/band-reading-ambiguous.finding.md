---
id: 7f9c2608-ba58-5ff8-b2be-df022ebc119a
slug: band-reading-ambiguous
page-type-slug: finding
title: "Is X is a band the band X holds or the band X measures in — the two readings reverse each other"
domain-slug: domain/audit
---

# Claim

"X is <band>" is read two ways in `domains/audit.md`, and the two reverse each other. Measured, "Every audit is lagging" is true — the slowest of 53 runs, `suite-runs` at 13.41s, is inside the 15s `domains/run-cost-lagging.md` sets — while "A whole run of the audits is slow" holds at 67.9s against a 60s ceiling. Declared, `RUN_BAND = "slow"` already makes the whole-run line true, while the two own-band grants leave "Every audit is lagging" a live want.

# Evidence

Read off the `review-instructions` reading of `domains/audit.md` finished 2026-08-21, read line by line, bottom to top. That reading ran `ops instructions run-checks` twice end to end, and greps over `tools/run-checks.ts` and `tools/lib/check.ts`. It notes `domains/gate.md` states its sibling bounds in Design as measured facts, which leans to the measured reading.

Both Intent lines were left standing: which reading is meant decides whether one moves to Design or the other is a want, and a wrong removal loses a want nothing re-reads.

Not measured here: I did not run the checks myself and did not open `run-cost-lagging.md` or `gate.md`. Whether the two readings differ anywhere else in the corpus is unread.
