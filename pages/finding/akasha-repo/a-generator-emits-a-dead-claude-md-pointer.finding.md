---
id: 3ada7da6-c93d-50cf-938e-4763b20165a9
page-type-slug: finding
slug: a-generator-emits-a-dead-claude-md-pointer
title: "A generator emits a dead CLAUDE.md pointer"
domain-slug: repo/akasha-repo
---

# Claim

`tools/commands/eso/generate-hud-scene-catalog.ts:52` emits a `CLAUDE.md` pointer that resolves to nothing, so repairing the generated file alone would be undone by the next generation.

# Evidence

Measured 2026-08-28 at `229e7c5ea9`. That line emits the comment that lands at `temper/shared-interface-hud-scene-catalog/src/generated/hud-scene-catalog.generated.ts:10`, and its `../../CLAUDE.md` is relative to where the generated file sits rather than to the generator, so the same dead pointer stands in both.

Two of the sixteen dangling `CLAUDE.md` pointers sit in generated files: this one and `temper/game-characters-equipment/src/sets/generated/temper-set.generated.ts:14`.
