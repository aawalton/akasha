---
id: 012a125a-feb2-5b85-accb-accd30a8a0d7
slug: rc-socket-comments-claim-interactive-only
page-type-slug: finding
title: "Rc socket comments claim interactive only"
domain-slug: domain/agent-fleet
---

# Claim

Three comments in the supervisor's env builder say the remote-control unix socket is scoped to interactive sessions, where the decider that drives the gate enables it for headless personas too.

# Evidence

Read at `~/code` on 2026-08-07 at `383bf60d`, while emptying a quarantined question document that raised a two-comment version of it. That document is queued for removal.

`supervisor/src/supervisor-remote-control-default.ts:3-4` states the rule: "Remote Control is enabled at startup for the UNION of two cases: an interactive session, OR a headless persona" (#14638, restored #15120). It is explicit about what a headless persona receives — `:42-44`: "A headless persona thus receives BOTH the `remoteControlAtStartup: true` key and the RC env block, so it actually registers", the RC env block being named at `:41-42` as "the `ANTHROPIC_UNIX_SOCKET` + scopes that reopen the post-2.1.198 `fdr` gate".

`supervisor-env.ts` says otherwise in three places, each within reach of the gate it describes:

- `:53-54`, on the `remoteControl` field: "gated to interactive sessions — `undefined` for headless workers".
- `:109-110`: "`ANTHROPIC_UNIX_SOCKET` via the `remoteControl` block (interactive sessions only — headless must never carry it)".
- `:323-324`, four lines above the gate itself: "`ANTHROPIC_UNIX_SOCKET` reroutes ALL forAnthropicAPI traffic (inference + RC channel) through the socket, so it is scoped to interactive sessions."

The gate is `opts.remoteControl != null` at `:325`, and nothing there consults a session kind — the union decides upstream. So the second and third are false outright, and the first is false for a headless persona while true for a headless worker.

Two things make this hard to see. The `#15104` regression the union was restored to fix was exactly this belief acted on, and it removed personas from the app until `#15120` reversed it, so the comments preserve the reasoning of a reverted change. And both surfaces that stated it correctly in prose — `packages/agents/oauth-proxy/CLAUDE.md` and `packages/agents/supervisor/docs/launch-surface.md` — are no longer in the code repo, so the correct account now survives only in the sibling decider's own docblock.
