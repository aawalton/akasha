---
id: 6681186e-a96f-58d0-b6d7-284877d90872
page-type-slug: finding
title: "Suppression hook answers a third of its gap"
domain-slug: domain/pages-system
---

# Claim

A live docblock names the `embedded` view flag as "the suppression hook" for a numbered fixed-surface gap, and the flag answers one of that gap's three clauses. The other two — `ViewPageContent` hardcoding its empty state and its default-tab selection — are untouched, and `ViewPageContent` takes no `embedded` prop at all. A reader following the citation finds a gap marked answered.

# Evidence

Read in `~/code` on 2026-08-08, emptying a quarantined fixed-surface gap register under `dirty/code/`.

`packages/shared/pages/ui/src/components/page-system-view-types.ts:172` closes its `embedded?: boolean` docblock: "this is the suppression hook for the embed case (fixed-surface-dni-gaps gap F)". The flag is real and wired, not merely documented — `page-system-view.tsx:77` takes `embedded = false`, `:258` is the executable `{!embedded && (` that drops the chrome block, `view-tab-content.tsx:188` threads it through, `page-collection-content.tsx:142` passes it, and `pages-by-relation-content.tsx:134` is `title={embedded === true ? null : ...}`.

What it suppresses is stated in the same docblock: "the `PageTabHeader` block (title + count badge + search / sort / filter / settings / create row)", rendering "only the content body (cards / table / gallery / empty state)". So the empty state is explicitly on the surviving side.

The gap it cites has three clauses: `ViewPageContent` hardcodes the empty state, it hardcodes the default-tab selection, and it offers freely-editable view tabs and a create-view affordance — all three called wrong defaults for a fixed surface. The flag answers the third.

The first two are unchanged in `packages/shared/pages/ui/src/components/view-page-content.tsx`. Line 274 is a literal: `empty={{ title: "No views", description: "Create a view to get started." }}`. Line 111 is `const currentTab = activeTab ?? urlTab ?? viewTabItems[0]?.id`, the first view by construction. `rg -n "embedded"` over that 295-line file returns nothing: the component neither accepts the flag nor passes one down.

The asymmetry is what costs. The citation runs from the code to the register and not back, so nothing at `view-page-content.tsx` says a clause of gap F is still open. The register is under quarantine and being deleted, which leaves the two open clauses recorded nowhere while a live docblock reads as having closed them.
