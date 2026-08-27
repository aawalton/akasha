---
id: 601c2a56-1602-58fd-8baa-6235cbde14d4
page-type-slug: finding
title: "Verdict passes wrong commit"
domain-slug: domain/global
---

# Claim

A check verdict on `verdictExitCode` renders PASS when the pipeline it read passed for a different commit than the one being asked about; the direction (a verdict that cannot be trusted must fail closed, as already ruled in `object-name-claims-gate.ts`) is settled, but landing it needs the unmeasured divergence rate and depends on #17034's pre-land shell-the-worktree-copy generalisation to obtain a pass side.

# Evidence

From project #17036 (status `someday_maybe`, `live-on: deploy`, domain `code-check`), captured and never defined.

The defect: a check verdict renders PASS when the pipeline it read passed for a different commit. The sentence is true of the pipeline and false of the subject the reader is asking about — this domain's genus, on the surface that gates deploys via `verdictExitCode`.

The direction is decided and is not a new pattern: a verdict that cannot be trusted must fail closed. The estate already ruled this exact question once, in `object-name-claims-gate.ts`, whose docblock says: "An `unknown` fails the deploy exactly as a `fail` does: the gate could not be trusted, and letting that through is the silent pass this whole project exists to remove." Demoting the verdict kind on divergence applies a landed idiom, not a new one.

Two things gate landing, and neither is the direction:
- The divergence rate is unmeasured. Demoting a rare condition tightens a gate; demoting a common one halts the fleet. This row's first act was to be the count, over real pipeline verdicts, with its denominator — per this domain's discipline that a zero over an unenumerated population is the defect, not the answer.
- Its acceptance is currently unobtainable. Changing `verdictExitCode` changes code the deploy runs, so `deploy-gate-acceptance.md` binds it, and its pass side requires a real `bun ops project deploy` exiting 0 through the changed code — but the deploy verb loads step code from `~/code`. Depends on #17034, which generalises the shell-the-worktree-copy pre-land phase to the legs that lack it.

Not a child of #16924: it is that row's genus and #16924's evidence surfaced it, but a child that cannot land inside its parent's span is not a child. It sits as a sibling, citing that row.

What definition still needs: the divergence measurement; whether demotion should be a third kind or a fail; whether a divergent verdict has any legitimate reading worth preserving behind a flag.
