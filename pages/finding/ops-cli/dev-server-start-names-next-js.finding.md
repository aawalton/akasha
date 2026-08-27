---
id: 4676efb9-0388-5e2d-af34-cfcdc48153a1
slug: dev-server-start-names-next-js
page-type-slug: finding
title: "Dev server start names next js"
domain-slug: domain/ops-cli
---

# Claim

`ops dev-server start` calls itself a Next.js dev server in its summary and its description, and no app in the registry it spawns from runs Next.js. Every one of the five carries the same React Router dev command.

# Evidence

Found 2026-08-13 by the seat moving the `dev-server` verb bodies into the instructions repository, reading `packages/agents/dev-server/cli/src/lib/dev-server-ops.ts` against the help block at `tools/commands/dev-server/start.ts`.

The summary reads "Spawn a Next.js dev server, detach it, and write a state file", and the description opens "Spawn a Next.js dev server for one app inside the project worktree". Both are what a listing and a `--help` show.

In `APP_REGISTRY`, all five apps declare the same `devCommand`: `["bunx", "react-router", "dev", "--port", "<PORT>"]`. None spawns `next`. The field's own comment in that file says the default "Defaults to Next.js's invocation; apps on other frameworks (Vite + React Router v7, etc.) override" — so the framework name looks like a description of a default that every entry has since overridden, left standing in the help after the registry moved.

The word survives elsewhere in the namespace where it is still accurate: `bootstrap` writes `NEXT_PUBLIC_*` keys and reasons about Next.js's dotenv loader, and those are real key names rather than a claim about what is spawned.

What makes it worth filing rather than fixing in place: the help blocks under `tools/commands/dev-server/` were landed byte-identical to what the code repository declared, and the body move was required to leave the declared surface untouched so a repair could not be mistaken for the move. The summary is also the `// command:` marker line, which the command list is derived from, so changing it changes what `ops` prints for the verb.
