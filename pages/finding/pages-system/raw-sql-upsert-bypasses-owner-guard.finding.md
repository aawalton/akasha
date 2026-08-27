---
id: d885fed7-833a-5fd8-866e-312d5f8f8a48
page-type-slug: finding
title: "Raw SQL upsert bypasses owner guard"
domain-slug: domain/pages-system
---

# Claim

An owner-crossing test on the `upsertPage` write path had gone stale rather than exposed a guard gap: Alan's owner-stability guard correctly rejects the cross-owner reassignment on the `upsertPage` path the test exercised, but the reassignment remains genuinely possible via the separate raw-SQL `upsertPageRowPg` path that bypasses the guarded proc layer; the fix for the stale test landed, but the row was left blocked mid-flight on a CI-infra capacity wedge unrelated to the change.

# Evidence

Filed as project #16172, domain `pages-system`, status `someday_maybe`.

**Main went red.** Alan's owner-stability guard (e4d153d24a, 10:33Z, on #15971) rejected what `packages/shared/pages/access/src/upsert.database.test.ts:112` asserted succeeds: seeds a page owned by u2, `upsertPage` with `where:[{key:"externalKey",eq:"k1"}]`, `set:{userId:"u1",...}` — guard rejects with P0001. Timeline: 09:17Z nightly passes -> 10:33Z guard lands -> ~14:00Z first sweep RED. Escaped branch CI because slow/database suites are excluded (structural gap filed separately by dalla, not this row).

**Stale test or guard gap? Both, on two paths.** `upsertPage` (`upsert.ts:90`) routes through procs, inherits the guard — test stale there. `upsertPageRowPg` (`pg/upsert-page-row.ts:46`, raw SQL, `ON CONFLICT ... user_id = EXCLUDED.user_id` at :22) bypasses the proc layer — hole real, deliberate, documented (`pg/move-attribute-to-content.ts:51`). Raw path is sibling #16019, out of scope here.

**Trap:** owner-crossing impossible via `upsertPage` but possible via `upsertPageRowPg` — a renamed test must name the path it guards or become a false global claim.

**Scope as filed:** convert to a rejection assertion; rename and re-derive rationale; check whether narrowing is needed for owner-less `where`; run the slow/database suite explicitly.

**Positive control** (dalla's): guard's commit message says wired "at the single patchUpdate lowering"; the failing test inherits it because the guard fired, not because the message claims it.

**Work complete, blocked on CI-infra capacity wedge:** committed fd0afc4b + 9b2881ce on `project-16172` — test renamed to note the `upsertPageRowPg` bypass so "impossible" isn't a global claim (`pg/` untouched, owned by #16019); pinned the guard's rejection text.

**Narrowing convention still justified:** `_enforce_owner_stability` (`proc/src/_enforce_owner_stability.ts:65-67`) keys on incoming userId, no-ops when set names none — an owner-less where still silently rewrites a foreign row. A second test pins this; may warrant its own row.
