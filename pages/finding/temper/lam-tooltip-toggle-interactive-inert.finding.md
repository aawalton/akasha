---
id: 361f5c84-0247-5fe5-aff0-c8f692d9fe8d
slug: lam-tooltip-toggle-interactive-inert
page-type-slug: finding
title: "Lam tooltip toggle interactive inert"
domain-slug: domain/temper
---

# Claim

The addon's "add line break at custom tooltip parts" sub-option stays interactive in a default install — visibly enabled and toggleable — while the custom-tooltip-pattern feature it modifies is inactive, so toggling it does nothing: a control the user can operate that cannot affect anything.

# Evidence

Project #16082, domain `temper`. Split out of #15992 by ember at close; #15992's scope was right, this is the half it deliberately left. Carried no objective; notes only.

WHAT #15992 ESTABLISHED (execution-proven, not reasoned): `settings-lam.ts`'s disabled test was `!settings['useCustomTooltipPattern']`. The slot holds `string|nil`, defaulting to `""` (`saved-variables.ts:92`). In a real Lua 5.1 sandbox over the whole value domain, `not x` and `x == nil` agree everywhere the slot can go. #15992 changed only the spelling to `=== undefined` (confirmed at `LibSets.lua:53303`), provably behaviour-preserving. The toggle is still never disabled in a default install — deliberate, since diverging from upstream was not justifiable while no genuine pinned upstream existed.

THE RESIDUAL (real UX inconsistency): the consumer treats `""` as "no custom pattern" — `header.ts:167` gates on `!== undefined && !== ""`. So in a default install the sub-option renders enabled and interactive while the feature it modifies is inactive.

RE-SCOPED BY ALAN'S RULING (#16111, recorded by ember): the row originally asked to use #15994's pinned-upstream oracle to classify this as port-defect vs deliberate divergence. Alan has since ruled the fleet distributes no third-party add-ons and ports are renamed to Temper identity rather than kept upstream-faithful — port fidelity is retired, and the preserved-upstream-bugs register is being deleted. THE CLASSIFICATION QUESTION IS MOOT AND MUST NOT BE ATTEMPTED — the oracle it would consult is being removed.

WHAT REMAINS, re-scoped: make the control's interactivity honest — disable it while the pattern is inactive, or remove it. Decide on the merits, not on what upstream did.

CAVEAT (from #15992, same bar held): no ESO rig exists, so the rendered LAM panel cannot be observed in-game; claim the returned boolean and the emitted Lua, never the pixel. Branch-sensitive per #15994, like #15992 and #15995, between PTS_New and LibSets-reworked.
