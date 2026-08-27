---
id: 9979cdb5-0c05-549d-a157-38a8fd7f753e
page-type-slug: finding
title: "Verify bullet restates its own link"
domain-slug: barred-meaning/project
---

# Claim

Both parent tasks close their `Verify` bullet with "A developer cannot disagree with itself about what it just did, which is the whole of why the verdict is yours" — a reason `verify-handback.md` binds as an invariant and `manager.md` as a responsibility, in a sentence that already links to `verify-handback`.

# Evidence

Measured 2026-08-06. The bullet stands verbatim at `domains/tasks/projects/build-parent-commit.md:27` and `domains/tasks/projects/build-parent-deploy.md:28`:

"**Verify** each hand-back with verify-handback as it arrives rather than at the end. A developer cannot disagree with itself about what it just did, which is the whole of why the verdict is yours." — where "verify-handback" is a live link to `domains/tasks/lead/verify-handback.md`.

That surface carries the claim as an invariant, at its line 34: "**You did not do this work and you may not do it now.** Finishing what a hand-back left undone is the fastest route to a green verdict and destroys the only thing this task produces: an assessment made by somebody who could disagree with it."

The reading also reports `domains/roles/manager.md` binding the same thing as a responsibility.

Single Authority on `domains/agent-harness.md` — "Bind each claim from exactly one surface" — is what makes this a candidate rather than a preference. The sentence carrying the restatement is the same sentence that links to the surface holding the original, so a reader who wants the reason is one click from it.

What a trim would leave is the act alone: verify each hand-back as it arrives rather than at the end. The "as it arrives" timing is this document's own and is not carried by `verify-handback.md`, which says nothing about when a manager runs it.

Filed rather than trimmed by the reading that found it, for a reason it stated: the sentence is mirrored, so it is one change across a matched pair rather than a cut on one document. Landing it on one site alone would strip the reason from that document's readers while leaving it standing for the other's.

Related: `pages/finding/project/six-build-tasks-share-one-procedure.finding.md` measures the wider duplication this family carries, of which this is one instance with a named original.
