---
id: e1a41689-c39d-5045-b388-2d281cd37fa7
slug: two-lib-files-declare-one-persona-code-seam
page-type-slug: finding
title: "Two lib files declare one persona code seam"
domain-slug: domain/ops-cli
---

# Claim

Two files under `tools/lib/` declare the same code-repository seam for the persona namespace, each written by a different seat moving a different half of the verbs.

# Evidence

`tools/lib/persona-code.ts`, landed at 2acf3d3b8 with fifteen persona verbs, declares `serviceRoleClient`, `pagesAccess`, `personaResolve` and `coverSource`. The fourteen verbs moved beside it declare the same four reaches as `serviceClient`/`pageAccess` in `tools/lib/persona-pages.ts`, `resolvePersona` in `tools/lib/persona-resolve.ts`, and `coverSource` in `tools/lib/persona-cover-source.ts`.

The two sets are not copies of each other: the shapes each declares over the same capability differ, so a reader meeting both cannot tell which is the original. Neither is stale, because each is the only declaration its own verbs use.

The overlap is confined to that seam. The rest of the second set — the persona core surface, the crossings reach, the value-tier reach, the reward-queue reach — has no counterpart in the first.

Consolidating would mean rewriting fourteen bodies against a second set of interfaces and re-deriving the byte-identical proof each already carries, which is why it was recorded rather than done inside the move.
