---
page-type-slug: finding
title: "The rule caught the people writing it"
domain-slug: domain/checks-system
---

# Claim

Three seats writing a rule against absences read as answers made five near-misses of that exact kind in one night, each caught only by a number that failed to move.

The corpus states the rule 66 times without a directive to cite. That says the code obeys it. These five say it is not obvious to the people arguing for it, which is what `Cut The Obvious` asks before a line earns its cost.

# Evidence

Observed 2026-08-27 into 2026-08-28 by seats thea and astra and their agents, while measuring the checks system.

**A piped read records nothing.** `ops read` refuses to record when its output goes to a pipe. An agent testing whether readings accumulated ran it piped twice and read the count: 2, 2, 2 — indistinguishable from a clobber. Unpiped it went 2 to 8. It nearly filed a data-loss claim that was false. The same trap caught the same agent on `ops read --seat`, and caught two other seats separately.

**A no-op patch that measured as a fix.** `property-types-bind` read 2231 property definitions where 2288 exist. The symptom matched a defect fixed hours earlier in `treeOver`, where a `FileTree` was built without its `roots` and `globsIn` therefore kept each glob's directory. That patch was written for this file too. Measured before landing: 2231 both ways. The real cause was unrelated — `PROPERTY_GLOBS` is `placeOf(...)`, rooted at the place folder, so nothing under `graph/` or `readouts/` matches however the globs are wrapped. Two defects, one symptom, one number.

**A truncated list read as a whole list.** A per-item list showed 373 failures where the summary line beneath it said 3. An agent was dispatched against 373.

**A reading taken after its subject moved.** A count was re-read after the tree had changed under it, and the difference attributed to a mistake that had not been made.

Not measured: how many similar near-misses were not caught. By construction there is no record of those.
