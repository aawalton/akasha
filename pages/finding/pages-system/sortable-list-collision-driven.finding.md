---
id: 3eebf556-ab1b-5cc2-bc0c-4134a6a43d45
slug: sortable-list-collision-driven
page-type-slug: finding
title: "Sortable list collision driven"
domain-slug: domain/pages-system
---

# Claim

`page-detail-sortable-list` is a vertical row-reorder list like its six siblings, and is the only one that takes its drop decision from dnd-kit's `over` rather than from a measured pointer position, and the only one that paints its insertion line `bg-tertiary` rather than `bg-accent`.

# Evidence

Six vertical or horizontal reorder surfaces in `packages/shared/pages/ui/src/components/` compute the drop target from the pointer: a `window` `pointermove` listener measures `getBoundingClientRect()` and a pure helper turns those rects plus a pointer coordinate into a zone. `sortable-navs.tsx:135–144` does this through `findDropZone`, `property-visibility-picker.tsx:230–235` through `computePickerDropZone`, `page-table-header.tsx:174–179` through `computeColumnDropZone`, and `page-board` and `page-calendar` through their own. `sort-group.tsx:213–218` in `packages/shared/design/patterns` does the same.

`page-detail-sortable-list.tsx` does not. `handleDragOver` at `:85–87` stores `event.over`, and `handleDragEnd` at `:89–95` reads `const { active, over } = event` and derives both indices from `over.id`. The drop decision is dnd-kit's collision result.

It also diverges on the insertion line. At `:36–40` the `before:` and `after:` pseudo-elements are `before:h-0.5 before:bg-tertiary` and `after:h-0.5 after:bg-tertiary`, where `sortable-navs.tsx:60,63`, `property-visibility-picker-rows.tsx:18–20` and `sort-group.tsx:30–33` all use `bg-accent` with otherwise identical class strings.

It is not a different interaction class. It uses `restrictToVerticalAxis` on both `DndContext` (`:104`) and `DragOverlay` (`:129`), dims its source row to `opacity: 0.3` (`:45`), renders a `pointer-events-none opacity-60` clone (`:129–132`), and registers `PointerSensor` with `{ distance: 5 }` plus `KeyboardSensor` (`:69–72`) — the same as the conforming surfaces on every other axis.

Nothing refuses either divergence: no check, ast-grep rule, `biome.json` entry or `architecture.config.json` rule covers drag-and-drop.

Found ingesting `dirty/docs/dnd-visual-feedback.md`. Whether the two divergences are deliberate is not settled here.
