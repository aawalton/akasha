---
id: 5918814f-b867-5744-835b-fac0882fa394
page-type-slug: finding
title: "Contract snapshot window unmarked"
domain-slug: domain/global
---

# Claim

A deploy that applies a contract migration lands its DDL and commits the regenerated schema snapshot as two separate commits minutes apart, so for that window the committed record declares a function body the live database no longer has. Nothing marks the artifact as mid-sync: its `GENERATED — do not hand-edit` header is true in both states and therefore says nothing about which one a reader is in.

# Evidence

MEASURED ACROSS THREE DEPLOYS, from `git log` on `~/code`, each `chore: post-contract snapshot sync` against its own parent:

    2026-08-02  17:20:45Z → 17:34:26Z   13m41s
    2026-07-28  22:23:46Z → 22:36:20Z   12m34s
    2026-07-26  04:42:49Z → 04:51:09Z    8m20s

The practice is current: `97e3ca2d10`, the most recent, moved `packages/shared/supabase/database/schema/public/functions/get_status_bar_snapshot.sql` by 3 insertions and 20 deletions — a function body that was wrong in the committed record for the whole window.

NOTHING SIGNALS THE WINDOW. That file's first two lines today read "GENERATED — regenerate via `bun run gen-schema` in @shared/supabase-database." and "Do not hand-edit." Both are true inside the window and outside it. A reader sees a complete, well-formed, plausible function body that is simply no longer true. `grep -rln "post-contract|mid-sync|snapshot sync"` over the TypeScript outside `node_modules` and `dist/` returns one file, `move-to-deploy-migrations.ts`, and nothing that marks the artifact.

WHY THE WINDOW IS WORSE THAN ITS LENGTH. It is the only interval in which anyone has a reason to read that file about that change — a verifier checks a claim right after the deploy that produced it, so the exposure is concentrated exactly where the readers are. One reader came within a decision of returning a correctly-finished project on it, and what stopped them was asking rather than concluding.

THE PACKAGE'S OWN RULE CANNOT BE HONOURED HERE. It says to "commit the regenerated snapshot + types in a single commit so the live DB and the committed artifacts stay in lockstep". A deploy-applied contract splits the two acts by construction.

NOT MEASURED. How many deploys apply a contract; whether the sync can join the deploy's own transaction; and whether any automated consumer reads the snapshot inside the window — the static-analysis checks that consume it run in CI, and whether a CI run lands inside a window is one query into the pipeline timings.
