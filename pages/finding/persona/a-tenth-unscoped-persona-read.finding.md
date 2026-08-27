---
id: 41954d81-4347-5996-a915-2c096ee00275
slug: a-tenth-unscoped-persona-read
page-type-slug: finding
title: "A tenth unscoped persona read"
domain-slug: page-type/persona
---

# Claim

`packages/agents/shared/persona-wake-slugs.ts:45` calls `getPages(sb, { pageTypeSlug: PERSONA_PAGE_TYPE_SLUG })` with no owner scope, so it enumerates every persona row wholesale. It is the same hazard as the three reads repaired on branch `project-19260`, and it is not a one-shot script.

# Evidence

Read first-hand from `/home/walton/code` on 2026-08-16, on `main` rather than in the worktree. The file is 81 lines. Line 45 stands inside the function that feeds `personaTargetsFromRows`, and `getPages` is imported from `@shared/pages-access` at line 3.

This came out of a delegate's hand-back, which named it at line 94. That line number is wrong for the file as it stands on main; the call is at 45. The claim itself reproduced.

NOT ESTABLISHED: whether the wake path is entitled to read every persona regardless of owner, which would make this correct rather than a gap. The three reads repaired beside it were all figures Alan reads, where the scope matters; a wake fan-out may not be one. Whoever picks this up should settle that before switching it to `getOwnerScopedPages`.
