---
id: 89598f36-026b-59f0-bc3b-40f63e4e6aab
slug: chokepoint-checks-path-literal-blind
page-type-slug: finding
title: "Chokepoint checks path literal blind"
domain-slug: domain/global
---

# Claim

A check that enforces a routing invariant by reading a hardcoded chokepoint file path — such as `check-lib-sets-per-piece-difficulty-boundary`'s hardcoded path to `tooltips/veteran-breakdown.ts`, flagged by #15986's worker — reports green if that file is later renamed, moved, or deleted, because the check then finds nothing to parse and nothing to violate, and no registered check of this shape has been enumerated or proven to fail against a tree where its chokepoint was renamed away.

# Evidence

Project #16008 (domain `code-harness`). No objective; moved off the row's retired `notes` attribute on 2026-08-15.

Origin (nimue, 2026-07-25): #15986's worker flagged the issue in its own new check, choosing to match the sibling convention rather than be the one hardened outlier.

The shape: a boundary check enforces "all X must route through file F," reading and parsing F to assert the invariant. If F is renamed, moved, or deleted, the check finds nothing to violate and passes — reporting an invariant it can no longer see as satisfied.

Why framed as this milestone's class: the discriminating-instrument theorem again (a negative is evidence only if the instrument could have returned a positive). A check whose target does not exist cannot return a violation, so its green is uninformative in the flattering direction nobody audits — the sixth independent arrival of this theorem that night. Trigger is an ordinary refactor: a rename that looks like tidying silently disarms the guard.

Confirmed instance: `check-lib-sets-per-piece-difficulty-boundary` hardcodes its chokepoint path to `tooltips/veteran-breakdown.ts` (#15986's worker), which skipped an `existsSync` probe as the sibling convention; this project agrees, stating one hardened check among many is worth less than fixing the convention.

Work as framed: (1) enumerate every registered check naming a chokepoint by path literal — the denominator, first; (2) decide the guard shape once for all — an `existsSync` probe, or deriving the path from the code's own import source (references #16005); (3) apply uniformly, including to the boundary check once #15986 lands; (4) prove each hardened check fails against a tree where its chokepoint was renamed away, not merely that it passes today.

Ordering: do not start until #15986 lands; it adds a check, so counting sooner would miscount the denominator.

Evidence grade: source-reasoned, one confirmed instance; the sibling-convention claim is reported, not counted.
