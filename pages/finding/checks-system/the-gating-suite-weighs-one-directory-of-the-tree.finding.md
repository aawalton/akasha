---
page-type-slug: finding
title: "The gating suite weighs one directory of the tree"
domain-slug: domain/checks-system
---

# Claim

The check that gates a landing weighs the test files under `tools/` and no others. Every test file
elsewhere in the repository is outside its population, so nothing they would catch can refuse a
change.

A suite that never weighed a file reports the same green as one that weighed it and found nothing
wrong.

# Evidence

`tools/audits/suite-runs.ts:17` sets `SUITE_GLOB = "tools/**/*.test.ts"`, and `unitFiles` scans
exactly that.

    all tracked *.test.ts and *.test.tsx      2,415
    matching the suite glob                     689   (28.5%)

Outside the population, by directory: `temper` 462, `shared` 446, `alanwalton` 305, `infra` 169,
`lua-compiler` 130, `collections` 61, `editor-extension` 37, `pages-system` 17.

So the panels of the editor extension and the whole of `pages-system` are tested only when someone
chooses to run their tests. Passing them is a habit rather than a gate, and dropping the habit would
not change what the gate says.

A SECOND OBSERVATION, RECORDED AND NOT CHASED. One run reported `778 test(s) across 72 of 582
file(s) — git could not read what changed since d9e356a9, so every test runs`, then `ran out of its
budget having finished 72 file(s), leaving 510 unreached`. `unitFiles` sorts (`suite-runs.ts:31`),
the loop takes batches of eight (`BATCH = 8`), and it breaks when `deadlineAt - Date.now() <= 0`,
where the deadline is shared with the whole checks run — which was itself over its 120s ceiling at
124.3s. In that state the alphabetically first 72 files run and the 446 under `tools/tests` are
never reached, and a verdict is printed regardless.

That second observation is the FALLBACK path. `selection` normally narrows to the tests a change
reaches, and that subset presumably finishes. Why git could not read what changed since `d9e356a9`,
and for how long it has been so, is not established here.

MEASURED 2026-08-28 at commit `697482b1`, on a workstation carrying six seats and their agents.
