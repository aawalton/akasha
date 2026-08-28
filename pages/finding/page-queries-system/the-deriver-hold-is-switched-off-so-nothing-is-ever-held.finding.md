---
id: 15130eec-68e6-5cff-bf5b-1f890dcb846b
page-type-slug: finding
title: "The deriver hold is switched off so nothing is ever held"
slug: the-deriver-hold-is-switched-off-so-nothing-is-ever-held
domain-slug: domain/page-queries-system
---

# Claim

`tools/lib/deriver-hold.ts:5` sets `deriverTtlMs` to 0 and `:39` returns early on that value, so no deriver is ever held across a call and the hold this file exists for never runs. The measured win it was built to deliver, a 45-kind build falling from 1957ms to 41-63ms, lands only where derivers are held.

# Evidence

Measured 2026-08-28 at `375daccb9e`.

`tools/lib/deriver-hold.ts:5` is `let deriverTtlMs = 0`.

`tools/lib/deriver-hold.ts:39` is `if (deriverTtlMs === 0) return memoRows(deriver(roots, carries))` — the hold is skipped and a fresh deriver is built.

The consequence this was first written down with has since been repaired, and only the switch remains. `kindsIn` is now held per call: `tools/lib/page-declared.ts:117-138`, with `:118` opening `onceInCall` keyed on the roots. Its docblock at `:105-115` is written against the exact defect, recording that it had parsed all 393 page-type files 45 times.

`declarationsIn` no longer exists. `tools/lib/page-declared.ts` is 139 lines and holds only `kindsIn`; the name survives in the stale `tools/lib/page-declared.d.ts:67`. Its work sits in `page/property/declarations.ts` — `declarationsOf` at `:85`, `declarationsFromFiles` at `:95`.

Re-counted in akasha, excluding `dist`: 391 `*.page-type.md` and 2,285 `*.page-property-definition.md`, 2,676 together. An earlier reading gave 2,624.

Not measured: what a run costs now with `kindsIn` held and the deriver hold still off, against what it would cost with both.
