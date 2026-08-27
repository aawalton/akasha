---
id: a564d375-af5c-5af6-aaf5-190db947562a
slug: persona-reward-slash-names-unresolvable
page-type-slug: finding
title: "Persona reward slash names unresolvable"
domain-slug: domain/alanwalton-app
---

# Claim

Live code cites `/persona-reward` and `/persona-wallpaper` as loadable skills on about 61 lines, and neither name resolves anywhere — skills are retired estate-wide and these two never had a surface even when the tree existed. Six of the citations are `ops persona` command descriptions, so they print in `ops --help` to every agent that runs it.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/agent-harness/findings/instruction-text-and-citations.md`, which recorded the dangling names on 2026-07-29 against surfaces that have since gone.

Nothing resolves. `~/instructions/skills/` does not exist; `~/.claude/skills` and `~/.claude/commands` both fail `ls` with "No such file or directory". The estate replaced skills with task documents under `domains/tasks/`, and no task carries either name.

The population. `rg -n "/persona-reward|/persona-wallpaper"` across `~/code`, excluding `node_modules`, `dist` and `bun.lock`, returns 65 lines; four are the `persona-reward-watcher` package path rather than a command, leaving about 61 citations. Most are docblocks in `packages/alanwalton/personas/core/src/` and `cli/src/persona/` describing a step as one "the `/persona-reward` loop calls" or "the `/persona-wallpaper` flow calls after approval".

The carrier that matters is `packages/alanwalton/personas/cli/src/persona/registry.ts`, which holds six of them inside `ops` command descriptions — :76, :112, :130, :136, :172, :178. Those strings are printed by `ops --help`, so an agent reading the verb list is told a flow exists that it cannot load. A docblock reaches whoever opens the file; this reaches whoever runs the command.

What is not claimed. The reward watcher does not emit these names: `notificationContent` in `persona-reward-watcher/src/decide.ts` returns only a wallpaper due-reminder and a doc-reading instruction, and the `NotificationSkill` union is a pure discriminator read at two sites. A 2026-07-30 entry in the same source established that by reading the producer, and I re-ran it.

The repair is not a shape sweep. Both names are `persona-`-prefixed but neither is a persona, so a rename of `persona-<x>` to `<x>` rewrites them to `/reward` and `/wallpaper`, which name nothing either — turning a findable dangling citation into an unfindable one.
