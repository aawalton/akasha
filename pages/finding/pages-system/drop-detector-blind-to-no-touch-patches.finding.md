---
id: d096bc32-cbec-512d-9649-b20bf56eb9ac
page-type-slug: finding
title: "Drop detector blind to no touch patches"
domain-slug: domain/pages-system
---

# Claim

The pages drop detector cannot see a committed patch whose every set-key is `lastViewedAt` or `loreIngestedAt`, and its own comment on the version pair denies that gap. It keys episodes on `(seq, updatedAtMs)`; `seq` never moves on an UPDATE, and `set_updated_at()` declines the bump wherever `app.skip_updated_at_touch` is `'on'`, which three of the four `page_patch*` procedures set for exactly that patch. Neither half advances, so a stream that dropped it is scored as having delivered everything.

# Evidence

Read in the code repo on `main` at `1313565199`, on 2026-08-07.

`packages/shared/pages/drop-detector/src/types.ts`, above `ServerRow` at lines 30–32: "`seq` is creation-stable (never mutated on UPDATE), `updated_at` is trigger-bumped on every UPDATE — together they advance on both INSERTs and UPDATEs."

`src/capture-core.ts` line 41 is the predicate the drop rule turns on, and reads that pair alone:

```ts
return cur.seq > known.seq || (cur.seq === known.seq && cur.updatedAtMs > known.updatedAtMs)
```

Its header calls `stepCapture` the single source of truth for the drop decision and `detect.ts` a wrapper over the same machine, so no second path carries a different signal. `src/read-server-truth.ts` supplies the pair from `collectPages`, parsing `seq` and `updatedAt` at lines 23–24 and nothing else.

`schema/public/functions/set_updated_at.sql` guards the assignment:

```sql
IF (current_setting('app.skip_updated_at_touch', true) IS DISTINCT FROM 'on') AND (...) THEN
  NEW.updated_at := now();
END IF;
```

`functions/` holds four `page_patch*` procedures. `page_patch.sql`, `page_patch_by_id.sql` and `page_patch_by_seq.sql` each carry `PERFORM set_config('app.skip_updated_at_touch', 'on', true);` at lines 84, 85 and 85, under a condition holding when every set-key is `lastViewedAt` or `loreIngestedAt`. `page_patch_by_id_if_status.sql` sets it nowhere. That divergence is filed as `pages/finding/database/page-patch-touch-diverges.finding.md`, which names the consequence only as "a reader treating `(seq, updated_at)` as a row version"; which reader that is, and that its comment denies the gap, is what stands here.

Searched the package for a recorded caveat: `grep -rn "caveat|invisible|blind|not detected|undercount|backwards" src/*.ts` returns `detect.unit.test.ts:173` (a backwards `updated_at` at the same `seq`) and `types.ts:45` (why keying on `seq` alone would leave UPDATE loss invisible). Neither is this case.

Not established: how often such a patch is committed through the three suppressing doors. Nothing read here measures that.
