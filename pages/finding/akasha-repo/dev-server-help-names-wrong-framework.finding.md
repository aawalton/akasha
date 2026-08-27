---
id: e7e495ea-abb5-57cd-8ade-1fc32674c518
page-type-slug: finding
title: "Dev server help names wrong framework"
domain-slug: repo/akasha-repo
---

# Claim

`bun ops dev-server start`'s user-facing help says "Spawn a Next.js dev server", and no app it can spawn is a Next.js app. All five entries in `APP_REGISTRY` run `bunx react-router dev`. The type's docblock carries the same error, calling Next.js the default where `devCommand` is required and has none. The registry is the surface agents are told to trust over documentation, so a wrong line here outranks the docs it overrides.

# Evidence

Read against `~/code` at `main`, commit `383bf60d35`, on 2026-08-07, while ingesting `dirty/docs/ops-namespaces.md` — whose `dev-server` entry calls the surface "per-app local Vite + React Router v7 dev-server lifecycle" and is correct where the CLI is not.

`packages/agents/dev-server/cli/src/lib/dev-server-ops.ts` declares `readonly devCommand: readonly string[]` as a required field of `DevServerApp` — no default value exists anywhere for it. `APP_REGISTRY` holds five apps (`alanwalton`, `audhdalan`, and three more), and every one sets:

    devCommand: ["bunx", "react-router", "dev", "--port", "<PORT>"]

Counted in that file: 5 occurrences of the `react-router` invocation, 0 of any `next` invocation.

The two wrong statements:

- `packages/agents/dev-server/cli/src/dev-server/registry.ts:26` — `summary: "Spawn a Next.js dev server, detach it, and write a state file"`. This is what `bun ops dev-server --help` prints.
- `packages/agents/dev-server/cli/src/dev-server/start.ts:22` — "Spawn a Next.js dev server for one app inside the project worktree…". This is what `bun ops dev-server start --help` prints.

The docblock at `dev-server-ops.ts:46` is the third: "Defaults to Next.js's invocation; apps on other frameworks (Vite + React Router v7, etc.) override." Nothing defaults; the field is required and every app overrides a default that is not there.

The code elsewhere knows better. `start.ts:128` comments that `vite.config.ts` calls `supabaseClientEnvDefine()`, and `start.ts:156` reasons about "Apps on different frameworks (Next.js vs Vite + RR v7…)" — so the Next.js path is a possibility the code is written to allow rather than one any registered app takes.

Nothing measures this: a help string is prose, so the typecheck is green and every check passes.
