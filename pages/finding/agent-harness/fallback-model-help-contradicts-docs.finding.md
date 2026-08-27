---
id: 11ae8b95-3a2e-582f-96b5-232c912d232c
page-type-slug: finding
title: "Fallback model help contradicts the docs"
domain-slug: domain/agent-harness
---

# Claim

The installed `claude --help` says `--fallback-model` "only works with --print", and the published documentation says it works in an interactive session. One of the two is wrong, and a reader who trusts the local help will conclude the flag cannot be used for a seat.

# Evidence

Measured 2026-08-18 while wiring `seat-conditions-fallback-model` into the seat launch.

`claude --help` on this workstation prints:

    --fallback-model <model>   Enable automatic fallback to specified model(s) when the
                               default model is overloaded or not available. Accepts a
                               comma-separated list to try each in order. Re-tries the
                               primary at the start of each user turn. (only works with --print)

No seat launch passes `--print`. `buildInteractiveCLIArgs` builds the argv for every seat of either mode, and the only `-p` in the tree is `supervisor-adopt-compact-self.ts`, which is a one-shot rather than a seat. So on the help's reading the flag is inert for every seat.

Against that, `code.claude.com/docs/en/model-config.md` shows `claude --fallback-model sonnet,haiku` with no `--print`, and says the switch "lasts for the current turn only, so your next message tries the primary model first again" — language that only means anything interactively. `code.claude.com/docs/en/cli-reference.md` marks `--max-turns`, `--json-schema` and `--init` as print-mode only, and marks `--fallback-model` with no such qualifier.

The same documentation names a second route, `fallbackModel` in settings as an array, with the flag taking precedence over it.

The flag was wired at commit `124eea40` on the reading that the docs are current and the help text is stale.

Not measured: which of the two is actually right, because confirming it takes an overloaded model in a live interactive seat. Not measured: whether the `fallbackModel` setting works where the flag does not, which would be the safer route if the help turns out to be current.
