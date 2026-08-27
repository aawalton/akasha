---
id: db2e3db7-d7f2-5403-bc39-a6e7f5743a96
page-type-slug: finding
title: "Project row apparatus outlives the row"
domain-slug: barred-meaning/project
---

# Claim

The project page row is gone from production and from the schema, and pieces of the code repository that existed only to serve it are still standing.

# Evidence

Measured on `main` at `5b214eefe5` on 2026-08-19, after the last project-row commit landed. Production holds no project page row: 14,806 rows and 28,824 version rows were hard-deleted, `get_inbox_readings` no longer counts them, the `pages_requesting_user_select` policy is dropped, and `pages_project_owner_status_completed_at_idx` went with them.

`get_status_bar_snapshot` still declares `p_metrics_since` and `p_done_since`. Neither appears anywhere in the function body — the only other lines naming them are its own `REVOKE`/`GRANT` lines — and `packages/shared/status-bar-access/src/get-status-bar-snapshot.ts:51` still passes both. Removing them changes the signature, which `CREATE OR REPLACE` cannot do, so it is a `DROP`-and-`CREATE` migration behind a client change.

`packages/shared/status-bar-access/src/index.ts` re-exports `ProjectCountColumn` and `ProjectCountGroup`; `ops audit ast-unused --repo-root /var/home/walton/repos/code` reaches neither from any entry, in a run reporting 181 unused exports over 32,983 weighed.

`REQUESTING_USER_ATTR` in `packages/alanwalton/projects/core/src/lib/provenance-stamp.ts` names an attribute nothing writes and nothing reads. Its module survives the audit whole because `parseRequestingUserId` beside it is still reached: `tools/commands/project/create.ts:141` passes `--requesting-user` to `gateAskApproval`, which checks it against a feature request and returns a `requestingUserId` the caller discards.
