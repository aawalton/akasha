---
id: f54ba237-7253-58d9-91b8-87881373e5f0
slug: pipeline-bands-unpublished
page-type-slug: finding
title: "Pipeline bands unpublished"
domain-slug: domain/global
---

# Claim

`code-harness` publishes no pipeline bands. A task citing them was repaired by cutting the citation rather than restoring what it cited, so a reviewer costing a check now gets a wall-clock equivalent with nothing published to read it against.

# Evidence

Commit `b4b1d21f`, authored by Alan on 2026-08-05, removed one paragraph from `domains/code-harness.md`:

"A change is real when it is deployed, and everything between the commit and that point exists to establish that it does the right thing. What that costs is bounded, and the bound is published rather than felt: a branch pipeline is great under 90 seconds, good under 180 and acceptable under 300, and a main pipeline great under 5 minutes, good under 10 and acceptable under 15. At the far edge of either the line stops until the crossing is back inside a band. Every check stands inside that budget rather than beside it, so what one buys is weighed against what every crossing pays for it."

`domains/tasks/code-harness/review-check.md` stage 5 went on citing them — the wall-clock equivalent was "the one figure the bands code-harness publishes can be read against". Commit `eee67bf1` on 2026-08-06 cut exactly the clauses the missing bands supported; `links-resolve` went 4 of 4 to 3 of 3.

The bands stand nowhere else. A search for "band" across `domains/` outside `dirty/` returns only persona prose and an unrelated sentence-length band. `ops pipeline perf --help` shows the verb emits raw timings and no thresholds.

Restoring them is an Add resting on judgment twice — whether a published budget should stand at all, and what the six numbers should be — and the paragraph was cut deliberately the day before, so a reading restoring it would be reversing an author's decision rather than repairing a defect.

Raised by the `review-instructions` reading of `domains/code-harness.md` on 2026-08-06.
