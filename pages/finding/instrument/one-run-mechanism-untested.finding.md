---
id: 23b02ca7-a6d0-5e40-8e5d-bc92993fdaa1
slug: one-run-mechanism-untested
page-type-slug: finding
title: "One run mechanism untested"
domain-slug: domain/instrument
---

# Claim

Nothing in the instructions corpus binds the claim that a mechanism which has been run once is untested — that one run establishes only that the parts compose, and that the defects remaining are reachable by running it rather than by reading it.

# Evidence

Found while ingesting `dirty/initiatives-old/case-reps.md`, which asserted it as "A mechanism used once is indistinguishable from one that works," and reported three defects in its own machinery that were each found by running it and none by reading the code: a transcript looked for under a path the CLI never writes, an arm authenticating as the one account whose budget was spent, and a judge one prose improvement away from being unblinded.

Swept `domains/`, `roles/`, `tasks/`, `folders/` and `file-kinds/` for `indistinguishable`, `one run`, `sample` and `once is`. Six hits on the first, none making this claim. The nearest standing surface is Negative Control on `domains/instrument.md` — "Make an instrument fail before you trust it. A blind instrument and a clean one both return nothing." That binds an instrument that was never looking. It does not reach one whose single run returned the result expected of it, and the two remedies differ: Negative Control is satisfied by showing the instrument the case it must catch, this claim by running it again.

NOT MEASURED: whether the behaviour occurs in the estate today. The sweep was for the claim in the corpus, not for instances of the failure, so this carries no evidence that anything is currently trusting a once-run mechanism. The apparatus the source measured it on — `tools/failures.ts`, `tools/checks/cases-recorded.ts`, `tools/document/schemas/case.ts` — is gone from the tree, so the original measurement cannot be reproduced. Row #17388 is `someday_maybe`.
