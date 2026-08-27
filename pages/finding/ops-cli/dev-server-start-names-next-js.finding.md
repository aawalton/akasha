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

Found 2026-08-13 by the seat moving the `dev-server` verb bodies into akasha, reading `tools/lib/dev-server-ops.ts` against the help for `dev-server start`. The two halves of that help now stand apart: the summary at `tools/commands/dev-server/start.ts:1`, the description in the `# Help` section of `pages/old-ops-command/ops-dev-server-start.old-ops-command.md:19`.

The summary reads "Spawn a Next.js dev server, detach it, and write a state file", and the description opens "Spawn a Next.js dev server for one app inside the branch's worktree". Both are what a listing and a `--help` show; `ops dev-server --help` prints the first and `ops dev-server start --help` prints both.

In `APP_REGISTRY` at `tools/lib/dev-server-ops.ts:40-77`, all five apps declare the same `devCommand`: `["bunx", "react-router", "dev", "--port", "<PORT>"]`. None spawns `next`. The `devCommand` field on `DevServerApp` at line 36 carries no comment any more — the note that once called Next.js the default, overridden by apps on other frameworks, is gone from the tree, so the framework name now stands in the help with nothing behind it at all.

The word survives elsewhere in the namespace where it is still accurate: `bootstrap` writes `NEXT_PUBLIC_*` keys and reasons about Next.js's dotenv loader, and those are real key names rather than a claim about what is spawned.

What makes it worth filing rather than fixing in place: the help blocks under `tools/commands/dev-server/` were landed byte-identical to what the code repository declared, and the body move was required to leave the declared surface untouched so a repair could not be mistaken for the move. The summary is also the `export const summary` line at `tools/commands/dev-server/start.ts:1`, which the command list is derived from, so changing it changes what `ops dev-server --help` prints for the verb.
