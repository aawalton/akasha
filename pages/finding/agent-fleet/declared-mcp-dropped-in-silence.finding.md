---
id: e07588bd-f6a8-512f-802b-5a3095a6776e
page-type-slug: finding
title: "Declared MCP dropped in silence"
domain-slug: domain/agent-fleet
---

# Claim

The supervisor's MCP config builder drops an agent profile's declared server name whenever the registry does not hold it, and emits nothing. Its own comment defers the diagnostic to the caller, and the only caller emits none, so an agent spawns without an MCP it declared and no log line, exit code or check reports the difference. Nothing else closes the gap: no check compares a profile's declared servers against the registry.

# Evidence

`packages/agents/supervisor/src/supervisor-args.ts:419-425` is the whole of it — the loop writes `mcpServers[name] = config` only when `registry[name]` is truthy, and the else arm is the comment `// Unknown server names are silently skipped — caller can log warnings`.

The caller is `resolveMcpConfig` at `packages/agents/supervisor/src/supervisor-mcp.ts`, which passes the registry to `computeMcpConfigContent` and then either returns null or writes the config to `/tmp/mcp-local-<sessionId>.json`. It logs on the `disabledMcpServers` reconcile and on every storage-state repair, and logs nothing about a dropped server.

The declared set is unconstrained: `packages/agents/shared/agent-profiles.ts:29` types it `mcpServers?: Record<string, McpServerAccess>`, so any string is a well-typed name. The registry it is checked against holds exactly two, `messages` and `playwright`, both `type: "stdio"` (`packages/agents/shared/mcp-registry.ts`, `buildLocalRegistry`).

No instrument covers it: `rg -ln "mcp" packages/infra/checks/` returns one path, `src/lib/cli-help-flag-references.ratchet.json`, a ratchet json matching the substring rather than a check over this pair.

Met while emptying `dirty/code/packages-agents-shared-docs-mcp-server-registry.md`, whose Gotchas section stated the silent skip. That document is under quarantine and has now been emptied of it, so the record would otherwise have gone with the sweep.
