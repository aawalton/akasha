---
id: a1ade8f3-9814-564a-bfdf-01e18fa468e4
slug: stamp-last-messaged-waits-forever-on-open-stdin
page-type-slug: finding
title: "Stamp last messaged waits forever on open stdin"
domain-slug: domain/ops-cli
---

# Claim

`ops persona stamp-last-messaged` waits forever when its stdin is neither a terminal nor closed and no `--prompt` is given.

# Evidence

The verb resolves its gate prompt by reading `Bun.stdin.text()` whenever `process.stdin.isTTY` is false and `--prompt` was not passed. A pipe that is open but never written, and a stdin inherited from a non-terminal parent that nobody closes, both satisfy that condition, and the read never returns.

Observed directly: invoking the verb from an agent's shell tool, whose stdin is a pipe rather than a terminal, consumed a thirty-minute timeout and produced nothing. Redirecting `< /dev/null` closes stdin and the verb completes at once.

The behaviour is the code repository's and predates the body's move into this repository; the moved body reproduces it exactly. It matters because the verb's stated caller is the `UserPromptSubmit` hook, and the two conditions that trigger it — a non-terminal stdin, and a parent that does not close it — are the ordinary shape of a hook invocation rather than an unusual one.
