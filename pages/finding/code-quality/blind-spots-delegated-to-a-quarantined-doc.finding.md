---
id: 695ad6e6-33ba-5d17-92bb-7c0958f0e7dc
slug: blind-spots-delegated-to-a-quarantined-doc
page-type-slug: finding
title: "Blind spots delegated to a quarantined doc"
domain-slug: domain/code-quality
---

# Claim

`digest-contributor-parent-owner.ts` declines to state its own six blind spots, because they are "catalogued in the personas package docs (`docs/packages.md`)". That document has been moved into quarantine and binds nobody. The deliberateness is what makes it worse than a dangling citation: the module traded away carrying the catalogue for a home that no longer exists, and the section it guards elides when it has nothing to say, so the silence the catalogue qualifies is all a reader sees.

# Evidence

Read 2026-08-08 at the `~/code` working tree, emptying `dirty/code/packages-alanwalton-personas-docs-packages.md` — the document named.

The delegation, at `digest-contributor-parent-owner.ts:39-43`: "DECLARED BLIND SPOTS. This is a detector and not a census, and the six things it structurally cannot see are catalogued in the personas package docs (`docs/packages.md`) rather than here — the reader who has to know the limits before trusting the silence is the one reading a digest, not this file."

The target. `git ls-files "packages/alanwalton/personas/**/*.md"` returns empty at exit 0 and `rg -uuu --files` over that package filtered to `.md` exits 1: no markdown survives there. `rg -Fn "docs/packages.md"` over `~/code/packages` returns that line and one unrelated test fixture path.

The six are properties of the executable predicate, not of a comment. `where: [{ key: "owner", eq: ownerName }, { key: "status", notIn: [...TERMINAL_PROJECT_STATUSES] }]` makes an ownerless row invisible and drops terminal rows; `.filter((row) => !isEphemeral(row.ephemeral))` drops ephemeral ones; the owner predicate is on the CHILD, so an umbrella's owner is never queried; `readParentReadings` makes two reads and does not recurse.

Nothing else carries them. `parentOwnerContributor.note`, what a digest reader sees, frames scope and states both readings are valid, and carries none of the six. Across all seven roots, `rg -uuu -il` for "detector, not a census" and "cross-owner-parent" returns only the quarantined document and the line above; five roots exit 1.

`runDigestContributors` renders an empty body as nothing, so a contributor returning `[]` elides its section: agreement and structural invisibility print identically.

Distinct from `code-quality/declared-gap-spends-the-question.md` and from the dangling-citation family, which is about references rather than content a module deliberately did not write. `rg -uuu -l` for "docs/packages.md" and "parentOwnerContributor" over `findings/` exits 1.
