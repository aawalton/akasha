---
id: ae38ef31-6ae4-5605-b661-3b5c950021a3
slug: database-reachable-past-every-gate
page-type-slug: finding
title: "Nothing stops an agent connecting to the production database as service_role"
domain-slug: domain/agent-harness
---

# Claim

An agent that sources the workstation secrets file and runs `psql` reaches the production database directly as `service_role` with `default_transaction_read_only` set to `off`. No hook, gate or rule stands between the shell and a write.

# Evidence

Thirty-eight hooks stand in `tools/hooks/`. None of them names `psql`, `DATABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` or the database in any form. The whole set is about repository writes, git, comments, file size, seat lifecycle and reads.

`psql` is on the PATH. `~/.secrets.env` is readable by the agent's own account and carries both `DATABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Sourcing it and connecting answers `current_user = service_role` and `default_transaction_read_only = off`.

That is the write role, not the read-only one. `ops db psql` exists to hand an agent a session that cannot write, and its own document says read-only "is enforced by `default_transaction_read_only`, not by grants alone" — which is the setting a direct connection has switched off. So the read-only path is a convenience an agent takes, never a boundary it is held inside.

Three things are bypassed at once. The read-only role, since the direct connection is `service_role`. The ops telemetry, since `ops.command.duration_ms` is written by the dispatcher and a bare `psql` never enters it. And the help-before-execute gate, which is aimed at `db psql-write` through a document that declares it irreversible, and which does not act on that document.

The asymmetry against the repositories is the sharp part. A shell write into the instructions repo is refused by a hook and cannot be committed; the harness states that a write from a shell is judged the same as one made with a tool. The production database, holding tens of millions of rows, takes a write from that same shell with nothing in the way.

No rule anywhere requires an agent to reach the database through `ops db`. `pages/domain/database.domain.md` describes the mechanism and does not bind a reader to it.
