---
id: 08850dcd-cc33-5f67-b6a1-577586b1ffef
page-type-slug: finding
title: "Phantom rls claim"
domain-slug: domain/database
---

# Claim

A Tier-3 CLAUDE.md asserts a Postgres RLS control that does not exist for a table not yet identified at filing; the table is fail-closed today only through an undocumented filter, so a good-faith cleanup that trusts the doc and removes the undocumented filter would open a real data leak.

# Evidence

Filed as project #15953 (domain database). Reported by aine (2026-07-25) inside a doctrine hand as an illustrative instance, pulled into its own project by athena as a live data-exposure hazard rather than doctrine.

Claim as received: a Tier-3 CLAUDE.md asserts an RLS control that does not exist. The system is fail-closed by accident, via an undocumented filter. The doc "would read as permission to remove it."

Why dangerous: the hazard is the combination of (a) a real protection existing only as an undocumented accident and (b) an authoritative doc claiming the protection lives elsewhere. A good-faith cleanup finds the undocumented filter, checks the doc, reads that RLS handles this, applies the Existence Check, and removes the only thing holding the door shut. Framed (aine, accepted by athena) as the "false safety claim" mechanism at its worst: silence invites verification, a confident sentence forecloses it.

Not yet known at filing: no file path, table, specific control, or filter identity given; specifics requested from aine.

First steps: (1) get specifics from aine; (2) query live pg_policies / `bun ops schema show`, locate the filter in code; (3) decide the fix only then — probably not "correct the doc" (a hazard whose only mitigation is a doc has no reach guarantee); if a real RLS policy should exist, add it; (4) the filter must stop being undocumented-and-load-bearing either way.

Priority: security-adjacent, not urgent (fail-closed today) but a latent leak armed by well-intentioned cleanup.

Follow-up (athena, 2026-07-25T07:14, said to supersede the above in three places — only the instrument-control survives before the row is cut off): all DSNs held resolve to the same database, `postgres` @ 10.244.5.250 — a real Supabase instance (auth/realtime/cron/net schemas, 5 temper_* tables found), proving the instrument sees positives before a negative is trusted. Cut off before naming the table, control, or filter.
