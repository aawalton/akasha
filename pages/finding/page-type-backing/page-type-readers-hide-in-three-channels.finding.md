---
id: f909d0a3-5269-5723-9d53-d718af6c21ea
slug: page-type-readers-hide-in-three-channels
page-type-slug: finding
title: "Page type readers hide in three channels"
domain-slug: domain/global
---

# Claim

A page type's readers reach it through three channels that carry no slug literal in the code repo, so a grep of that repo returns nothing for a type under daily production use. Three of three batches judged on database evidence and a code-repo sweep were overturned when the other channels were searched.

# Evidence

The first channel is a frontmatter value. `pages/persona-points-source/shaestrel-points-source.persona-points-source.md:8` sets `marker: appearance-experiment`, and `tools/lib/daily-tracking/points-source-engine.ts:204,214` passes that marker straight into `getPages({ pageTypeSlug: source })`. The slug is never a literal in code. `appearance-experiment` was ruled delete on that evidence; deleting it would have pinned Shaestrel's daily points to zero with no error.

The second is `codeModule("path/to/file.ts")`. Every caller of `gm-doctrine-pack` and of `selection-policy` stands in the instructions repo and loads a code repo module by path string, so the code repo holds the reader and none of the callers. `gm-doctrine-pack` was ruled remove; it backs `ops awen create-game`, `tally` and `update-game --refresh-doctrine`.

The third is a route string. `scenarios.ts` holds `/kbrepro/kb-geometry-repro-note-8e487b40`, and `alanwalton/web/app/routes/page-detail-loader.server.ts` resolves that first segment as a page type slug against the database. `kbrepro` was ruled remove; it is the fixture behind the `keyboard-geometry` scenario in the default set of `ops mobile sim suite`, and nothing seeds its page.

Two of these fail silently rather than loudly. A read against a retired type returns zero rows instead of raising, so calendar sync would stop with a green exit code and `selection-policy` would fall back to compiled-in defaults, printing them as Alan's own authored weights.

Read on `main`, 2026-08-19.
