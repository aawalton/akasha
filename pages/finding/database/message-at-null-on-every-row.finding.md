---
id: a7d8237c-bd7c-56eb-8d86-fd20284dbc25
page-type-slug: finding
title: "Message at null on every row"
domain-slug: domain/database
---

# Claim

`public.messages.message_at` is NULL on every row of the table, while `created_at` and `updated_at` are populated on every one. Its name reads as the authoritative "when this message happened" field, so it is the first column reached for, and every predicate over it returns a silent zero rather than an error.

# Evidence

Measured 2026-08-07 through `ops db psql`:

```
 total | with_message_at | with_created_at | with_updated_at
-------+-----------------+-----------------+-----------------
  2553 |               0 |            2553 |            2553
```

The column is typed `timestamp with time zone` and exists. `null > null` is `null`, which is false, so a comparison against it yields an empty filter rather than an error, and an empty filter is indistinguishable from a true zero. Nothing in the situation asks anyone to look.

This is not a transient. The same 0 was measured on 2026-07-29 by `athena` when the table held 47,161 rows; it has since drained to 2,553 and the column is still empty on all of them. That earlier reading cost something: a drainage measurement reported "0 of 248 targets ever drained after their backlog began" — clean, plausible and false. It was caught only because a positive control on the same query shape also returned 0 where it had to be large, and re-running on `created_at`/`updated_at` gave 2,885 of 2,885 for the control and 10 of 248 for the real answer.

Two resolutions, not decided here and one query apart: the column is dead and should be dropped, or it has a writer that stopped and the emptiness is the symptom.

Carried out of `dirty/skills/agent-harness/findings/absent-result-reads-as-pass.md`, which is queued for removal, and re-measured rather than copied.
