---
id: cdd2231f-fe9a-53c6-a0b1-06be685534a0
slug: persona-documents-unwritable-under-readout
page-type-slug: finding
title: "Persona documents unwritable under readout"
domain-slug: page-type/persona
---

# Claim

All 41 persona documents are unwritable. `page-types/persona.md` now extends `readout`, which requires exactly one of `colour-from-slug`, `colour-slug` or `scale-slug`, and no persona states any. Supplying the one `properties/persona/scale-slug.md` declares as its own default is refused too: it narrows `readout-scale-slug`, and the gate answers that no page type persona extends declares `scale-slug`. Neither omitting the key nor stating it is admitted.

# Evidence

Met 2026-08-16 while repointing one persona's `championed-domain-slug`, and measured after.

**The refusal, first form.** `ops instructions edit` on `domains/personas/rhia.md` failed `page-holds-properties`: "exactly one of `colour-from-slug`, `colour-slug`, `scale-slug` stands, which is the `colour-from` choice on `readout`, and this states none of them." `page-types/persona.md` carries `extends-slug: readout`, and `properties/readout/colour-from-slug.md`, `properties/readout/colour-slug.md` and `properties/readout/scale-slug.md` each carry `one-of: colour-from`.

**It is every persona, not this one.** 41 files stand in `domains/personas/`. Grepped for a line opening `colour-from-slug:`, `colour-slug:` or `scale-slug:`, 0 of 41 match.

**The second form, which is the harder one.** `properties/persona/scale-slug.md` exists, states `narrows-slug: readout-scale-slug`, and states `default: readout-scale-green-day-units`. Writing that exact declared default onto `rhia.md` cleared the first refusal and produced a second: "`properties/persona/scale-slug.md` states `narrows-slug: readout-scale-slug`, and no page type it extends declares `scale-slug` — a narrowing names the declaration it narrows." Both attempts wrote nothing.

**When it arrived.** `git log` over `page-types/persona.md`, `page-types/readout.md` and `domains/readout-system.md` puts `240d92ec9 a persona is a readout` at the head, above `5946f3b6f`, `24f1f34ba` and `72cd263cd readout, readout-group and readout-scale become page types`, all dated today.

**Not verified.** Whether the same pair of refusals reaches page types other than `persona` that extend `readout` was not tested; only `persona` was exercised. Whether a `colour-slug` or `colour-from-slug` value would be admitted where `scale-slug` was not is untested. No seat was found working this: `ops seat list` shows none standing on `readout-system` or `persona`.
