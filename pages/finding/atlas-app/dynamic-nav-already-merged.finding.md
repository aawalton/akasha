---
id: 3ded77f0-b090-5e84-aca2-edcfa412f621
page-type-slug: finding
title: "Dynamic nav already merged"
domain-slug: domain/atlas-app
---

# Claim

Atlas's dynamic DB-driven nav items already merge with the static seed list into one array via `useAppNavItems` (`app-shell.tsx:164`), so unifying atlas's two nav-to-binding mechanisms reduces to deleting the hand-rolled static projection in `nav-commands.tsx` and importing the shared helper — not to building a merge of two sources, since there is only one.

# Evidence

Project #16087, domain `atlas-app`. Goal: fold atlas dynamic nav into the keyboard command palette using the shared helper landed by #15878, retiring the hand-rolled static projection so atlas has one nav-to-binding mechanism (Parsimony). Sequenced by olwen (umbrella #15792 lead) after the reader work (#15770 and children) — no rush.

STATE AFTER #15889 (landed, browser-verified): `nav-commands.tsx` hand-rolls the static projection (`internalNavCommands`, `NavCommands`, `NavCommandBinding`) over `primaryNavItems`, registering Home/Search/Map as chord-less palette-only commands. Working and verified — this row is convergence, not a defect.

TARGET: import `navItemsToCommandBindings` (pure projection) and `NavCommandBindings` (dynamic-safe registrar) from `@shared/pages-ui`; use for both dynamic and static items; delete the hand-rolled trio plus its unit test. Shape reference: Astra's #15865, first caller of the shared helper.

RESOLVE-FIRST ANSWERED (source-verified 2026-07-25): `app-shell.tsx:164` calls `useAppNavItems(...)`, returning `dynamicPrimaryItems` which feeds `config.primaryItems` rendered by `SharedAppShell` — already the merged set. No two-source problem: `nav-items.ts` (`primaryNavItems`) stays as the static seed; only the hand-rolled projection in `nav-commands.tsx` and its test are deleted.

STRUCTURAL WRINKLE, unresolved: `NavCommands` is mounted in `root.tsx`, outside the app shell, while `useAppNavItems` is called inside `AppShellInner`. Bindings must register where the hook data lives. Astra's #15865 already faced this; read its placement before choosing.

HONEST LIMIT: the #15889 browser verify ran as a throwaway seeded user owning no rows, showing only the static seed with zero dynamic rows — whether Alan's own atlas nav carries dynamic rows today is unmeasured. BINDING CONSTRAINT from olwen: the dynamic-nav verify must run with at least one real dynamic row present, or it proves nothing.
