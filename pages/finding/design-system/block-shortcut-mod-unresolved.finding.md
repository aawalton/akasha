---
id: 6281ac57-b458-57b1-b981-1a2373bf00a7
slug: block-shortcut-mod-unresolved
page-type-slug: finding
title: "Block shortcut mod unresolved"
domain-slug: domain/design-system
---

# Claim

The block editor's shortcuts accept either modifier on every platform, so `Ctrl+D` duplicates a block on mac and `Meta+D` does on Windows and Linux. `matchBlockShortcut` and `matchSelectionKey` both open `const mod = m.meta || m.ctrl` rather than resolving per platform the way the design system's `resolveMod` does. On mac this collides with the reserved native `Ctrl+D` (delete-forward-char), which the matcher runs in front of inside a block's own textarea handler.

# Evidence

`packages/shared/pages/core/src/property-types/block-shortcuts.ts:59` and `packages/shared/pages/core/src/property-types/block-selection.ts:188` each begin their matcher with `const mod = m.meta || m.ctrl`, and every branch below tests that disjunction rather than a platform-resolved modifier. Neither file takes an OS argument. The duplicate branch is commented "duplicate: cmd/ctrl + D, no shift, no alt" at `block-shortcuts.ts:74`, and `block-selection.ts:179` documents duplicate as `cmd/ctrl + D` likewise.

The contrast is `resolveMod` in `packages/shared/design/primitives/src/utils/keyboard-registry.ts`, which returns `"meta"` on mac and `"ctrl"` elsewhere, so a registry binding declared `Mod+D` fires on exactly one chord per machine. The two systems are independent: no file under `packages/shared/pages/ui/src/block-editor/` imports the registry.

`matchDocumentExtreme` in the same file is not affected and shows the shape works when the key spaces are disjoint: it takes `Cmd`+`ArrowUp`/`ArrowDown` under `m.meta && !m.ctrl` and `Ctrl`+`Home`/`End` under `m.ctrl && !m.meta`, so no OS branch is needed.

WHAT I DID NOT MEASURE. I read the matchers rather than running either platform, so I did not observe `Ctrl+D` in a block on a mac, and I did not confirm that the browser delivers it before the native text-field behaviour there. I did not check whether `Meta+D` reaches the page at all on Windows, where `Win+D` is claimed by the OS shell — that half of the claim may be harmless in practice. I did not audit the other branches (`turn-into`, `move`, `select-all`) for the same collision, though all of them read the same `mod` value.
