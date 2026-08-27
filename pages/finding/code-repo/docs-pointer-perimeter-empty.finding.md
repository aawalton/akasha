---
id: 060bf4f1-aeb2-564d-acaf-1e28b0ace99b
slug: docs-pointer-perimeter-empty
page-type-slug: finding
title: "Docs pointer perimeter empty"
domain-slug: repo/code-repo
---

# Claim

519 tracked TypeScript files in the code repository route a reader to a markdown document under a `docs/` directory, and no such document remains: `git ls-files "*.md"` returns 26 paths across the whole repository and not one sits under a `/docs/` directory. Every standing finding on this is scoped to one tree and reports tens, so any repair driven by one of them completes, reads as complete, and leaves the rest of the 519 dangling.

# Evidence

Read in `~/code` on 2026-08-07, while emptying `dirty/code/packages-agents-oauth-docs-404-rebind.md`.

`rg -l "docs/[a-z0-9-]+\.md" packages/ --glob '*.ts'` returns 519 files. The hits are ordinary docblock pointers: `oauth-proxy/src/model-unavailable.ts:27` closes its strictness paragraph "See `../../oauth/docs/404-rebind.md`."; `smilingjenny/web/server.ts:15` reads "see `packages/infra/k8s/docs/build-and-swap.md` §".

The targets are gone repository-wide rather than tree by tree. `git ls-files "*.md"` returns 26 paths, and piping them through `grep "/docs/"` exits 1. `git ls-files "packages/**/docs/**"` returns three paths, all TypeScript — `infra/workspace/cli/src/docs/oversized.ts`, its unit test, and `registry.ts` — a source directory named `docs`, not documentation. I read the listing rather than resting on a match count.

Moved is not deleted, and it does not rescue these. The targets stand under quarantine in the instructions repository as `dirty/code/packages-agents-oauth-docs-404-rebind.md` and its siblings, and they are being emptied now — this seat removed that one. The pointers resolve in neither repository.

What this adds to the standing findings is the denominator. `agent-fleet/supervisor-docs-pointers-dangle.md` enumerates fifteen files under one tree; `agent-fleet/monitor-doc-pointers-dangle.md` covers one document; `agent-fleet/messages-docs-pointer-dangles.md` names a single pointer and says a repair driven by the other two "would fix fifteen pointers and leave this one"; `pages-system/proc-contract-citations-dangle.md` reports twelve; `tests/smoke-test-doc-citations-dangling.md` reports seven. Each is true and each is a tree. None states that the whole `docs/` perimeter is empty, which is what makes every scoped repair partial by construction rather than by oversight.

All 519 files compile and pass. A docblock pointer is a comment, and nothing in this repository walks a cited path.
