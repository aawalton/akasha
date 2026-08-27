---
id: 978cef63-3b35-506e-8202-0182c998127a
page-type-slug: finding
title: "Title flags declared token"
domain-slug: repo/code-repo
---

# Claim

Four `--title` flags declare `valueShape: "token"`, and at least three carry values their own descriptions call human prose. The shape vocabulary reserves `line` for exactly this — "a title, a summary, a label" — and only `prose` and `line` earn a `--<name>-file` sibling, so a title declared `token` has the shell as its only door. The route-coverage census cannot see the class: it classifies by the declaration alone, by an explicit design choice, so a mis-declared flag passes as a correct token.

# Evidence

Measured over `~/code` at HEAD `1313565199` on `main`, 2026-08-07.

The vocabulary, `packages/shared/cli-core/src/help.ts:10-20`: `line` is "prose that is semantically ONE line: a title, a summary, a label", shell-hazardous and so earning the same non-shell route as `prose`; `token` is "a value drawn from a constrained alphabet: an id, a seq, a slug, an enum member, a path, a duration." Only the two routed shapes get a door that is not the shell: `RoutedValueShape = "prose" | "line"` at `prose-route.ts:56`, with `routedShape()` returning `null` for anything else.

Population of `--title` across the tree, excluding tests: about 24 declare `prose`, 5 declare `line` (`project create`, `project start`, `project update`, `migration create`), and 4 declare `token`:

- `packages/collections/food/src/cli/log.ts` — `argLabel: "<name>"`, description `Short food name (e.g. "Shrimp & grits", "Broccoli")`. Its own example carries an ampersand.
- `packages/alanwalton/mobile-cli/src/mobile/sim/push-tap.ts` — `argLabel: "<text>"`, description "Notification title".
- `packages/alanwalton/personas/cli/src/persona/create.ts` — `argLabel: "<name>"`, "persona display name".
- `packages/collections/exercises/src/cli/equipment-set.ts` — "Implement name (natural key)". Defensible: a natural key is a constrained alphabet.

So `token` is the minority declaration for this flag by an order of magnitude, and three of the four are prose by their own descriptions.

Not hypothetical: a `bun ops page list --type food --properties title` read on 2026-07-31 returned `Little Caesar's Crazy Bread, 1 stick (awareness)` among recent rows — an apostrophe a single-quoted shell argument cannot carry.

Why nothing counts the class: `packages/infra/checks/src/lib/cli-prose-flag-route-coverage.ts` is the census, and its header states the rule that blinds it here — "ONLY THE DECLARATION DECLARES", chosen because "an implication is a guess that happens to be right". A flag declaring `token` is therefore a correct token as far as the census is concerned, and a green run says nothing.
