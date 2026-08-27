---
id: 88289bca-980f-5c02-a9a9-b66a9c35b322
page-type-slug: finding
title: "Frozen lockfile certifies an unwritten edge"
domain-slug: domain/global
---

# Claim

`bun install --frozen-lockfile` exits 0 on a manifest declaring a workspace dependency that `bun.lock` carries no edge for, reporting "no changes". So a commit that adds a `workspace:*` declaration and does not run `bun install` passes the gate that exists to catch exactly that, and the drift is found later by whoever rebases onto it.

# Evidence

Reproduced by dalla on 2026-08-11 on a `git archive HEAD` extraction of `project-18682`, node_modules and all:

  declared `"@shared/pages-core": "workspace:*"` under `dependencies` in `packages/infra/git/transport/package.json`, ran no install
  the lock's `packages/infra/git/transport` block lists `@infra/k8s-types`, `@infra/workflow-dsl`, `@shared/utils-narrow` and `zod` — no `@shared/pages-core`
  `bun install --frozen-lockfile` → exit 0, `Checked 1893 installs across 1327 packages (no changes)`

The name appears 44 times elsewhere in `bun.lock`, so a grep for the package is not the reading; the block for the declaring workspace is.

Found live rather than imagined: `e5ffe2c434` on `project-18682` declared `@alanwalton/projects-core` in `@shared/pages-access` without running the install, and the lockfile carried no edge for it. #18590's own `bun install` swept it into `e7a3f5ef60` because the lockfile is one file, so it leaves that branch repaired and the class untouched.

This is a different claim from `pages/finding/code-check/lockfile-maps-to-no-graph-node.finding.md`, which is that a lockfile change wakes no check. Here the lockfile does not change at all, and the gate that reads it certifies.
