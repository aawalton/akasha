---
id: 0751154a-6e8d-5ca8-b061-437607e1f6ce
slug: unused-detector-blind-to-src
page-type-slug: finding
title: "Unused detector blind to src"
domain-slug: domain/instrument
---

# Claim

The code repository's unused-code detector can never report a file under `src/` unused. `ast-unused.config.json` declares 174 workspaces and every one of them lists `src/**/*.ts` among its entry points, so every file under `src/` is an entry point by declaration and unreachable code there comes back clean rather than coming back at all.

# Evidence

Read `~/code/ast-unused.config.json` on 2026-08-07. It carries four top-level keys: `ignoreWorkspaces`, empty; `outOfScope`, 3 entries; `pendingCuration`, 202 entries; and `workspaces`, 174 entries. Every workspace entry carries the same shape, `{"entry": ["src/**/*.ts", "**/*.test.ts"], "project": ["**/*.ts"]}`. I read `packages/agents/instructions`, `packages/agents/cli` and `packages/agents/dev-server/cli` out individually and all three match it exactly.

Found while ingesting `dirty/rulings/agent-harness/instructions-tooling-is-removed-not-migrated.md`, which asserted this same configuration as of 2026-08-04 and named it the reason that 12 files and 1,631 lines of unreachable code stayed compiling and tested in `packages/agents/instructions/src/lib/`. That directory holds 8 files today, so those particular files went. The configuration that kept them invisible did not, and it was the only claim in that ruling still true when I ran it.

I have not measured how much unreachable code stands under `src/` now, only that this instrument cannot be the thing that finds it.
