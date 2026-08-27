---
id: a1ade8f3-9814-564a-bfdf-01e18fa468e4
slug: stamp-last-messaged-waits-forever-on-open-stdin
page-type-slug: finding
title: "Stamp last messaged waits forever on open stdin"
domain-slug: domain/ops-cli
---

# Claim

The body that was `ops persona stamp-last-messaged`, now `tools/lib/persona-last-messaged.ts` run as a program, waits forever when its stdin is neither a terminal nor closed and no `--prompt` is given.

# Evidence

The body resolves its gate prompt by reading `Bun.stdin.text()` whenever `process.stdin.isTTY` is false and `--prompt` was not passed — `tools/lib/persona-last-messaged.ts:67`. A pipe that is open but never written, and a stdin inherited from a non-terminal parent that nobody closes, both satisfy that condition, and the read never returns.

Observed directly: invoking the verb from an agent's shell tool, whose stdin is a pipe rather than a terminal, consumed a thirty-minute timeout and produced nothing. Redirecting `< /dev/null` closes stdin and the verb completes at once.

The behaviour is the code repository's and predates the body's move into this repository; the moved body reproduces it exactly. It matters because its stated caller is the `UserPromptSubmit` hook `tools/hooks/agent-hook-persona-last-messaged-hook.agent-hook.code.attachment.ts`, registered at `settings/agents.json:249-253`, and the two conditions that trigger it — a non-terminal stdin, and a parent that does not close it — are the ordinary shape of a hook invocation rather than an unusual one.
