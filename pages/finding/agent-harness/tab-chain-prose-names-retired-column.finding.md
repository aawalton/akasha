---
id: eebf3f12-4533-5bfc-a7b3-bcc5afbfdc83
slug: tab-chain-prose-names-retired-column
page-type-slug: finding
title: "Tab chain prose names retired column"
domain-slug: domain/agent-harness
---

# Claim

Every code path in the terminal-tab chain reads an agent's `name`, while the prose and the symbol
names over it still assert `title`. The stale surfaces are what a reader reaches first, and the
divergence has already cost a project row, its dispatch and a definition pass.

# Evidence

`52ade4be99` (2026-08-02, `#17438`) moved both writers of
`~/.cache/agent-terminal-name/<supervisorPid>.json` onto the row's `name`. Verified on disk: the
live state files carry `{"pid":1225982,"name":"athena"}`, `…"name":"ryn"`, `…"name":"vera"`.
`tools/hooks/rc-session-title-hook.sh:31,36` in the instructions repo reads the same file's
`.name` for the Remote Control session title. It stood at `packages/infra/scripts/` when this was
filed; the code repo tracks no such path now.

The commit did not touch the prose. `supervisor-interactive.ts:327-332` still reads:

> "Mirror the agent row's `title` to the host terminal's tab title … the title can change many
> times per session — `bun ops seat set-name`, a project claim, or any seq-scoped
> `bun ops project` verb re-stamping it"

The claim-re-stamps-it half is false of the current code. Three further surfaces assert the same:
`supervisor-tab-name.ts:1-4`, `agent-tab-name.ts:4`, and
`vscode-extension/docs/feature-terminal-rename.md:7`.

The symbols agree with the stale prose rather than the code: `subscribeToAgentTabTitle`,
`fetchAgentTitle`, and the module `supabase-realtime-agent-title.ts` — 16 non-`dist` files carry
title-named symbols over a name-reading path. The one surface that is correct,
`supabase-realtime-agent-title.ts:12-18`, is the one a reader reaches last, behind three that told
them not to bother.

The cost is measured rather than argued. `#17562` was cut on the premise that the tab and the
addressable name could diverge, dispatched, and closed `duplicate` by a definition pass whose whole
finding was that the premise had been false since 2026-08-02. The pass read the prose the code had
outgrown, which is the only surface that said otherwise.

A second instance sits in `setAgentName`'s docstring, which states that a steal nulls the prior
holder's `title` and that a project claim passes `#{seq} {title}`.
