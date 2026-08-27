---
id: abf13e7e-9ec1-5e19-a18f-b85d8b7f486d
slug: force-fail-reason-not-propagated
page-type-slug: finding
title: "Force fail reason not propagated"
domain-slug: domain/global
---

# Claim

In merge-queue, an operator force-failing a wedged infra step via `pipeline force-fail-step` records a `failReason` and exit code on the step row, but bisection discards that fact and ejects the entry with the generic reason `staging CI failed (pipeline #<n>)` — textually identical to a genuinely-red build — even though a single-entry batch converges immediately and adjudicates with the false confidence of a proof bisection never tested for non-attributable failure.

# Evidence

From project #16431 (domain `merge-queue`). Never carried an objective — this is its capture.

Observed twice, same wedge #16189: entry 11035/project-16391 (aranya) — ejected "staging CI failed (pipeline #26190)" 2026-07-26T07:07Z, minutes after a force-fail with exit 143/`OperatorCanceled`; entry 11019/project-16378 — ejected "staging CI failed (pipeline #26146)", the first instance. Neither change was implicated; both hung the same shard on different tree-shas.

Cost: the ejected agent reads "staging CI failed" as "my change broke CI" and hunts a nonexistent defect. In the 11035 case the owning agent had to be interrupted by hand; no such message is sent when the reaper or another operator clears the wedge.

Timing: `merge-queue batch recover-bisection 10552` returned noop — tree already adjudicated, the eject beat the operator. A remedy depending on the operator racing bisection is not a remedy.

Measurements (2026-07-26, load-bearing): the two incidents carry different `failReason` values, so no remedy may key on the literal `OperatorCanceled` — pipeline 26190 step check-typesafety-bundle-temper-rest: exit 143, `OperatorCanceled`; pipeline 26146 same step: exit 137, `WedgedSyscallSpin`. A non-attributable predicate over failReasons is required, not an equality test.

Direction, not a decision: propagate a non-attributable marker step→batch→ejection reason ("infra step force-failed — not attributable to this entry"); or suppress bisection-adjudication when every failed step carries an operator/infra failReason, restoring entries to `queued` instead of ejecting — closer to correct, since the entry never got a verdict.

Related, same family: `merge-queue pause` prints the prior batchSize ("paused 4") but `resume` hardcodes it to 1. The `recover-bisection` help's recommended `pause && recover-bisection && resume` sequence silently degrades batchSize 4 to 1 — invisible, since 1 is ordinary. Avoided here only by reading batchSize before pausing and restoring via `set-batch-size 4`.
