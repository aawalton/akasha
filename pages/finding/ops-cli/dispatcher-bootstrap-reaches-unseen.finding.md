---
id: 4a0dca52-7fd9-5fd8-b722-b0a7a286c8e8
slug: dispatcher-bootstrap-reaches-unseen
page-type-slug: finding
title: "Dispatcher bootstrap reaches unseen"
domain-slug: domain/ops-cli
---

# Claim

The reach scanner the cross-repository unused-export check asks recognises only `codeModule` and `runCodeVerb`, so the `ops` dispatcher's own bootstrap is invisible to it. `tools/ops/code.ts` resolves seven package specifiers against the code root through a local `load()` and reads members off them by name. Every export reached that way reads as unreached, and the check names it for deletion.

# Evidence

`tools/lib/code-reaches.ts:9` — `const REACHERS = ["codeModule", "runCodeVerb"]`. The call-site regex at line 262 is built from that array, so a reach composed any other way is never collected.

`tools/ops/code.ts:16` declares its own `load(specifier)`, calling `Bun.resolveSync(specifier, codeRoot())` and importing the result; `member(mod, specifier, name)` at line 27 takes exports off it by name. The specifiers are `@shared/cli-core/{exit,help,prose-route,closed-consumer,provenance}`, `@shared/errors-core`, `@agents/shared/work-halt` and `@shared/cli/src/ops/emit-metric`.

Measured: `bun tools/ops/cli.ts instructions reaches --json` reports 978 reaches over 1500 files and names none of those specifiers. On #19011's merge tree the check accordingly listed `packages/shared/cli-core/src/help.ts` `HELP_FLAGS` and `VERSION_FLAG` as "not reached from any entry". Both are read at runtime on every `ops` invocation, so the deletion the check asks for breaks the CLI on deploy.

Not a new class. `packages/agents/shared/work-halt.ts:109` already carries an `ast-unused: keep` pragma naming this exact edge — "the dispatcher stands in the instructions repository, which names this module as a string resolved at runtime in `tools/ops/code.ts`". The hole has been papered over one symbol at a time by hand, each time somebody noticed. Two more pragmas were added on this merge for the same reason.

It is the fifth live break #19011's deletion would have shipped and the largest: the first four were four verbs, this one is the dispatcher every verb runs through.
