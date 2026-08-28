---
page-type-slug: finding
slug: retired-folder-names-split-into-renamed-and-dissolved
title: "Five retired folder names have heirs, one was dissolved, and the name does not say which"
domain-slug: domain/domain-dictionary
---

# Claim

Five of the six largest retired folder names are recoverable by rename: the old document's lines survive verbatim in akasha under a new slug. `instructions-harness` was dissolved instead, and its 68 findings have no single heir. Nothing in a folder name distinguishes the two, so a table from old folder name to new domain is right for the renamed ones and wrong for about half of every dissolved one. The 731 are two jobs, not one: a bulk move, and a reader per finding.

# Evidence

Checked here 2026-08-28. The recoveries reached this seat as a report; each was verified against the tree.

THE HISTORY IS GENUINELY ABSENT. akasha's first commit is `a1d265eda3`. `git log --all --name-only -- 'domains/*'` returns nothing, and so does the same with `--diff-filter=D`: no commit on any ref has touched a path under `domains/`. Nothing survives in history.

THE METHOD. Search for the old document's LINES — which the findings themselves often quote — rather than for its path.

`domains/readouts.md` became `readouts/readout-system.domain.md`. Two Design lines stand word for word, and each is quoted against the old path by `readouts/refused-drop-reads-two-ways:11` and `readouts/row-reads-two-ways:11`:

```
:20  A readout keeps the last body it was given when its feed stops, and drops it when refused.
:22  A row a readout cannot read costs its own reading only.
```

A third line survived only in substance: findings quote "Alan is never the instrument that catches a readout being wrong", where `:38` reads "A readout's reader is never the instrument that catches it being wrong."

`domains/code-check.md` became `pages/domain/old-check.domain.md`. `code-check/intent-here-read-two-ways:11` quotes "What a review finds again across checks stands here as a unit"; `old-check.domain.md:25` carries that sentence and finishes it, "rather than in each review that found it."

Three more recover the same way: `code-harness` to `change-harness` and `infra` to `infrastructure` by champion continuity, `tests` to `test` by restated rules.

THE DISSOLUTION. `old-check/docblock-finding-outlived-its-subject:15` records, on 2026-08-21 and so before the migration of the 27th, that no `instructions-harness` document stood under `pages/domain/`. 68 findings stand in that folder and no page of any type carries its name.

UNMEASURED, AND IT IS THE COST. How many of the 96 folders were dissolved rather than renamed is unknown: one confirmed of 96.

The population is bound by `checks-system/a-remedy-that-erases-what-it-repairs` at `58583b70f`.
