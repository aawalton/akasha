---
id: d88323c3-4d19-5bfd-bb8b-e4aee1ba4ed5
slug: guard-name-narrower-than-cover
page-type-slug: finding
title: "Guard name narrower than cover"
domain-slug: domain/agent-harness
---

# Claim

The two guards over the instructions root now also cover the memory root, and both are still named `block-instructions-direct-write.sh` and `block-instructions-direct-commit.sh`.

# Evidence

Widened on #17597. Each resolves `${INSTRUCTIONS_ROOT:-$HOME/instructions}` and `${MEMORY_ROOT:-$HOME/memory}` and refuses inside either, naming the matched root in its refusal — so the behaviour is two roots and the file name says one.

Renaming was considered and declined for a reason that is itself the finding: the script path is named by `~/instructions/settings/agents.json`, `~/.claude/settings.json`, `~/code/.claude/settings.json`, and by every generated `--settings` payload a live seat is already holding. A hook whose script is absent exits 127, which the client treats as a non-blocking error, so the tool call proceeds. A rename therefore opens a window in which writes into both roots are unguarded for every seat still carrying an old payload, and nothing reports it.

What would close it is a rename that does not depend on every holder of a path re-reading it at once — a stable path, or a settings composition that is re-read per call.
