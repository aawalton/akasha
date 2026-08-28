---
id: 50188e09-dc86-5d5c-904e-3c7924e30cb2
slug: script-names-unregistered
page-type-slug: finding
title: "Script names unregistered"
domain-slug: domain/temper
---

# Claim

38 script names instructed across the temper repo's tracked text are not registered in any package.json, including six named as "package.json aliases" in `packages/temper/web/.claude/skills/tech-scripts/SKILL.md:32-40` and seven named as `regeneratorCommand` values in `packages/infra/checks/src/lib/temper-catalog-fresh.ts:60-114`, so following either document's instructions resolves nowhere.

# Evidence

From project #16017 (domain `temper`, status `someday_maybe`, captured 2026-07-25, never given an objective). Surfaced by the worker on #16011 (registering `generate-addon-data`), asked whether that was one script or one instance of a class. It is a class.

Inventory from every non-node_modules package.json (479 files, 357 with a `scripts` block): 44 unique script names repo-wide; 34 are real bin invocations (`bun ops`, `bun test`, `bun x`, `bun run <path>.ts`), excluded via `bin` fields. 38 instructed-but-unregistered names remain, heaviest being generate-lore-library-data, generate-metrics, generate-antiquity-data, generate-tribute-data, generate-companion-metrics, plus ~33 more at 1-4 files each.

Worst instance: `packages/temper/web/.claude/skills/tech-scripts/SKILL.md:32-40`, under "# Via package.json aliases (where defined)", lists six commands. After #16011 registered `generate-addon-data`, exactly one of six resolves; the file appears stale wholesale.

Second emitter: `packages/infra/checks/src/lib/temper-catalog-fresh.ts:60-114` holds 10 `regeneratorCommand` string literals stamped into check-failure messages; 7 of 10 name unregistered scripts. A CI check tells you to run a command that does not resolve.

Why #16011 did not fix this: registering an unverified entry point risks "a registered script that fails differently is not an improvement" (#16011's own brief). #16011 verified one entry point end to end; the other 38 each need the same treatment, several requiring a `--file /path/to/TemperCatalog.lua` argument. `db:migrate` has no corresponding `.script.ts`, unverified.

Durable prevention recorded, not built: a repo-wide check that every `bun <name>`/`bun run <name>` instruction in tracked text resolves to a registered script or a real bin. It cannot land until the 38 are fixed, since it would fail on all of them immediately: fix-the-class, then add the check. Nearest existing pattern: `packages/infra/checks/src/checks/check-start-script.ts`.
