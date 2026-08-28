---
id: b60bddcc-5605-59b0-95fc-c7f7de25c973
slug: fingerprint-manifest-coverage-open
page-type-slug: finding
title: "Fingerprint manifest coverage open"
domain-slug: domain/temper
---

# Claim

`RETIRED_FINGERPRINT_TOKENS` in `addon-fingerprint-residue.manifest.ts` names five folded upstream identities but omits three other folds with substantial content (`ptf`, `votans-minimap`, `fcochangestuff`), and whether that is a manifest coverage gap or a correct absence because those three were never retired is an open question, since the two readings imply opposite fixes.

# Evidence

Project #16182, domain `temper`, status `someday_maybe`, no objective; moved off retired `notes` 2026-08-15. Found by dalla while ruling on #16174's second population, verified by ember, 2026-07-25T14:06. THE SCOPE IS AN OPEN QUESTION, NOT A DEFECT CLAIM.

Established (verified): `RETIRED_FINGERPRINT_TOKENS` in `addon-fingerprint-residue.manifest.ts` names five folded upstream identities (USPF, MWIM, WritWorthy, PotionMaker, CraftStore) and omits three folds with substantial content: `game/housing/addon/src/ptf` (53 .ts files, 0 hits), `game/navigation/addon/src/votans-minimap` (33 files, 0 hits), `.../addon/src/fcochangestuff` (67 files, 0 hits). `votans-minimap` publishes a hybrid global `_G.TemperVotansMiniMap` (Temper-prefixed, upstream name retained inside); `ptf` publishes no `_G.` global found; `fcochangestuff` publishes the generic `_G.IsCharacterPreviewingAvailable`.

The open question, which must be answered before any fix since the readings imply opposite fixes: (a) manifest coverage gap — retired but manifest never updated; or (b) never retired — manifest correct, real finding is a scope question for #16111. Do not assume (a) as the tidier story.

Evidence points both ways, deliberately unreconciled: directory naming isn't reliable (retired folds got descriptive names, but `writ-worthy/` still carries its brand and is in the manifest); the hybrid global suggests partial retirement. Dalla: "I am not claiming the manifest is wrong for its own purpose — I have not read what it is for — only that the fold inventory it implies is incomplete against the tree."

Instrument warning: `grep -rnac ... | wc -l` is broken for occurrence counts (counts files searched, not occurrences); the 53/33/67 figures are file counts only. Use `grep -o | wc -l` with a positive control.

Connection to #16111: if (b), the rename programme's scope extends to folded upstream code inside Temper's own addons — a scope change needing Alan. Do not decide here; surface it.
