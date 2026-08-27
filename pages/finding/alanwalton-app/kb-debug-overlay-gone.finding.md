---
id: f311a100-c910-5f24-825b-fbba475d8901
page-type-slug: finding
title: "Kb debug overlay gone"
domain-slug: domain/alanwalton-app
---

# Claim

The `ops mobile sim` verbs still offer the keyboard-geometry debug overlay as a live readout, and the overlay is gone from the app. `open-url --kb-debug` appends `?kbDebug=1`, `sim eval` ships an example querying `[role="status"][aria-label="Keyboard geometry debug"]`, and the registry calls `sim eval` "the kbDebug-counter readout" — while nothing outside `mobile-cli` mentions `kbDebug` anywhere in the code repository. An agent following the example reads nothing back from a selector matching nothing.

# Evidence

Measured 2026-08-08 while ingesting `dirty/code/packages-alanwalton-mobile-cli-docs-sim-driving.md`, whose §6 worked example is written against this overlay.

The three live surfaces, in the code repository:

- `packages/alanwalton/mobile-cli/src/mobile/sim/open-url.ts:23` — the `--kb-debug` flag description, "Append `?kbDebug=1` so the block editor mounts the keyboard-geometry debug overlay (#15536 readout)". The flag is wired: `:74` parses it and `:90` passes it through to `buildAppUrl`.
- `packages/alanwalton/mobile-cli/src/mobile/sim/eval.ts:30` — a shipped example, `ops mobile sim eval 'return document.querySelector('[role="status"][aria-label="Keyboard geometry debug"]').innerText'`.
- `packages/alanwalton/mobile-cli/src/mobile/registry.ts:79` — the `sim eval` summary, "The kbDebug-counter readout".

The URL builder is real and tested: `src/lib/sim-driver.ts:63-68` `buildAppUrl` appends `kbDebug=1` with the right separator, covered by `sim-driver.unit.test.ts`. So the query parameter is delivered correctly to an app that does not read it.

The absence, run in the form that cannot lie about ignore rules. `rg -uuu -l "Keyboard geometry debug" .` over the whole `~/code` repository returns exactly one path, `packages/alanwalton/mobile-cli/src/mobile/sim/eval.ts` — the example itself. `rg -uuu -l "kbDebug" .` over the same root, with `mobile-cli` filtered out, exits 1. Scoped to the SPA, `rg -uuu -l "kbDebug" packages/alanwalton/web/` also exits 1. The one `dist/` hit under `mobile-cli` is untracked build residue and is not evidence.

Why it went unnoticed: every wired sim-suite scenario opts out. `src/mobile/sim/suite/scenarios.ts:99`, `:183`, `:226` and `src/mobile/sim/suite/cold-load-guard.ts:258` all pass `kbDebug: false`. Nothing in the suite ever asks the overlay for a value, so its disappearance costs no test.

Not filed already: `rg -uuu -l -i "kbDebug|keyboard.geometry|kb-debug"` over `~/memory` exits 1.
