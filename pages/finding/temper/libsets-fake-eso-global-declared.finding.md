---
id: e85177fa-8eb7-541d-8775-8fa0cf0acc3c
slug: libsets-fake-eso-global-declared
page-type-slug: finding
title: "Libsets fake eso global declared"
domain-slug: domain/temper
---

# Claim

In LibSets, `copytext/dialog.ts` uses `SI_LORE_READER_PREV_PAGE` on its multi-page branch, a symbol that is not a real ESO global — it is locally `declare`d in `src/types/lib-sets-copytext.d.ts:18`, which satisfies TypeScript but asserts nothing about runtime existence, and the repo's generated globals list (which would show the absence) is never checked against `SI_*` references.

# Evidence

From project #16029 (domain `temper`, status `someday_maybe`, captured 2026-07-25, owned by ember, child of #15872 "Temper in-game readiness audit — find/fix/verify via Nimue's agent-control engine; Milestone-1 (GATED)"). Encountered by a constants/ reader, 2026-07-25.

`copytext/dialog.ts` uses two different constants for the same button, 16 lines apart: line 160 (single-page branch) uses `GetString(SI_LORE_READER_PREVIOUS_PAGE)`; line 176 (multi-page branch) uses `GetString(SI_LORE_READER_PREV_PAGE)`. Checked against `packages/temper/shared/build-deploy/checks/src/eso-base-game-globals.generated.ts` (generated from the `~/esoui` clone): `SI_LORE_READER_PREV_PAGE` is absent, while its siblings `SI_LORE_READER_PREVIOUS_PAGE` and `SI_LORE_READER_NEXT_PAGE` are both present — the siblings being present is the positive control that makes the absence meaningful rather than a gap in extraction.

Why nothing caught it: the port declares the constant itself at `src/types/lib-sets-copytext.d.ts:18` (`declare const SI_LORE_READER_PREV_PAGE: number`), which satisfies TypeScript. A local `declare` asserts that the symbol is promised to exist, not that it actually does at runtime, and is indistinguishable from a real global at the type level. The generated globals list feeds only `check-tstl-this-void-colon-method` (receiver provenance); no check validates `SI_*` existence at all, though the generated list already exists and doing so would be cheap.

Player impact: reachable only on the multi-page branch, i.e. copying a set text over 20,000 characters. At runtime the global is `nil`, so `GetString(nil)` is called; the reader explicitly could not determine whether ESO's `GetString` raises on a nil stringId or returns empty, with no live client available and nothing in-repo to settle it. Either way the Previous-Page button is wrong on long copies. Recorded as low reach, cheap fix, with the check it implies being the more valuable part of the finding.
