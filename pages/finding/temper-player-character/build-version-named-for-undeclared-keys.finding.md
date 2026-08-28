---
id: 6b57135c-0645-4710-ac16-b30cb2b6e020
slug: build-version-named-for-undeclared-keys
page-type-slug: finding
title: "Build version named for undeclared keys"
domain-slug: domain/temper-player-character
---

# Claim

`temper-build-version` stated its pages were named `{build}-{version-number}`, declaring neither key. Commit `228f6c9c42` removed that rule and the Design prose restating it, so the claim no longer holds. The type has no pages. This page is now the only record that a build version was meant to be named by the build it revises and a second component, and the only place the open question of what `build` should point at stands. Do not remove it.

# Evidence

Corrected 2026-08-28, and what stood here is struck. This page quoted `named-for: "{build}-{version-number}"` from line 8 of `pages/page-type/temper-build-version.page-type.md`, and a Design line at 21 putting the intent in prose as "the build it revises and the moment it was taken" — a timestamp where the rule said a version number. It read the two as disagreeing. Two further paragraphs, on `nameForNew` refusing the rule at write time and `checkNaming` reaching it later, are moot now the rule is gone.

Commit `228f6c9c42`, 2026-08-27, "temper build version states no naming rule, the one it stated naming nothing it declared", deleted the `named-for`. The prose line went with it. The page type now declares no naming rule, so it takes the `{slug}` default.

Still true. One property is declared on this page type, in `pages/page-property-definition/temper-build-version-account-page.page-property-definition.md`: `key: account-page`, `type: relation-slug`, `target-slug: temper-account`. Nothing declares `version-number` anywhere in the corpus, and the only `build` key stands on `game-state`, not here.

Still true. The type has no pages and none has stood on any ref. Its own Design line says as much: "Nothing has recorded a version yet, and the shape stands ready for the first one."

Why this page stays. `228f6c9c42` removed both surviving statements of the naming intent, so nothing else records that a build version was meant to be named by the build it revises and a second component. Removing this finding as overtaken would destroy the only copy.

Open, and not answered here: what `build` should point at. `character-build` and `companion-build` both stand as page types with pages, so `build` most likely wants to be a relation to one of them. Which one, and what the second component is, are temper-domain questions with an owner.
