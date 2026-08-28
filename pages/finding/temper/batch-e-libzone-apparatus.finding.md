---
id: de4bf986-5380-51d7-ad8c-fd50ccaa4b2b
slug: batch-e-libzone-apparatus
page-type-slug: finding
title: "Batch e libzone apparatus"
domain-slug: domain/temper
---

# Claim

Batch E of the temper #16111 rename programme (LibShifterBox, LibCharacterKnowledge, LibZone) needed to be its own row rather than folding into batch D because LibZone carries fidelity apparatus (`scripts/port-data.ts`, `scripts/verify-port-data.ts`) that batch C already established can only be deleted, never renamed, and the shared rename checklist undercounted how many libraries carry that apparatus.

# Evidence

From project #16205 (domain `temper`, status `someday_maybe`, `live-on: deploy`), no objective of its own — captured 2026-07-25T15:04:08.594Z, moved from the row's retired `notes` attribute on 2026-08-15.

Batch E of the #16111 rename programme, three libraries, one carrying the fidelity apparatus:
```
LibShifterBox          1 dependent
LibCharacterKnowledge  2 dependents
LibZone                1 dependent   <- scripts/port-data.ts AND scripts/verify-port-data.ts
```
The apparatus is why this batch is kept separate from batch D (#16204). #16188 (batch C) established the handling, and it is not a rename: `port-data.ts` cannot be renamed, only deleted — it hardwires `join(addonsDir(), "<OldName>", "<OldName>_Data.lua")`, a literal carrying the retired token whose only alternatives are keeping the old name or pointing at a file that does not exist. It is a one-time bootstrap and the upstream `_Data.lua` is not on disk, so it cannot run today.

The project's notes call for deleting both scripts, mirroring the frozen-snapshot header precedent at `item-browser/data/generated/zone-classification.generated.ts`, and pruning the devDeps the scripts solely owned or `check-unused-deps` goes red.

Correcting the shared checklist: step 2 claimed lib-sets was "the ONLY one" carrying fidelity apparatus as files. Measured false — four do (`lib-sets`, `lib-map-data` done in batch C, `lib-treasure`, `lib-zone`), plus two more carry `docs/port-conventions.md` (`lib-addon-menu`, `lib-saved-vars`). The project's own batch plan had been built on that false premise; batch C caught it.

Inherit the four cross-batch identity surfaces and the Title convention from #16111's notes.
