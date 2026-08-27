---
id: 4188cc06-25c7-55ab-90f4-311b05f1beb8
page-type-slug: finding
title: "The losing copy of a forked package is not merely older: it refuses its own callers' input, and never fires only because nothing loads it"
domain-slug: repo/instructions-repo
---

# Claim

A forked package can be live in the tree and dead in every code path at once, and only reading both copies settles which survives. Dates do not settle it: the newer copy of `temper/shared-foundation-misc-eso-paths` is the broken one.

# Evidence

Read 2026-08, both copies in full.

Instructions rewrote the provenance pattern from a regenerating command to a generator path and tightened the schema to refuse any whitespace. Every committed artifact on disk carries a command with spaces in it, so the schema refuses its own callers' input. It never fires because `instructions/tools/lib/eso-clone-code.ts:26` loads the code repository's copy instead.

Twenty-two package names exist in both `code` and `instructions`, and every one was adjudicated by reading both copies rather than by their dates.

Six are byte-identical across every tracked file: `@shared/errors-core` (13 files), `@shared/pages-url` (6), `@shared/supabase-auth` (12), `@shared/supabase-database` (5), `@temper/shared-foundation-misc-eso-paths-resolve` (5), `@temper/shared-saved-variables` (8). Sixteen have diverged, worst first: `@temper/shared-build-deploy-checks` (110 files in code, 109 of them absent from instructions, and the one shared file differs), `@infra/scripts` (42 files, 40 absent, 0 identical), `@temper/shared-build-deploy-addons-resolve` (11 files, 2 identical), `@shared/utils-sync` (3 files, 0 identical).

Not measured: whether any of the other fifteen diverged forks carries the same shape of dead-but-live breakage. Only this one was traced from its schema to its loader.
