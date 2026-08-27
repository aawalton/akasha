---
id: 30b468db-3869-55dc-b4df-4d440603609e
slug: success-line-printed-above-a-refusal
page-type-slug: finding
title: "Success line printed above a refusal"
domain-slug: domain/global
---

# Claim

A check whose population certifies nothing prints its SUCCESS sentence first and its refusal second, so the two disagree on one line and the sentence a reader takes away is the wrong one. `exitOnResult` in `violation-reporter.ts` composes the success message and the bound together, and the empty-population arm of `renderBound` is appended to a sentence already claiming the check passed. Every check in `packages/infra/checks` reports through that path, so it is one repair rather than one per check.

# Evidence

Measured 2026-08-10 on `check-alert-expr-epoch-literals` during #18406, after its population was moved from the one composed document onto the rules it judges. Handed a rules document carrying no rules, the check exits 2 and prints:

```
[alert-expr-epoch-literals] OK — no wall-clock cutover in /var/tmp/…/empty.yml. [EMPTY POPULATION — 0 alert rules: this run examined nothing, so it certifies nothing]
```

`OK` and `certifies nothing` stand in the same sentence, and the exit code agreeing with the second is not on the line. `renderBound` already refuses to render coverage for an empty population, and `populationCertifies` already returns false, so the decision is right everywhere except in what the reader is shown.

Not repaired in #18406: the composition sits in a module every check in the package reports through, and rewording it there changes the output of all of them at once. That is the horizontal the initiative's loop asks for rather than a repair inside one check's project.

Horizon: one check, one run, on the branch `project-18484` at commit 33d92a3cb7. Nothing was swept for how many other checks can reach an empty population, so this says the path exists and not how often it is walked.
