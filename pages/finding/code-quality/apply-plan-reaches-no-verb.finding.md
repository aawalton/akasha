---
id: f38a85a6-58e7-5aaa-aa76-6c78d8fbbd99
slug: apply-plan-reaches-no-verb
page-type-slug: finding
title: "Apply plan reaches no verb"
domain-slug: domain/code-quality
---

# Claim

`apply-plan.ts` and `replicate.ts` in `@agents/instructions` are reachable only from their own tests, so the estate carries a second write-and-replicate path that no verb runs. `REPLICATION_PUSH_COMMAND` there hardcodes `git -C ~/instructions push origin HEAD` and reaches nobody who could act on it.

# Evidence

Traced 2026-08-03 under #17596, whose replication criterion named `packages/agents/instructions/src/lib/replicate.ts:33` as the site to widen. It is not a site anything runs.

`replicate.ts` is imported by `apply-plan.ts:44` and by `replicate.unit.test.ts:19`, and by nothing else. `apply-plan.ts` is imported by `apply-plan.cli.test.ts:13`, and by nothing else. Neither path appears in the package's `exports` map, so no other workspace can reach either even by specifier.

The live write path does not run through them. `packages/agents/instructions/src/instructions/registry.ts` maps every `ops instructions` verb to a five-line module calling `doorCommand(name)`, which shells out to `<root>/tools/<name>.ts`. The implementation is `~/instructions/tools/`, whose own replication is `pushBranch(root)` in `tools/lib/git.ts:133`, called at `tools/lib/verb.ts:198`. That one takes the root as an argument and hardcodes no path.

So the constant is doubly inert: nothing invokes the function that prints it, and the message it carries — push this branch yourself — would be advice from a code path no author reaches.

It sits beside the dead second findings implementation already recorded on the project map at `~/memory-repo-map.md` section 5 and dispatched as #17599, but it is not the same set of files: that row names `findings-*.ts`, `gate.ts`, `classify.ts` and the `gate-*.ts` modules, and names neither of these two. Whoever takes #17599 should measure the lib directory whole rather than delete the named list, or this pair survives the sweep that was supposed to catch it.
