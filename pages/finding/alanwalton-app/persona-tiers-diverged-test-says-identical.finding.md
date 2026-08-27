---
id: 92caf635-0bb4-5e6e-a66b-51cec56215b8
page-type-slug: finding
title: "Persona tiers diverged test says identical"
domain-slug: domain/alanwalton-app
---

# Claim

The persona file tier and the persona row tier hold different orders of magnitude of `conduct`, and `persona-resolve.unit.test.ts` states in its own docblock that they are byte-identical copies. Nine of the forty committed `*.persona.ts` fragments carry no `conduct` at all while their rows carry up to 8,133 characters, so the whole-tier precedence the module implements would boot those nine holding none.

# Evidence

Measured 2026-08-08 against `~/code` and the live page rows, while emptying `dirty/code/packages-alanwalton-personas-docs-register-storage-tiers.md`.

Row tier, read as a row rather than searched for in the repo: `ops page list --type persona --all --properties slug,conduct --json`, 42 rows, exit 0. Non-empty `conduct` runs 908 characters (`elin`) to 8,133 (`aelwyn`); four are empty.

File tier, read by running the live manifest rather than grepping it: `bun -e` importing `personas/core/src/persona-specs/manifest.ts` and calling `discoverPersonaSpecs()`, 40 fragments. `conduct` runs 0 to 2,796. Nine carry none: `aelwyn`, `ali`, `amy`, `aranya`, `astra`, `aura`, `elin`, `ember`, `vera`. Paired: `abby` 155 against 6,332, `ali` 0 against 5,540, `aelwyn` 0 against 8,133.

The docblock refuted is `persona-resolve.unit.test.ts` lines 5-11, which says of the fragments: "The fragments are byte-identical copies of their rows". The test body does not check that — it substitutes the synthetic constants ROW-TIER-DIVERGENCE-PORTRAIT and ROW-TIER-DIVERGENCE-CONDUCT — so nothing in the suite notices the premise going false.

`pickPersona` is `return file === undefined ? row : { portrait: file.portrait, conduct: file.conduct }` — whole-tier, so a fragment with no `conduct` field resolves to none even where the row holds thousands of characters.

WHAT THIS ADDS to `pages/finding/alanwalton-app/persona-file-tier-unread.finding.md`, which stands and which I opened rather than inferred. It establishes the file tier has no live call site and closes with "Not established: what DOES supply a persona at boot now." The drift is measured here for the first time in this corpus, on both substrates, and that open question has an answer: a seat's persona is `domains/personas/<slug>.md`, 41 tracked files under the live schema `tools/document/schemas/persona.ts`. Three stores, not two.

NOT MEASURED: whether `portrait` drifted the same way, or whether any persona has a row and no fragment.
