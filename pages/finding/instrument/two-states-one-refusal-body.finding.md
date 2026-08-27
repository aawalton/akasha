---
id: 4cbd880d-be35-5bf9-9d21-d251231ddb7e
page-type-slug: finding
title: "Two states one refusal body"
domain-slug: domain/instrument
---

# Claim

`hooks-uncopied.ts` routes two states to one refusal body, and `refusals/hook-copied-into-code.md` is false on the second: where a hook is registered into the code repository and its file is tracked there at that path, the body says "Nothing fires that copy … it drifts from the guard that does fire" about the file that is the guard that fires.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/hook-copied-into-code.md` dispatched from `review-documents`. The reading found it and declined to reword; the check, its test and the body were read here.

The body: "`{name}` is registered as `$HOME/{registered}` and the code repository tracks a file of that name at `{path}`. Nothing fires that copy and nothing compares the two, so it drifts from the guard that does fire and whoever reads it cannot tell which of them is standing."

`tools/checks/hooks-uncopied.ts:64-67` says the case outright: "A registration naming the code repository is this check's hardest case — there the hook and the copy are one file — and dropping it here would make that case unreachable rather than clean." `tools/tests/hooks-uncopied.test.ts:118` asserts that arm reaches a fail, and this is the only refusal the check emits.

`hooks-registered` already reports the same state correctly, printing `hook-registered-in-code`. So one state is reported twice and one of the two reports is false.

Rewording will not fix it: the words are right for the case they were authored for, and covering both would make the body worse for the case that actually fires.

Nothing stands wrong today. `ops instructions run-checks --check hooks-registered` reports "0 naming the code repository", so the arm is reachable and tested but unfired.

The reading's recommendation, which is a recommendation and not a ruling: have `hooks-uncopied` skip the pairing where registration and tracked file resolve to one path, rather than leaving the state wholly to `hooks-registered` — local to the check, and it keeps the registration inside the population the check's own header argues for.

Not measured: whether any other check routes two states to one body, or what the skip would cost the header's stated population.
