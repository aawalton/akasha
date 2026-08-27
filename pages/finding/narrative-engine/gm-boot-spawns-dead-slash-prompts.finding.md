---
id: 63c37aa9-f452-5ccb-b4ec-1d8ca2d01b50
slug: gm-boot-spawns-dead-slash-prompts
page-type-slug: finding
title: "Gm boot spawns dead slash prompts"
domain-slug: domain/narrative-engine
---

# Claim

The GM's live boot prose instructs four `ops seat start` calls whose `--prompt` is a slash command, and none of the four resolves since skills were retired at #17353. A GM following its own boot text creates resident seats that receive the literal string `/awen-loremaster <base>` as their first prompt and hold no procedure at all. The spawn succeeds, the seat idles, and nothing reports that it was never told what it is for.

# Evidence

Measured 2026-08-07 from `/home/walton/code` while emptying `dirty/skills/awen-loremaster/SKILL.md`.

`rg -o "prompt '/[a-z-]+"` over `packages/alanwalton/awen/core/src/gm-boot-sections.ts` returns exactly four, one each: `/awen-editor` (:286), `/awen-loremaster` (:288), `/awen-loremaker` (:294) and `/awen-turn-gate`. The same pattern over the whole repo, `-g '*.ts'` excluding `node_modules`, returns 4 lines in 1 file — this is the entire population, and it is bounded.

The editor line is worse than one seat: it instructs a spawn per lens, "for <lens> in facts · diction · patterns-reaction · patterns-telling · patterns-boundary · patterns-gestalt", so six seats from that line alone.

Nothing resolves any of the four. `ls ~/.claude/skills/` and `ls ~/.claude/commands/` both exit 2, "No such file or directory". `ops enforcement list` reports 231 mechanisms across 4 sources and names no skills loader. `packages/agents/cli/src/agent/skill-token-guard.ts:91` states it from inside the code repo: "The estate's skills were retired from the loading path (#17353), so no estate slug resolves".

`gm-boot-sections.ts` is not dead text. `gm-boot-compile.ts` imports it, and the sections are compiled into what `ops awen gm-load` serves a GM at boot.

This is a different animal from `pages/finding/alanwalton-app/persona-reward-slash-names-unresolvable.finding.md`, which records 61 citations of `/persona-reward` and `/persona-wallpaper` in docblocks and `ops` help. Those tell a reader a flow exists. These four are inside an INSTRUCTION TO ACT, so following the text produces running seats rather than a dead link, and the resulting seat is indistinguishable from a working one at `ops seat list`.

Not measured: whether any GM has run these lines recently. `ops seat list` names 64 seats today and `rg -i "awen|loremaster|loremaker|editor"` over it returns none, so the fleet is not up as I write.
