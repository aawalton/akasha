---
id: 3f7c1e42-8b05-4d19-9a6e-2c4f8b17d930
slug: refusals-bound-cannot-name-a-dispatched-slug
page-type-slug: finding
title: "Refusals bound cannot name a dispatched slug"
domain-slug: domain/change-harness
---

# Claim

`refusals-bound` reads which document a call prints out of the text at the call, so two shapes legitimately name no literal, and only one is a dispatch.

Four hooks pass a module const that also names the hook in a second message; writing it out would leave that string twice with one copy guarded, so the audit follows a module literal binding as of `937b000c`.

`agent-hook-block-destructive-git...ts:176` builds its slug over ten verbs, so no literal stands to follow, and it stays refused.

# Evidence

Read 2026-08-28. `refusalFor` at `agent-hook-block-destructive-git.agent-hook.code.attachment.ts:117` returns a slug built as `${HOOK_NAME}-${subcmd}` over the seven verbs of `BLOCKED_VERBS` plus `amend`, `force-push` and `branch-delete`. Those ten are exactly the ten `block-destructive-git-*` documents the audit reports as printed by nothing, so the dispatch is real and the pairing is sound. A literal there means unrolling the loop.

The four hooks are `agent-hook-block-addon-direct-install...ts:50`, `agent-hook-block-root-filesystem-scan...ts:102`, `block-whole-suite-run.ts:46` and `agent-hook-block-playwright-stray-filename...ts:21`. Each also hands `HOOK_NAME` to `toolInputText`, which uses it at `tools/lib/hook-command.ts:17-27` to name the hook in a diagnostic on the path where it exits 5 having checked nothing. So writing the literal at the call would break Ubiquitous Naming rather than keep it: one spelling guarded by the audit, one not.

`export-declared-here.check.code.attachment.ts:55` and `:62` passed `SLUG` for nothing but printing, so that one was written out at `21b1414e` rather than followed.

At `937b000c` the audit reports 157 documents against 52 instruments, with one message naming a call whose slug cannot be read and 19 naming an unprinted document. Ten of those 19 are the dispatch above. The remaining nine are named by no quoted string anywhere in tracked TypeScript, so they are orphans of a different kind.

That last count was checked against a case that had to hit before it was believed: the same query over `export-not-declared-here` and `block-whole-suite-run` names their files, and over an invented slug names none.
