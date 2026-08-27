---
id: b6fa103c-a105-57cb-89bf-12081e1e78c9
slug: lockfile-maps-to-no-graph-node
page-type-slug: finding
title: "Lockfile maps to no graph node"
domain-slug: domain/global
---

# Claim

`bun.lock` maps to no graph node, so a commit changing only the lockfile wakes no check anywhere in the repo. `fileNodeIdCandidates("bun.lock")` returns `[]`, the same answer it gives for `.gitignore`. The registration comment at `check-configs.ts:201-202` meanwhile states that package population covers "the json + lock", and `PACKAGE_POPULATION` is `["package"]`. A dependency change altering no source file is judged by nothing, while the registry tells a reader it is covered.

# Evidence

Measured by dalla on 2026-08-10 against the tree worktree, by importing the live matcher rather than reading it:

  "package.json"                             -> ["json-file:package.json"]
  "packages/temper/addons/Foo/package.json"  -> ["json-file:packages/temper/addons/Foo/package.json"]
  "bun.lock"                                 -> []
  ".gitignore"                               -> []
  "packages/x/a.ts"                          -> ["ts-file:packages/x/a.ts"]

So this is one shape with `.gitignore` rather than a separate defect: `fileNodeIdCandidates` in `packages/infra/ci/worker/src/pure/matcher.ts` keys on extension and file kind, and a tracked file with neither gets no node, whereupon `closureIntersectsChangedFiles` has nothing to intersect and every non-always-run step is selected out. #18504 established the `.gitignore` half from the `check-lint` side and closed it there with `alwaysRun`; nobody has looked at the lock.

Note what the same reading rules OUT, because a seat routed it to me as one defect and it is two. The repo-root `package.json` is NOT invisible — it gets `json-file:package.json`. #18513 handed up that the addon roster turns on the root workspace globs and that no gate wakes on an edit there, shared by every check deriving from `listAllAddons()`. That is real but its cause is scope rather than absence: watches over `json-file` are path-scoped, and #18513's own widening moved one from `packages/temper/addons` to `packages/temper`, which still does not reach the repo root. Two different repairs, and treating them as one would fix neither.

Measured reach of the roster half: 23 check files call `listAllAddons()` across `packages/infra/checks/src/checks` and `packages/temper/shared/build-deploy/checks/src`, plus five registry modules. #18513 reported eleven.
