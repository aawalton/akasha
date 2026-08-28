---
id: 71840285-1ca6-5ed9-8c74-9d5c1e0aa4cd
page-type-slug: finding
slug: package-move-still-rewrites-claude-md-paths
title: "Package move still rewrites CLAUDE.md paths"
domain-slug: repo/akasha-repo
---

# Claim

`ops package move` still carries path-rewriting machinery for `CLAUDE.md`, a document this repository tracks one of.

# Evidence

Measured 2026-08-28 at `c4664f128a`. `infra/workspace-cli/src/lib/package-move/docs-rewrites.ts:16` tests `path.endsWith("/CLAUDE.md") || path === "CLAUDE.md"`, and its comment at :20 reads "Every CLAUDE.md is taken separately by listTargetDocs, wherever it sits". `git ls-tree -r --name-only c4664f128a` matching `CLAUDE.md` returns one path, `infra/eso-rig/CLAUDE.md`.
