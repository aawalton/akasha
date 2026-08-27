---
id: eaacfbf8-1132-5b12-a736-b091deea8e87
slug: session-is-a-second-name-for-agent
page-type-slug: finding
title: "Session is a second name for agent"
domain-slug: page-type/agent
---

# Claim

Both repositories run `session` as a concept beside `agent`, and the two name one thing: every agent has a transcript of its own, so there is no session that is not an agent and no agent without one.

# Evidence

`domains/agent.md` reads "a model that does work, with tools of its own". Nothing in the corpus defines a session.

Measured on 2026-08-05 over `~/.claude/projects`: 51 transcripts written in the preceding two hours sit one directory below a parent's, against 22 at the parent level. A subagent's transcript sits a directory below its parent's, so a one-level glob misses most of the corpus.

The second spelling is load-bearing in code. `packages/agents/shared/db-mappers.ts:59,141` carries a `session_kind` column beside `mode`, written once at mint by `db-agent-create.ts:101`, while `shared/agent-mode.ts:10-27` insists neither is a copy of the other. `packages/agents/shared/db-agent-create.ts` also carries `sessionId` and `sessionObjectCompressed`.

`domains/agent-mode.md` was renamed from `seat-mode` on this reading: mode is a property of the agent, which is why a subagent has one without stating anything.
