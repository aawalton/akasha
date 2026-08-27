---
id: 290eb31a-edd6-5920-9ed5-900e98c52133
slug: location-traces-gate-blind-to-query-builder
page-type-slug: finding
title: "Location traces gate blind to query builder"
domain-slug: domain/alanwalton-app
---

# Claim

`check-no-raw-location-traces-sql` is the enforcement offered for the rule that every read and write of `public.location_traces` goes through `@alanwalton/location-traces-access`, and it cannot see the only spelling the tree uses. Its two regexes scan string-literal text for `public.location_traces` or a SQL keyword before `location_traces`; the sanctioned package reaches the table with `.from("location_traces")`, whose literal holds neither. Nothing says so, and the gate's docstring reads as coverage.

# Evidence

Read in `~/code` on `main` at `383bf60d35c15cd5d10cd07f39ac33ffb38e2bfa`.

`packages/infra/checks/src/lib/ts-pg-location-traces-queries.ts:37-38` declares the whole matcher:

    const PUBLIC_LOCATION_TRACES_RE = /\bpublic\.location_traces\b/i
    const UNQUALIFIED_LOCATION_TRACES_RE = /\b(?:from|join|into|update)\s+location_traces\b/i

Both run over the concatenated text of template and string literals, per that file's header. `packages/alanwalton/location-traces/access/src/insert.ts:43` reaches the table as `.from("location_traces")`. The literal is `location_traces` — the schema qualifier absent, the `from` a JavaScript method name outside the quotes rather than a SQL keyword inside them. Neither regex matches. `git grep 'from("location_traces")'` across the tree returns that one line, so the query-builder spelling is the only access path in use and it is the one the gate is blind to.

Neither file states the gap. `check-no-raw-location-traces-sql.ts:3-13` calls itself an "Enforced CI gate — no raw SQL against `public.location_traces` outside the sanctioned `@alanwalton/location-traces-access` package" and closes "the rest of the tree must not bypass the boundary" — coverage of the boundary rather than of raw SQL. The matcher's header declares two deliberate scope decisions, that it does not filter by call context and does not scan comments, so the absence of a third reads as considered rather than unexamined.

A green run is what makes the hole invisible. Anyone can write `sb.from("location_traces")` anywhere and land it; the check passes and nothing else covers the difference.

The matcher's header ends "The full prescriptive rule lives in Location Traces Access Boundary" — a bare title with no path, so a reader wanting the rule the gate only partly enforces has nothing to resolve.

Found ingesting `dirty/questions/code-repo-head-documents-alanwalton.md`, which met this from the head document offering the gate as proof. That head document has left the code repository; the gate has not.
