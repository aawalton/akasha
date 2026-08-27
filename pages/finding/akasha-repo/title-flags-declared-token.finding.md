---
id: 978cef63-3b35-506e-8202-0182c998127a
page-type-slug: finding
title: "Title flags declared token"
domain-slug: repo/akasha-repo
---

# Claim

`--title` declares `valueShape: "token"` on `food log`, on `mobile sim push-tap` and on `exercise equipment-set`, and the first two carry values their own descriptions call human prose — a short food name given as `"Shrimp & grits"`, a notification title. `token` is for a value drawn from a constrained alphabet; only `prose` and `line` are routed shapes, and only a routed shape earns a `--<name>-file` sibling, so a title declared `token` has the shell as its only door.

# Evidence

Read in the akasha working tree, 2026-08-27.

The vocabulary is `FlagValueShape = "prose" | "line" | "token"` at `tools/ops/surface.ts:6`. Only two of the three get a door that is not the shell: `RoutedValueShape = "prose" | "line"` at `tools/lib/prose-route.ts:14`, with `routedShape()` at `:16-20` returning `null` for any other shape and for a flag carrying no `argLabel`.

The sites:

- `tools/commands/food/log.ts:32-36` — `argLabel: "<name>"`, `valueShape: "token"`, `required: true`, description `Short food name (e.g. "Shrimp & grits", "Broccoli")`. Its own example carries an ampersand.
- `tools/commands/mobile/sim/push-tap.ts:44-47` — `argLabel: "<text>"`, `valueShape: "token"`, description "Notification title (default: `Tap probe`).".
- `tools/commands/exercise/equipment-set.ts:27-31` — `argLabel: "<name>"`, `valueShape: "token"`, description "Implement name (natural key)". Defensible: a natural key is a constrained alphabet.

`token` is the outlier declaration for this flag. Across the commands under `tools/commands/`, `--title` declares `prose` at most of its sites — every `tracking` verb, the `temper inventory` rule and item-rule and buy-rule verbs, `exercise add`, `exercise schedule-create`, `exercise constraint-set` — and `line` where the value is one line, as at `tools/commands/finding/create.ts`.

Not hypothetical: a read of recent food rows' titles on 2026-07-31 returned `Little Caesar's Crazy Bread, 1 stick (awareness)` among them — an apostrophe a single-quoted shell argument cannot carry.

The mis-declaration is invisible to anything that classifies by the declaration alone: a flag declaring `token` is a correct token to such a reader, and its description is prose no code compares against it.
