---
id: 8dc79e23-d456-57da-9cd7-f7e52eb8268c
slug: dnd-measurement-untested
page-type-slug: finding
title: "Dnd measurement untested"
domain-slug: domain/design-system
---

# Claim

Every drag-and-drop surface splits its drop decision into a measurement half and a pure half, tests the pure half, and tests the measurement half nowhere — and the comments explaining the split name happy-dom as the reason, while a browser test lane exists and is used twenty times elsewhere in the tree.

# Evidence

The split is deliberate and consistent. Six surfaces read the DOM in the component and hand the decision to a pure function: `sortable-navs.tsx:135–144` registers a `window` `pointermove` listener and feeds `findDropZone` (`drop-zones.ts:77`); `property-visibility-picker.tsx:230–235` feeds `computePickerDropZone` (`property-visibility-picker-helpers.ts:104`); `sort-group.tsx:213–218` feeds `computeSortDropZone` (`sort-group-helpers.ts:20`); `page-table-header.tsx:174–179` feeds `computeColumnDropZone`; `page-board` and `page-calendar` do the same. Each pure function takes measured rects plus a pointer coordinate and returns a zone, and each is unit-tested.

What no test covers is the half in front of them: the `pointermove` listener, the `getBoundingClientRect()` reading, and the assembly of the rect array the pure function is given. A rect measured from the wrong element, gathered in the wrong order, or read after a scroll would produce a correct answer from a correct function and a wrong insertion line on screen, with every unit test still passing.

The reason recorded in the tree is the test environment. `page-board-dnd-helpers.ts:4–5` reads "Kept pure and unit-tested because DnD can't be simulated in happy-dom (see the repo DnD visual-feedback convention)", and `page-calendar-dnd-helpers.ts` carries the same sentence. That is true of happy-dom and is not the whole picture: `packages/shared/browser-test-harness` exists, and `find packages -name "*.browser.test.ts*"` returns twenty browser tests outside `node_modules` and `dist`. Filtering those twenty for `drag`, `dnd`, `sort` or `reorder` returns none.

The observation is that the justification stops at one test lane and the tree has two. Whether the measurement half is worth a browser test is not settled here.

Found ingesting `dirty/docs/dnd-visual-feedback.md`, whose Mechanics section gives the same happy-dom reason.
