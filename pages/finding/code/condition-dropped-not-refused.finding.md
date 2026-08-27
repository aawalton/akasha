---
id: 01a02024-ee0d-7000-9631-d086e011ecbb
page-type-slug: finding
title: "Six sites answer an unreadable restriction with no restriction at all"
domain-slug: domain/global
---

# Claim

Six sites across TypeScript, PL/pgSQL and shell parsing drop a condition they cannot read rather than refusing it, and every one widens. Survivors go into `every()`, an `AND`-join, or a loop that may not run, and an empty set is vacuously true, so "I could not read your restriction" answers as "you stated none". They span pages access, worker runtime, SQL, email routing and this repo's gates; no domain below `code` reaches them all, and nothing names the class, so each seat rediscovers it.

# Evidence

2026-08-20; figures ran. `page-query-bind.ts:22` already states this rule, and reaches one module: an unreadable narrow is "refused rather than dropped, because dropping one answers with every page of the type".

- `file-narrow.ts:85,94` — a repo-settled key returns null and is filtered out. `userId=<garbage>` on `finding`: 3244 of 3244; control `slug=<garbage>`: 0. 355 of 367 page-type files state no `owner-slug`.
- `file-write.ts:131` `!narrowed.every(...)`, reached by `hardDeletePages`. Ran it: bogus `userId` gives kept=0, every=true. Only `refuseSyntheticNarrow:62` stops that, off a second list nothing ties to it.
- `events-cursor.ts:55` `if (val === null) continue`. `event_category` is non-nullable, so the all-empty case that would raise a SQL error is unreachable and every case widens. `page-versions-projector`: 12,241,908 rows on 3 subscriptions with null `page_type_id`.
- `page_patch_by_id_if_status.sql` — `v_result` is set only inside the loop (`:199`), returned at `:204`, no `IF NOT FOUND`; five conditions (`:83-86`) become one NULL, which its deleted caller read as a lost race.
- `ops-command.ts:36` skips an unrecognised head word. `42fa94bced` added one token; of 17 forms, 10 still parse to zero calls. `require-ops-help.ts:27` returns on zero, and return means allow.
- `email-rules.ts:64` discards `parseMatch().stray`; `rules-partition.ts:182` is `every()`. `rules-engine.ts:135` reports `stray: 0` for a body with no `# Match`, blinding its audit. Ends at `email-worker.ts:78` forwarding mail. 107 files, 0 firing; control fires.

DRAFT, not landed — `domains/code.md`, Alan's call:

## Carry Or Refuse

**Carry every condition a caller states into the test, or refuse the call; never test only the ones you could read.**

An empty test passes everything, so a dropped condition answers "I could not read your restriction" as "you stated none", and the widened result looks like the right one. A caller stating no conditions asked for everything and is not this.
