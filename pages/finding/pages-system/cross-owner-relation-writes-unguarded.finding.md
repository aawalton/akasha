---
id: cb96c76c-343b-5366-9e78-2accf03b21da
page-type-slug: finding
title: "Cross owner relation writes unguarded"
domain-slug: domain/pages-system
---

# Claim

No write-boundary rule rejects a relation-typed attribute whose target page has a different `user_id` than the row being written, and this gap allowed a confirmed incident on 2026-07-25 where a reactor repointed 12 of Alan's `temper-task` rows at a page owned by a throwaway account, without any `user_id` on those rows ever changing and with no version history to recover the prior values.

# Evidence

Project #15998 (domain `pages-system`). Carried no objective; moved off the row's retired `notes` attribute on 2026-08-15.

Origin (ember): surfaced by #15971 while designing its ownership-seizure gate. This is the sibling branch that gate does not cover, and the one that actually fired.

The proven incident: at 06:41:15Z, throwaway account `1077116b` creates 4 `temper-character` rows ("Maevis Thornwake"). At 06:42:15Z, twelve of Alan's `temper-task` rows are updated to carry `attributes->>'character'` = Maevis's id, owned by `1077116b`. Verified independently twice (timestamp+join and ownership join). Rows render blank via RLS, which is why nobody saw it. `temper-task` is not opted into versioning, so prior values are unrecoverable.

Critical: `user_id` never changed — only the relation pointed elsewhere, so #15971's guard ("UPDATE may never change a row's `user_id`") passes this write. #15971 kills "the row became someone else's"; this proposed guard kills "the row points at someone else's".

Proposed rule (from #15971): at the write boundary, reject a relation-typed attribute whose target page has a different `user_id`, sentinel `ffffffff-...` exempt. Would have refused the 06:42:15Z writes outright.

Not established, named as first deliverable: blast radius unscoped — legitimate cross-owner references may exist (`project`/`requestingUser` policy hints one). Proposed sequence: enumerate cross-owner relations first, then decide universal-with-sentinel, universal-with-exemptions, or opt-in.

Scope note: system-wide, not Temper-only; filed under M1 since that is where evidence is, but fix is ground-layer and owner may belong elsewhere.

Measured denominator (ember, third instrument): `temper-task.character` 9ba554f7->1077116b same_owner=false 12 rows; ->9ba554f7 same_owner=true 10 rows. Widened across four Temper tenant relations, 975 refs: only `temper-task.character` had cross-owner rows (12/22, all the incident); the other three (953 refs) had zero.
