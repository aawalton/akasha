---
id: 70efc0d9-0607-510f-8091-b4cee4162afe
slug: seq-scope-read-as-global
page-type-slug: finding
title: "Seq scope read as global"
domain-slug: domain/pages-system
---

# Claim

`ops project create --help` calls a page seq "the next global sequential number", but a seq is unique only within a page-type. On live today, 80,070 distinct seqs are carried by more than one live row, against 1,051,101 distinct seqs. So `WHERE seq = N` against `public.pages` is a multi-row predicate, and nothing in the estate scopes it: no check governs which rows a seq predicate returns, and the help text is the only place the value is described to whoever writes the SQL.

# Evidence

Measured 2026-08-07 against live via `ops db psql`. `SELECT count(*) FROM (SELECT seq FROM public.pages WHERE deleted_at IS NULL AND seq IS NOT NULL GROUP BY seq HAVING count(*) > 1)` returns 80,070; distinct seqs 1,051,101. Seq 16869 alone carries 3 live rows.

`ops project create --help` verbatim: "Create a new project. Auto-assigns the next global sequential number." The `--parent-seq` flag likewise reads "Global sequential number of the parent project."

The failure is two-sided and only one side is loud. In subquery position Postgres raises "more than one row returned by a subquery used as an expression", which stops the reader. A plain `SELECT ... WHERE seq = N` returns every type's row, or another type's row when the expected one is absent, with no error at all — indistinguishable from a correct single-row read.

The `ops` verbs are not exposed: `project show --seq` scopes by page type. The exposure is hand-written SQL against `public.pages`, which no check reaches — the nine pages checks under `packages/infra/checks/src/checks/` govern where SQL lives and how a predicate is written, not which rows come back.

Originally observed 2026-07-28 by `athena-intake` and recorded in the retired `pages-system` findings hub; re-measured here before filing.
