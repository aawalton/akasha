---
id: b3e28cc0-6009-5b8f-96a8-9af18a2be1fa
slug: key-layer-unenforced
page-type-slug: finding
title: "Key layer unenforced"
domain-slug: domain/design-system
---

# Claim

The keyboard registry declares a three-layer authority model that nothing enforces. `KeyBinding.layer` is typed `"reserved" | "conventional" | "house"` and commented as "the three-layer authority a binding belongs to", but the only code reading it is `groupByLayerAndGroup`, which sorts the `?` sheet into display sections. No matcher consults it, nothing refuses a house binding on a chord a reserved one holds, and `matchBindings` returns every match for `handleKeyDown` to fire.

# Evidence

`shared/design-primitives/src/utils/keyboard-registry.ts:3` declares `export type KeyLayer = "reserved" | "conventional" | "house"` under the comment `/** The three-layer authority a binding belongs to (see the standard). */`.

Searching the code repo outside its tests for reads of the field returns two product sites, both in `shared/design-primitives/src/utils/shortcut-surfaces.ts`: line 45 filters descriptors into one section per layer, line 50 collects the layer-less into a trailing "Other" bucket. Both sit inside `groupByLayerAndGroup`, whose own comment describes it as grouping for the sheet. `shared/design-primitives/src/hooks/use-keyboard-registry.ts:203` copies the field into the descriptor and reads it nowhere.

That nothing enforces it: `matchBindings` in `keyboard-registry.ts` is a single `bindings.filter(...)` testing `enabled`, `inTextInput`, `scope`, the character-key toggle and the chord itself, and returns every survivor. `handleKeyDown` in `use-keyboard-registry.ts` loops over the whole returned array calling each `onTrigger`, calling `preventDefault` once. There is no ordering step and no collision check anywhere in either file.

WHAT I DID NOT MEASURE. I did not establish whether the unenforced model is a deliberate deferral or an omission — the standard it points at is not reachable, so I could not read what it prescribes. I did not check whether two bindings today actually collide on one chord; the non-test chords registered are `PALETTE_ONLY`, `Mod+Alt+A`, `Mod+Alt+T`, `Mod+K` and `?`, which do not, so this is a latent gap rather than an observed misfire. I did not run the applications.
