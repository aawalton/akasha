---
id: 5281c9aa-af0c-51d1-ba89-62d8de23b0c2
slug: rule-names-cited-from-quarantine
page-type-slug: finding
title: "Rule names cited from quarantine"
domain-slug: domain/temper
---

# Claim

Comments across the Temper addon packages cite a quarantined document as their
authoritative home. Six rule names are used as durable citation handles in 65 files, and
ten comments name the document by title and tell the reader to grep back to it. The
document is under `dirty/` in the instructions repo and is being emptied a section at a
time, so the home those comments send a reader to is going away.

# Evidence

The document is `dirty/docs/temper-addon-standard.md`, titled "Temper Addon Clean
Standard". Its "Migration universal rules" section states the convention directly: "Each
rule is named, not numbered: the name is the durable citation handle a comment across the
addon packages references... Grep a rule name to reach this one authoritative home."

Counting citations in the akasha repository, excluding `node_modules` and `dist`:

- `English-only-locales rule` — 48
- `SavedVariables-identity rule` — 22
- `External-libraries rule` — 7
- `String-registration-timing rule` — 2
- `Data-extraction rule` — 0
- `Behavior-parity rule` — 0

79 citations across 65 files. Separately, the string "Temper Addon Clean Standard" appears
in 10 places, naming the document itself rather than a rule.

Examples: `packages/temper/addons/scripts/build/consolidation-migrations-data.ts:8` reads
`// "SavedVariables-identity rule" in Temper Addon Clean Standard.`;
`packages/temper/shared/interface/keybinder/addon/src/saved-variables.ts:4` reads
`// Identity rename (SavedVariables-identity rule): upstream stored its data in the global`;
`packages/temper/shared/addon-libraries/lib-addon-menu/src/types/w-slider.d.ts:2` reads
`// controls/slider.lua, v16). External-libraries rule: in-package only, never editing the shared`.

The citations are by name rather than by path, so nothing mechanical resolves them and
nothing reports them broken. A grep for the rule name is the whole of the lookup, and it
succeeds today only because the quarantined document is still on disk.

Three of the six rules — SavedVariables-identity, English-only-locales and
External-libraries, carrying 77 of the 79 citations between them — are held under
quarantine at `dirty/maybe-keep/docs/temper-addon-standard.md`, with a composed candidate
proposing `domains/folders/temper.md` as their home. If they are promoted under different
headings, or not promoted, those 77 comments cite a name nothing answers to.
