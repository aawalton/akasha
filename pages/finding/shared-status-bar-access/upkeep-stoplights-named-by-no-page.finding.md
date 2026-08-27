---
id: ff74ab88-683e-5b56-b794-9f1f4423fc51
page-type-slug: finding
title: "Upkeep stoplights named by no page"
domain-slug: package/shared-status-bar-access
---

# Claim

`packages/shared/status-bar-access/src/upkeep-stoplights.ts` is named by no page, while its three siblings are each named by the readout group they serve. The set of three looks accidental rather than chosen.

# Evidence

Measured on 2026-08-23, on commit `9fdfdefa1`.

Four files in this package name a readout group slug at module level: `inbox-stoplights.ts` names `alan-harness-stoplights-inboxes`, `persona-stoplights.ts` names `alan-harness-stoplights-personas`, `daily-stoplights.ts` names `alan-harness-stoplights-values`, and `upkeep-stoplights.ts` names `alan-harness-stoplights-upkeep`.

The first three stand in the `code-path` of the group they name. The fourth stands in no page's. `pages/readout-group/alan-harness-stoplights-upkeep.md` carried a widget and a route and never a status bar file, and after commit `9fdfdefa1` moved those two onto the display it carries no `code-path` at all.

All four still reach this package's own page, because a package's files are read off the workspace that declares them rather than matched by path. What the group's `code-path` added was the group document itself and what it requires — `alan-readouts.md`, `readout-system.md`, `alan-harness-mobile.md`. `upkeep-stoplights.ts` has never had those and the other three still do.

Whether the answer is a fourth `code-path` value, or `required-reading-slugs` on this package page naming all four groups so the path matching goes entirely, is not decided here.
