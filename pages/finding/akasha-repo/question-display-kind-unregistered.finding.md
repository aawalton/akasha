---
id: aa5b2466-007d-5ef9-837d-d527f6336fa9
page-type-slug: finding
title: "Question display kind unregistered"
domain-slug: repo/code-repo
---

# Claim

`question` is one of seven values `selectPageDisplayKind` dispatches, and the only custom kind with no row in the display registry. The Capacitor shell's offline gate reads that registry, so an unregistered kind degrades to the generic body exactly as `offlineCapable: false` would — the right outcome for a question page, reached by nobody having declared it and indistinguishable at the call site from a declaration somebody weighed.

# Evidence

At `~/code` on `main`, `13135651993c19af09ce41b6295264191071d3c1`.

`packages/alanwalton/web/app/lib/page-display-kind.ts` declares `PageDisplayKind` as seven values — `idle`, `awen`, `chess`, `chess-review`, `persona`, `question`, `generic` — and `selectPageDisplayKind` carries `if (display === "question") return "question"` among its branches.

`packages/alanwalton/web/app/lib/display-registrations.ts` is, by its own header, "the ONE shared display-kind registrations module" that both app roots import. It makes five calls, at `:22-26`: `idle` and `awen` and `persona` at `offlineCapable: false`, `chess` and `chess-review` at `true`. `question` is absent. A repository-wide search for `registerPageDisplay` finds no other call outside that file and the registry's own unit test.

`packages/alanwalton/web/app-capacitor/routes/page-detail.tsx:243` gates on it: `!isOnline && !getPageDisplay(kind)?.offlineCapable ? "generic" : kind`. An unregistered kind and one registered `offlineCapable: false` produce the same value, so nothing at that call site separates a weighed declaration from an omission.

The tree disagrees with itself about whether `question` is a custom display kind at all. Two surfaces enumerate the five and mark the list open — `page-display-registry.ts:12-13` ("`idle` / `awen` / `chess` / `chess-review` / `persona` and future kinds") and the `displayKindSchema` docstring at `packages/shared/pages/core/src/schema/detail-config.ts:15-18` ("`persona` / …"). The header of `page-display-kind.ts` itself lists six, "the other custom kinds (`chess-review`, `persona`, `question`, idle, chess, awen)".

What is open is which the registry is for: every kind the decider dispatches, in which case `question` is a missing row, or only kinds needing per-kind metadata, in which case the offline default wants stating where it can be read. Nothing detects either — the registry is an open runtime Map, so an unregistered kind is not a type error and no check compares it against `PageDisplayKind`.

Found ingesting a quarantined question document.
