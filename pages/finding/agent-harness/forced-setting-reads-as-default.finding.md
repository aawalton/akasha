---
id: cd1107d3-556c-51e2-a4d2-6564e9fbe994
slug: forced-setting-reads-as-default
page-type-slug: finding
title: "Forced setting reads as default"
domain-slug: domain/agent-harness
---

# Claim

Every fleet session's tool-schema deferral rests on one JSON key, `ENABLE_TOOL_SEARCH`, that reads as a redundant default and is not one — and no live document says so, the file holding it can carry no comment, and no gate refuses its removal. Deleting it would leave every MCP tool schema loading eagerly into every session's startup context, silently and with nothing reporting the change.

# Evidence

The key stands at `settings/agents.json:5` in akasha, `"ENABLE_TOOL_SEARCH": "true"` inside `env`, one of three keys there beside `BASH_ENV` and `DISABLE_AUTOUPDATER`. JSON carries no comment, so the file cannot state why.

That it is not a redundant default is settled by the Claude Code binary's own changelog rather than by any document here. `~/.claude/cache/changelog.md:2550`, version 2.1.72: "Fixed tool search to activate even with `ANTHROPIC_BASE_URL` as long as `ENABLE_TOOL_SEARCH` is set." A later entry at `:1477` adds that tool search is disabled by default on Vertex AI, opt in with the same variable. Every fleet session carries a base URL — `monarch/seat.ts:96` in this repository states that an interactive session carries its own proxy routing in `ANTHROPIC_BASE_URL`.

Nothing live states it. `rg -uuu -n "ENABLE_TOOL_SEARCH"` over `~/instructions` returns the key itself, one quarantined document under `dirty/`, and git log entries; over `~/code` it exits 1.

No mechanism protects it. `ops enforcement list` reports 232 mechanisms across 4 sources; the only entries naming `settings/agents.json` are the eighteen hooks and the statusline that file registers, and none reads its `env` block.

No domain is nearer than the harness. `ops instructions governs --file-path settings/agents.json` returns `domains/agent-harness.md`, `domains/folders/instructions-repo.md` and `domains/global.md` — three catch-alls every agent reads at boot, which is why the reason was cut rather than written as a rule.

Met while emptying `dirty/code/packages-agents-shared-docs-mcp-server-registry.md`, which stated the reason and has now been emptied of it. That document was queued for removal, so the record would otherwise have gone with the sweep.
