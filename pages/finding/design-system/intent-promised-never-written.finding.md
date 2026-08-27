---
id: e2a1b1de-9871-5b60-a352-c1a6faedcca9
page-type-slug: finding
title: "Intent promised never written"
domain-slug: domain/design-system
---

# Claim

The design-system definition was trimmed on the stated ground that what the parts are for belongs in an Intent, and no Intent was ever written.

Commit f4924689b cut "with the design rules already kept in them" from the Definition bullet, and its subject records the reason: "the parts, with what they are for left to an intent". `domains/folders/design-system.md` carries no `# Intent`, so the clause left the corpus rather than moving, and the only record of where it was bound is a commit subject.

# Evidence

`domains/folders/design-system.md` as it stands at 8cab65fb has two sections, Definition and Rules. `git show f4924689b -- domains/folders/design-system.md` shows the bullet going from "the reusable parts an interface is assembled from, with the design rules already kept in them" to "the reusable parts an interface is assembled from". `git log -1 --format=%s f4924689b` is "design-system: the parts, with what they are for left to an intent", and the commit has no body.

The cut itself is correct against `domains/domain-definition.md`, which holds that a Definition carries no clause saying what the thing is for. The observation is about the destination, not the cut.

Raised by a review-instructions seat on the document, 2026-08-07, which did not write the Intent: an Intent entry names a state the domain should be in and is not yet in, and whether "the design rules are already kept in the parts" is not yet true is a judgment about the package rather than something an instrument settles. `Every Changed Line` on `domains/domain.md` also requires Alan be shown each line changed in a domain's Intent.

Not measured: whether the clause is true of `packages/shared/design/` today, which would decide whether it is an Intent entry at all or simply gone.
