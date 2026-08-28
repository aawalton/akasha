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


`tools/audits/suite-runs.ts:17` sets `SUITE_GLOB = "tools/**/*.test.ts"`, and `unitFiles` scans that.

    tracked *.test.ts and *.test.tsx      2,415
    matching the suite glob                 689

Outside it: `temper` 462, `shared` 446, `alanwalton` 305, `infra` 169, `lua-compiler` 130,
`collections` 61, `editor-extension` 37, `pages-system` 17. So the editor extension's panels and the
whole of `pages-system` are run only when someone chooses to; passing them is a habit, not a gate.

THE FALLBACK, AND ITS CAUSE. `~/.instruction-checks/green` holds `d9e356a9`, which is not an object
in this repository. `readGreen` tests only the shape `/^[0-9a-f]{40}$/`, so a sha from a dead history
passes, and nothing rewrites the file on a failed read. `selection` therefore returns the whole
suite on every run and always will. Seven runs across seven commits on 2026-08-28 took it, including
three on a quiet box at `089353b6`, `457a6017`, `246f7564`. Thea filed the cause.

NO TIMING TAKEN SO FAR MEASURES THIS SUITE. The loop breaks when the shared deadline is spent, so a
reading is a deadline being hit rather than work being done — which is why three idle readings came
in at 122.8s, 123.0s and 123.1s, a 0.3s spread, near load-independent. A workload stretches under
load; a deadline does not. What this suite costs is not known.

IT SAYS IT STOPPED SHORT. `report` at `:95-99` computes `unreached` and pushes a `suite-unfinished`
refusal naming both numbers. What is quiet is the cause, which arrives after an em-dash in the words
of a passing git fault.

MEASURED 2026-08-28 at commit `697482b1`.
