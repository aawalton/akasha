---
id: 82fb9ed1-bcdb-5760-bdc1-a7a0df42c037
page-type-slug: finding
title: "Help render writes a metric"
domain-slug: repo/code-repo
---

# Claim

`bun ops <verb> --help` attempts a write to production. Help renders fully and exits 0 with the database unreachable, so it does not require the database — but the usage-metric emitter fires on the render anyway, and its failure is one stderr line, fire-and-forget and non-fatal. Whenever the database is up, which is nearly always, there is no symptom at all. So no `ops` verb is usable in a read-only context, including the `--help` read that is the cheapest way to establish what a verb takes.

# Evidence

Measured 2026-08-07, by me, on this workstation:

    env DATABASE_URL=postgres://127.0.0.1:1/x SUPABASE_URL=http://127.0.0.1:1 ops seat start --help

Exit 0. The whole help body rendered, examples and all. The last line on stderr:

    ops: metric emission failed: insertMetric: Error: Unable to connect. Is the computer able to access the url?

So the two halves are established together: the render does NOT need the database, and it DOES reach for it. The only observable is that stderr line, and it appears only while the database is unreachable — which is why a seat running `--help` a hundred times a day never sees it.

Nothing in the instructions corpus claims otherwise, which is the shape of the exposure rather than a contradiction: `grep -rn -i 'read-only|metric'` over `domains/` returns Read-Only Main on `domains/folders/code-repo.md` (about writing into `~/code`), a project-path sentence citing it, and `check-healthkit-read-only` on the unresolved-checks list. None is about the `ops` surface, so a seat told to reach a verb's help before acting has no warning that doing so writes.

The fix the original observation proposed is small and is not this finding's to decide: do not emit a usage metric for a `--help` render.

NOT MEASURED: how many other `ops` code paths emit on a read. The emitter is shared, so the exposure is plausibly every verb, but a count of the paths I happened to try would bound nothing. I ran one verb.
