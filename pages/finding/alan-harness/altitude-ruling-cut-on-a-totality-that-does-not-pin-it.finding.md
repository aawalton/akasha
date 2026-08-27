---
id: 279f8fcc-9fad-5111-a7b8-d5c711118a78
page-type-slug: finding
title: "Altitude ruling cut on a totality that does not pin it"
domain-slug: domain/alan-harness
---

# Claim

Alan's dated ruling of 2026-08-02 — "I like children still as the name. A singleton is at the same altitude as a child." — was cut from quarantine and is recorded in no live place. It was cut on the ground that `COLUMN_BY_TRACK`'s `satisfies Record<ProjectTrackName, ProjectCountColumn>` makes the mapping a compile error to undo. Totality refuses only an OMITTED track: `singleton: "parent"` still compiles. So the literal stands with no reason beside it, and the naming half is carried by nothing.

# Evidence

Read first-hand from `/var/home/walton/code` on 2026-08-08.

`packages/shared/status-bar-access/src/project-progress-fold.ts:75-79`:

    const COLUMN_BY_TRACK = {
      parent: "parent",
      child: "child",
      singleton: "child",
    } as const satisfies Record<ProjectTrackName, ProjectCountColumn>

`satisfies Record<K, V>` requires every key of `K` and refuses an unknown one. It does not pin which inhabitant of `V` a key maps to. Rewriting line 78 to `singleton: "parent"` type-checks. What the compiler refuses is deleting the line, not inverting the decision it records — and inverting it is what the ruling exists to prevent.

The ruling's second half is not about the mapping at all. "I like children still as the name" settles what the column is CALLED against an alternative that was under discussion. Nothing in the type system has an opinion about a name.

The wording was cut from `dirty/code/packages-alanwalton-native-shell-docs-widgetkit-widgets.md` and is recoverable at commit `a2f33d04b9` in `~/instructions`. The seat that cut it searched for the phrase first and reported `rg -uuu -i "same altitude"` returning nothing across `~/instructions` outside `dirty/`, `~/memory`, `~/books` and `~/stories`, which is why it flagged the cut to me rather than making it silently.

This is filed rather than kept because a ruling of Alan's does not belong in a package's documentation directory, which is where the sweep found it. Where it belongs is a decision for whoever owns the projects readout. `pages/finding/alan-harness/quarantined-habit-order.finding.md` is the near neighbour and is a different claim: there the live constant already carries Alan's stated order and six quarantined documents disagree with it. Here the live constant carries a value whose reason went with the document.

Alan's standing lean in this sweep is toward removal, on the ground that lost content is reconstructed clean. A ruling of his is the case that lean reaches least well, because what gets reconstructed is somebody else's reasoning in his mouth.
