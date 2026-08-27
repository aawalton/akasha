---
id: a3dcf835-b7ac-5554-9bb8-f942cf2eb9a3
slug: page-patch-touch-diverges
page-type-slug: finding
title: "Page patch touch diverges"
domain-slug: domain/database
---

# Claim

Of the four `page_patch*` procedures, only `page_patch_by_id_if_status` never suppresses the `updated_at` touch. The other three set `app.skip_updated_at_touch` when every key being set is `lastViewedAt` or `loreIngestedAt`, which `set_updated_at()` reads to decline the bump. An otherwise identical minor-only patch therefore advances `updated_at` through that one door and not the other three, so a reader treating `(seq, updated_at)` as a row version sees such a patch through one door only.

# Evidence

Read in the code repo at `packages/shared/supabase/database/schema/public/`, on `main`, on 2026-08-07.

`functions/set_updated_at.sql` guards the assignment:

```sql
IF (current_setting('app.skip_updated_at_touch', true) IS DISTINCT FROM 'on')
   AND ((OLD IS NOT DISTINCT FROM NULL) OR (NEW.updated_at IS NOT DISTINCT FROM OLD.updated_at)) THEN
  NEW.updated_at := now();
END IF;
```

`functions/` holds exactly four patch procedures: `page_patch.sql`, `page_patch_by_id.sql`, `page_patch_by_seq.sql`, `page_patch_by_id_if_status.sql`. Counting `v_skipTouch` in each gives 3, 3, 3 and 0 — the first three declare it, compute it and act on it, and the fourth mentions it nowhere.

In `page_patch_by_id.sql`, representative of the three, line 82 onward:

```sql
v_skipTouch := (coalesce(array_length(v_setKeys, 1), 0) > 0
  AND NOT EXISTS (SELECT 1 FROM unnest(v_setKeys) AS elem
                  WHERE elem <> ALL (ARRAY['lastViewedAt', 'loreIngestedAt']::text[])));

IF v_skipTouch THEN
  PERFORM set_config('app.skip_updated_at_touch', 'on', true);
END IF;
```

`page_patch_by_id_if_status.sql` builds `v_setKeys` at line 64 exactly as its siblings do at line 65, and uses it at lines 72, 148, 195 and 196 for relation mirroring and event projection — so the array is live there and only the suppression is missing, rather than the computation being dead.

`tables/pages.sql` line 11 declares `seq bigint NOT NULL`. It is assigned from `nextval()` at insert, no `page_patch*` procedure updates it and no trigger touches it, and the unique index `pages_page_type_slug_seq_idx` at line 107 depends on that.

Not established here: whether the omission is deliberate. Nothing in the file says either way, and the three siblings carry no comment explaining the suppression they do apply.
