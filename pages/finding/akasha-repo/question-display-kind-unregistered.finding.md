---
id: aa5b2466-007d-5ef9-837d-d527f6336fa9
slug: question-display-kind-unregistered
page-type-slug: finding
title: "Question display kind unregistered"
domain-slug: repo/akasha-repo
---

# Claim

`question` is a value `selectPageDisplayKind` dispatches, and it has no row in the display registry. The Capacitor shell's offline gate reads that registry, so an unregistered kind degrades to the generic body exactly as `offlineCapable: false` would — the right outcome for a question page, reached by nobody having declared it and indistinguishable at the call site from a declaration somebody weighed.

# Evidence

Read in the akasha working tree, 2026-08-27.

`alanwalton/web/app/lib/page-display-kind.ts:3-9` declares `question` among the `PageDisplayKind` values, and `selectPageDisplayKind` carries `if (display === "question") return "question"` at `:24`.

`alanwalton/web/app/lib/display-registrations.ts:3-7` makes every `registerPageDisplay` call the app roots import: `idle`, `awen` and `persona` at `offlineCapable: false`, `chess` and `chess-review` at `true`. `question` is absent. A search for `registerPageDisplay` finds no other call outside that file, the registry module `shared/pages-ui/src/capabilities/page-display-registry.ts` and the barrel re-exporting it.

`alanwalton/web/app-capacitor/routes/page-detail.tsx:122` gates on it: `!isOnline && !getPageDisplay(kind)?.offlineCapable ? "generic" : kind`. An unregistered kind and one registered `offlineCapable: false` produce the same value, so nothing at that call site separates a weighed declaration from an omission.

What is open is which the registry is for: every kind the decider dispatches, in which case `question` is a missing row, or only kinds needing per-kind metadata, in which case the offline default wants stating where it can be read. Nothing detects either — the registry is an open runtime `Map<string, PageDisplayMeta>`, keyed by a bare `string`, so an unregistered kind is not a type error and no check compares the registered keys against `PageDisplayKind`.

Found ingesting a quarantined question document.
