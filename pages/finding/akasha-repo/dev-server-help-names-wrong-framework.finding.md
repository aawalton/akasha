---
id: e7e495ea-abb5-57cd-8ade-1fc32674c518
slug: dev-server-help-names-wrong-framework
page-type-slug: finding
title: "Dev server help names wrong framework"
domain-slug: repo/akasha-repo
---

# Claim

`ops dev-server start`'s user-facing help says "Spawn a Next.js dev server", and no app it can spawn is a Next.js app. Every entry in `APP_REGISTRY` runs `bunx react-router dev`. The registry is the surface agents are told to trust over documentation, so a wrong line here outranks the docs it overrides.

# Evidence

`tools/lib/dev-server-ops.ts:37` declares `readonly devCommand: readonly string[]` as a required field of `DevServerApp` — no default value exists anywhere for it. Every app in `APP_REGISTRY` sets:

    devCommand: ["bunx", "react-router", "dev", "--port", "<PORT>"]

That file carries no `next` invocation at all, in any spelling.

The wrong statement is `tools/commands/dev-server/start.ts:1`:

    export const summary = "Spawn a Next.js dev server, detach it, and write a state file"

That is the summary `ops` prints for the verb, and it is the only line under `tools/commands/dev-server/` naming Next.js.

Nothing measures this: a help string is prose, so the typecheck is green and every check passes.
