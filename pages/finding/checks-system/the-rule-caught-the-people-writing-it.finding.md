---
page-type-slug: finding
title: "The rule caught the people writing it"
domain-slug: domain/checks-system
---

# Claim

Three seats writing a rule against absences read as answers made six near-misses of that exact kind in one night, each caught only by a number that failed to move.

The corpus states the rule 66 times without a directive to cite. That says the code obeys it. These six say it is not obvious to the people arguing for it, which is what `Cut The Obvious` asks before a line earns its cost.

# Evidence

Observed 2026-08-27 into 2026-08-28 by seats thea and astra and their agents, while measuring the checks system.

**A piped read records nothing.** `ops read` refuses to record when its output goes to a pipe. An agent testing whether readings accumulated ran it piped twice and read the count: 2, 2, 2 — indistinguishable from a clobber. Unpiped it went 2 to 8. It nearly filed a data-loss claim that was false. The same trap caught the same agent on `ops read --seat`, and caught two other seats separately.

**A no-op patch that measured as a fix.** `property-types-bind` read 2231 property definitions where 2288 exist. The symptom matched a defect fixed hours earlier in `treeOver`, where a `FileTree` was built without its `roots` and `globsIn` therefore kept each glob's directory. That patch was written for this file too. Measured before landing: 2231 both ways. The real cause was unrelated — `PROPERTY_GLOBS` is `placeOf(...)`, rooted at the place folder, so nothing under `graph/` or `readouts/` matches however the globs are wrapped. Two defects, one symptom, one number.

**A control that certified the defect it was there to exclude.** A `# Re-check`, written on `number-presentation-config-reaches-no-file-reader` to correct an earlier error on that page, stated "across 2,228 property documents no key reads `format`, `decimals`…". 2,228 is the count under `pages/page-property-definition/`. The corpus is 2,285: the page type's declared glob is `akasha:**/*.page-property-definition.md`, and 57 documents stand beside their own domains under `graph/` and `readouts/`. The tree was not moving — at `29e89a430`, the commit that wrote that re-check, `git ls-tree -r` gives 2,285 repo-wide and 2,228 under the directory, so the figure was wrong against the tree it was taken on rather than overtaken by one.

A seat sent to verify that figure then reported it reproducing, and offered as proof that its search had run a positive control: "2,228 docs match `^type:`". All 2,285 match `^type:` — the control was produced by the same directory-scoped search as the claim it was checking. It inherited the blind spot of its own subject, and it read as proof precisely because a control that fires reads as proof. This is the same error as the paragraph above, at its third occurrence, and the first time it passed through the instrument built to catch it.

**A truncated list read as a whole list.** A per-item list showed 373 failures where the summary line beneath it said 3. An agent was dispatched against 373.

**A reading taken after its subject moved.** A count was re-read after the tree had changed under it, and the difference attributed to a mistake that had not been made.

Not measured: how many similar near-misses were not caught. By construction there is no record of those.
