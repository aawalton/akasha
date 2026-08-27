---
id: 06f964b1-f1cb-53a6-90ce-21b76c211c47
page-type-slug: finding
title: "Remedy routed past the reader"
domain-slug: domain/global
---

# Claim

Three of the six checks reviewed so far refuse without naming an act, and in two of them the remedy is already written and routed away from the reader — into a `--json` field the CI step does not ask for, and into a source header no reader of a red build opens.

# Evidence

Six `review-check` readings ran between 2026-08-06 and 2026-08-07 under the `code-check` initiative. Stage 3 asks each reviewer to read what the check prints when it refuses, on the grounds that a refusal naming no act has deferred the defect rather than prevented it. Four of the six reported an answer.

`check-instructions-citations`, reviewed at `095aba6b04`: the remedy sentence is built into every violation's `message` field and reaches stdout only under `--json`. Its registry entry in the check configs declares no `args`, so the CI step runs the human format, whose `formatViolation` prints `file:line — citation` and stops. The author who fails the gate is told what is wrong and not what to do.

`check-repo-paths`, reviewed at `d01942409a`: the refusal names the file, the line, the literal and the fact, and no act. The remedy — reshape the literal, there are no suppression pragmas — stands in a 65-line source header.

`check-syntax-bundle`, reviewed the same day: 7 of its 24 scanner entries carry a `remediationDoc` and print `→ see instead: …`. The other 17 name the violation and its position and stop. Here the remedy is absent rather than misrouted.

`check-mock-module-leak` is the one that reported the opposite: each of its 10 refusals names an act.

The remaining two readings, of `check-cli-positional-alias-coverage` and `check-tstl-colon-dot-self-shift`, did not report on refusal text either way.

NOT MEASURED. The other 153 registered predicate checks. Whether a misrouted remedy costs more or less than an absent one. Whether any instrument could distinguish a refusal naming an act from one that does not, which is what would turn this from a reviewer's judgement into a measurement.
