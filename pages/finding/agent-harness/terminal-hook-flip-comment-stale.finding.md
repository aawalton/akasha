---
id: 61e0cf25-8e92-5604-8050-faae79ba929b
slug: terminal-hook-flip-comment-stale
page-type-slug: finding
title: "Terminal hook flip comment stale"
domain-slug: domain/agent-harness
---

# Claim

A live comment in `voice/run.ts` states that the terminal `UserPromptSubmit` hook does not flip Alan's wallpaper, and it does. The hook has passed `--follow` since the launch-gate removal, so the comment is stale in the direction that reads as corroboration: a seat cross-checking a document against this comment gets agreement, and both are wrong about the same thing.

# Evidence

Read 2026-08-08 against `~/code` at `f835592986`, while ingesting `dirty/code/packages-alanwalton-personas-docs-last-messaged.md`.

`packages/alanwalton/voice/cli/src/voice/run.ts:275-277` reads: "Voice is one of the two Alan-authenticated feeds the desktop follow rides (#14652) — the terminal hook does not flip because it cannot authenticate a real keystroke."

The terminal hook flips. Its executable line is in the instructions repo rather than the code repo, at `tools/hooks/persona-last-messaged-hook.sh`, wired from `settings/agents.json:170`: `nohup bun ops persona stamp-last-messaged --follow --agent-id "$AGENT_ID"`. `--follow` is what selects `stampAndFollowByAgentId` over the stamp-only entry, per that verb's `--help`.

Two live carriers say three feeds flip, not two. `stampAndFollowByAgentId`'s header at `packages/alanwalton/personas/cli/src/persona/last-messaged.ts:140-147` calls it "the entry for every 'Alan reached out' feed that flips: the terminal hook (via the `stamp-last-messaged` verb's `--follow` flag), voice, and unnamed-sender `agent send`." The hook script's header states the change and why: the launch gate is "DELIBERATELY GONE (#15495)" because gating it out "froze `lastMessagedAt` for 4 days", and machine-authored prompts are now excluded by the content classifier `isAlanAuthoredPrompt` — which is the keystroke authentication the comment calls impossible.

The comment's premise was true before that classifier existed, and is why the old gate was blunt. Authentication moved from the session's launch flag to the prompt's content and the comment did not move with it. A reader of the voice package meets the stale carrier and never the live one, which is a shell script in another repository.

Not measured: whether other comments in the same package rest on the same superseded premise. Only `voice/run.ts` was read.
