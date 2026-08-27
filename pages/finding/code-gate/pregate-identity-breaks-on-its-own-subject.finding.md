---
id: 9681e721-0593-5583-a610-68bd1d0ddeee
page-type-slug: finding
title: "Pregate identity breaks on its own subject"
domain-slug: domain/global
---

# Claim

`file-length-core.ts` claims the merge-queue pre-gate's "verdict on a merged staging tree matches CI's by construction". The identity holds for every ordinary change and breaks for exactly one class — a change to the predicate itself, where the staging tree carries the new rule and the coordinator enforces the compiled old one, so a tree correct by its own contents is ejected. The claim is stated unconditionally, so nothing in the text marks the exception.

# Evidence

THE IDENTITY IS ASSERTED IN THOSE WORDS. `packages/infra/checks/src/lib/file-length-core.ts:99-100`: "The merge-queue pre-gate reaches this through `evaluateFileLength`, so its verdict on a merged staging tree matches CI's by construction."

WHAT BREAKS IT. `packages/infra/ci/merge-queue/coordinator/src/coordinator/file-length-pregate-shell.ts` reads the staging tree's CONTENT — `readFileSync` against `input.stagingWorkDir` at line 109 — and evaluates it at line 111 with the `evaluateFileLength` it imports at line 21. That import resolves at the coordinator's own build, not in the tree under judgment. The content comes from the staging tree; the rule comes from the running coordinator. For a change to `measuredLines`, `evaluateFileLength` or `MAX_LINES_BY_EXT`, the tree carries the new rule and the coordinator enforces the old one.

OBSERVED, WHICH IS WHAT MAKES IT MORE THAN A READING. #16776 changed what the `.md` line cap measures so the root `CLAUDE.md`'s routing table stopped spending the budget. Its deploy was ejected: "file CLAUDE.md would exceed the 200-line cap (201 lines) when merged onto current main — split it". 201 is the raw count; under the tree's own predicate the file measured 120 and passed. The fix for the line cap could not authorise its own landing.

THE CONSEQUENCE IS STRUCTURAL. A predicate change can only land by being split around a gate enforcing the version being replaced. #16776 split it, deferring one line so the file sat at 200, which passes both predicates, then landing that line in a second deploy. That is a manoeuvre every future predicate change must rediscover, because neither the gate nor its docstring says so.

NOT MEASURED. How many other gates carry a soundness argument of this shape, and whether the pre-gate could read its predicate out of the staging tree instead of compiling it in.
