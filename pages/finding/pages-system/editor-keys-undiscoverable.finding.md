---
id: afb079c1-2ac6-5d77-8d56-55561e8b47ea
slug: editor-keys-undiscoverable
page-type-slug: finding
title: "Editor keys undiscoverable"
domain-slug: domain/pages-system
---

# Claim

The block editor's entire keyboard grammar is absent from the two surfaces that present the products' shortcuts. Split, indent, move, duplicate, turn-into and select-all-blocks are matched by pure matchers in `@shared/pages-core` behind the editor's own handlers, never registered with the design system's keyboard registry, so none appears in the `?` shortcut sheet or the `Mod+K` command palette. Both surfaces render only what the registry holds, and neither says it is partial.

# Evidence

ZERO files under `shared/pages-ui/src/block-editor/` import `useKeyboardBinding` or anything from the keyboard registry — `rg -l 'useKeyboardBinding|use-keyboard-registry'` over that directory returns a count of 0, so the registry holds none of the editor's grammar rather than some of it; the block editor's imports from `@shared/design-primitives` are `Button`, `Textarea`, `cn`, `surfaceClass` and `useDebouncedCallback`. Its keys are decided by an `onKeyDown` at `use-textarea-input.ts:118` against `matchBlockShortcut` and `matchDocumentExtreme`, and by a second `document` listener at `use-block-selection.ts:161` against `matchSelectionKey`, attached only while a selection is live.

Both surfaces read the registry alone. `useKeyboardBindings` in `shared/design-primitives/src/hooks/use-keyboard-registry.ts:192-212` projects the `registrations` map through `getDescriptors`. `shortcut-sheet.tsx` and `command-palette.tsx` consume that projection, the sheet through `groupByLayerAndGroup` in `shortcut-surfaces.ts`, which groups only what it is handed. Nothing merges a second source in.

The scale of the gap: the non-test chords registered anywhere in this repository are `PALETTE_ONLY` at four sites, `Mod+Alt+A`, `Mod+Alt+T`, `Mod+K` and `?`. The editor's grammar is larger than the whole registered set and none of it shows.

WHAT I DID NOT MEASURE. I did not render either surface, so I have not seen the sheet with the editor open — I inferred the omission from what the projection carries. I did not check whether the block editor documents its keys somewhere else in the interface, such as a help panel or a slash-menu hint, which would change how much the omission costs a user. I did not enumerate the editor's shortcuts myself; the six named come from the document being ingested, and I confirmed the matchers exist rather than that the list is complete.
