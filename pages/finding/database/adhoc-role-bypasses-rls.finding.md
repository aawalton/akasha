---
id: bed831e2-b468-526f-abf8-1291e35b8136
slug: adhoc-role-bypasses-rls
page-type-slug: finding
title: "Adhoc role bypasses rls"
domain-slug: domain/database
---

# Claim

`ops db psql` connects as `agent_adhoc`, a role carrying `rolbypassrls`, so an ad-hoc read returns every tenant's rows though row-level security is enabled on the tables it reads. The command's help states the read-only guarantee and is silent on this, so a query written without an explicit `user_id` predicate answers across all thirteen tenants in `public.pages` and looks exactly like one that was scoped correctly.

# Evidence

Measured 2026-08-07 against the live database, reading only the catalog and one count.

`select current_user, rolbypassrls from pg_roles where rolname = current_user` through `ops db psql` returns `agent_adhoc|t`. So the role the command connects as is exempt from row-level security outright, rather than being scoped by it to some default tenant.

`select relname, relrowsecurity, relforcerowsecurity from pg_class where relname='pages' and relnamespace='public'::regnamespace` returns `pages|t|f`. Row-level security is enabled on the table, and `pg_policies` carries five `SELECT` policies on it — every one of them bypassed on this connection.

`select count(distinct user_id) from public.pages` returns 13, so the exposure is a live multi-tenant one rather than a theoretical property of a single-tenant store.

`ops db --help` describes the command as launching "psql as the read-only ad-hoc role, forwarding every argument verbatim; read-only is enforced by `default_transaction_read_only`, not by grants alone". That sentence is accurate and complete about writes and silent about reads, which is what makes the trap survive a careful reading of the help.

The only place the estate recorded this was `dirty/skills/persona-craft/economy.md:78-81`, in the course of explaining why two persona-economy queries carry an explicit `user_id` scope and that the scope is load-bearing. That document is under quarantine and queued for removal, so the observation was about to be swept along with it. It was found while ingesting `dirty/questions/instructions-ingestion-division.md`, whose last bullet cites the passage; the bullet itself was cut as moot, the task it argued about having been deleted, and this was separated out and filed rather than kept, being a defect in a live instrument rather than instruction.

The product code never has this shape available to get wrong: it reads through a path where RLS applies, so the mistake exists only on the ad-hoc connection, which is also the one nothing reviews.
