---
id: 4e93c109-4f24-5e51-b025-0d0487426987
page-type-slug: finding
title: "Workspace universal stated twice"
domain-slug: repo/code-repo
---

# Claim

The `workspace-paths` docblock states its false universal twice, and the standing finding on it quotes only the second. `packages/shared/workspace-paths/src/index.ts:4-6` says every consumer that needs the workspace directory list routes through `listWorkspaceDirs` "rather than reading the root manifest itself"; `:24-26` says "because every consumer routes through this one function". A repair driven by the filed sentence corrects `:24` and leaves `:4`, the one a reader meets first.

# Evidence

Measured at `~/code` `ecf5f9518f769757f3c2d53227a449b79203a887` on 2026-08-07, emptying `dirty/questions/knowledge-document-population-claims.md`, whose first entry argued from the same universal in a knowledge document since removed.

`rg -ci 'every consumer'` over `packages/shared/workspace-paths/src/index.ts` returns 2. Both are in the module docblock, both quantify over consumers, and both are false for the same reader.

This adds one thing to `pages/finding/code-repo/workspace-reader-not-sole.finding.md` and nothing else. That finding is the better record: it names the non-conforming consumer, `buildWorkspaceMap` in `packages/agents/supervisor/src/oauth-proxy-tree-version.ts`, gives the depth-1 against depth-2 expander divergence, and says what a dropped block would cost the proxy's version hash. It quotes only the `:24-26` sentence. Everything it says about why the universal is false carries over to `:4-6` unchanged, so this is a second site rather than a second claim, and it should be deleted alongside that one.

Confirmed the non-conforming reader still stands at this ref: `oauth-proxy-tree-version.ts:65-68` walks upward for a `package.json` whose `workspaces` is an array, and `:81` Zod-parses `workspaces: z.array(z.string()).optional()` — the root manifest read directly.

Not measured, and deliberately not filed: two other direct readers of the array turned up and neither clearly falsifies the docblock, so they are recorded here rather than claimed. `packages/infra/scripts/src/clean-stale-folders.ts:135` reads `workspaces` only as a presence sentinel for "is this a leaf package", taking its directory set from `knownDirsFromFileList` off git output instead. `packages/infra/workspace/cli/src/lib/package-add/run.ts:59,68` parses the array and writes it back, which is outside a read-and-expand seam's job. Whether either counts as "a consumer that needs the workspace directory list" is a call I did not make.
