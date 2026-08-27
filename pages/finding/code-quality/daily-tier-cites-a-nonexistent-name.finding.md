---
id: 276aea73-2591-50ec-b64c-add584bb953a
slug: daily-tier-cites-a-nonexistent-name
page-type-slug: finding
title: "Daily tier cites a nonexistent name"
domain-slug: domain/code-quality
---

# Claim

`packages/alanwalton/personas/core/src/daily-tier.ts:10` orients a reader by saying `dailyLevelColor` in `@shared/status-bar-access` mirrors the circle formula; no such name exists anywhere in `~/code`.

# Evidence

Found on 2026-08-07 while emptying `dirty/skills/alan-harness/findings.md`, which recorded the same dangling pointer on 2026-07-28. That document is queued for removal, so the observation is filed here to outlive it. Both readings were re-taken against `~/code`.

`daily-tier.ts`'s module header ends: "A pure mirror of the live `faithLevel` / `learnLevel` `daily-tracking` page-type formulas (the page-type rows are the source of truth; this mirrors them for the local worktree preview, the same way `dailyLevelColor` in `@shared/status-bar-access` mirrors the circle formula). No IO."

`rg -n 'dailyLevelColor'` across the whole of `~/code`, excluding `node_modules` and `dist`, returns exactly one line: that comment. The name is in no export, no module, no test and no other comment.

What the sentence was reaching for does exist under another name. `resolveValueStoplightTiers` is declared in `packages/shared/status-bar-access/src/daily-stoplights.ts` and exercised in its unit test beside it, and that is where the values circles resolve.

The sentence is load-bearing in the way an orientation pointer is: it is the header's only cross-package reference, and a reader following it to see how the mirrored formula is kept honest finds nothing and cannot tell whether the name, the package or the whole arrangement moved.

Not established: whether `dailyLevelColor` ever existed. `domains/global.md` **Ubiquitous Naming** would have this read the other way round — "Before naming anything, find out what it is already called" — so the repair is probably to name `resolveValueStoplightTiers`, but which name the author meant is theirs to say.

Not repaired here. `domains/folders/code-repo.md` **Read-Only Main** forbids writing into `~/code`, and a code change belongs in a worktree behind the code gates rather than in an archivist's ingest run.
