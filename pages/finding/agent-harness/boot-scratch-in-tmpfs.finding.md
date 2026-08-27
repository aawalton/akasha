---
id: 87b236e0-b7fe-570c-9627-5b5e5dd48f5a
page-type-slug: finding
title: "Boot scratch in tmpfs"
domain-slug: domain/agent-harness
---

# Claim

Three writers on the seat boot path place scratch under `/tmp` rather than `/var/tmp`, against Scratch Location. Two default to `/tmp` while accepting an override no boot-path caller supplies; the third composes its path with no override to pass. A boot prompt and an MCP config are each read by the live seat they were written for, so both are held for that seat's lifetime rather than dropped at the end of a command.

# Evidence

The three call sites were read directly on the tree at the time of filing. `tools/lib/supervisor-boot-prompt.ts:28` and `tools/lib/supervisor-spawn-settings.ts:102` each spell `${opts?.tmpDir ?? "/tmp"}`, so an override exists but the default is wrong. `tools/lib/supervisor-mcp.ts:210` spells `/tmp/mcp-local-${sessionId}.json` with no override in the signature at all.

Standing on this workstation when counted: 21 `agent-boot-prompt-*.md` totalling 1.1M, 2 `agent-settings-*.json`, and 86 `mcp-local-*.json`. `df` confirms `/tmp` is tmpfs here, which is the condition Scratch Location gives as its reason.

What was not measured: whether anything removes these files, and on what schedule. The counts are one reading, and nothing was watched over time, so they say nothing about whether the set grows without bound or is swept. No caller of `materializeBootPrompt` or `materializeSpawnSettings` away from the boot path was surveyed, so a caller elsewhere may pass `tmpDir` correctly. No cost was weighed and no reader was observed to have been harmed by the placement.

The claim is about placement against a stated rule, not about exhaustion.
