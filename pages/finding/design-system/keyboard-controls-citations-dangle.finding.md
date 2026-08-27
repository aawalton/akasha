---
id: acef5068-4d8d-53f6-9820-21ed6e15e07a
slug: keyboard-controls-citations-dangle
page-type-slug: finding
title: "Keyboard controls citations dangle"
domain-slug: domain/design-system
---

# Claim

Five live code files cite a "Keyboard Controls" standard that exists nowhere. It was `dirty/docs/keyboard-controls.md` in the instructions repo, removed by commit `7dee2b23` and rebuilt as `dirty/knowledge/keyboard-bindings.md`, which this ingest has now emptied and removed in turn. No repo carries the name. The citations are load-bearing: each defers a rule to the standard rather than stating it, so a reader following the pointer arrives at nothing.

# Evidence

The five citing files, found by searching the code repo for "Keyboard Controls" and "see the standard":

- `packages/shared/design/primitives/src/utils/keyboard-registry.ts:5` — "Encodes the house keyboard standard — see Keyboard Controls."
- `packages/shared/design/primitives/src/utils/keyboard-registry.ts:10` — "The three-layer authority a binding belongs to (see the standard)."
- `packages/shared/design/primitives/src/utils/shortcut-surfaces.ts:4` — "See Keyboard Controls."
- `packages/shared/pages/core/src/property-types/block-shortcuts.ts:24` — "`Ctrl+Home`/`Ctrl+End` on win/linux); see Keyboard Controls."
- `packages/shared/pages/core/src/property-types/block-shortcuts.unit.test.ts:132` and `:193` — "Keyboard Controls L0 table" and "Keyboard Controls Principle II".
- `packages/shared/pages/ui/src/block-editor/use-block-keys.ts:146` — "L0 parity, Keyboard Controls".

That the target is gone: `find` for any filename containing "keyboard" in the code repo returns only source, test, build-output and `dist` files, no standard. `packages/shared/design/primitives/CLAUDE.md` does not exist. In the instructions repo the name survives only in `dirty/docs/design-principles.md`, whose entry links `keyboard-controls.md`, and in `dirty/code/packages-shared-design-primitives-claude.md` — both under quarantine and queued for removal. `git log -1 -- dirty/docs/keyboard-controls.md` reports `7dee2b23 keyboard-controls: rebuilt as knowledge/keyboard-bindings.md`, and that successor no longer stands either. The memory repo has no match.

WHAT I DID NOT MEASURE. I did not read the deleted standard, so I cannot say how much of what those comments defer to it was ever written down, nor whether any of it survives elsewhere under a different name. I did not check the code repo's git history for an earlier copy of the document on that side. I did not survey citations in prose docs across the code repo beyond the source files these searches reached.
