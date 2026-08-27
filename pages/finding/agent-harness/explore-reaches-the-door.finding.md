---
id: 88f6b086-32d7-5b74-bd7d-b7f2e660ca90
slug: explore-reaches-the-door
page-type-slug: finding
title: "Explore reaches the door"
domain-slug: domain/agent-harness
---

# Claim

`settings/subagents.json` restricts `general-purpose` and `claude` to Read, Grep and Glob. The built-in `Explore` and `Plan` types are declared nowhere in it and carry `Bash`, so a delegate dispatched to one reaches every door the estate gates. Every subagent run of a task found on 2026-08-05 used `Explore`.

# Evidence

Measured 2026-08-05 by `claude-task-developer`, firsthand, while running `define-principle-or-rule` against the candidate "dispatch a task to a spawned seat rather than a subagent".

`settings/subagents.json` read whole: two entries, `general-purpose` and `claude`, both `"tools": ["Read", "Grep", "Glob"]`, both described as "It cannot write, edit or run commands, so do not send it work that changes anything — dispatch that headless with `ops agent` instead." No entry for `Explore`, `Plan`, `claude-code-guide` or `statusline-setup`.

Dispatched an `Explore` subagent from this seat and had it run `bun ~/instructions/tools/pin.ts --seq 99999`, then `cat ~/.instruction-pins/$AGENT_ID.json`. It ran. The write landed in this seat's own pin bucket (`019fd271-3227-74de-97fc-27b03e848162.json`, `"seq":{"value":"99999"}`), which this seat then cleared with `--clear seq`. So an `Explore` delegate reached the shell, reached the pin store, and changed this seat's runtime identity state.

`~/.instruction-pins/` holds 1331 buckets and 0 containing the subagent mark `--`, so no subagent has ever pinned itself despite `tools/lib/pins.ts` carrying the fallback for one.

`memory/initiatives/trusted-subagents.md` read whole: all three objectives checked, rows 17809/17810/17811 landed.

Not measured: whether `Explore` and `Plan` can be reached by a `settings/subagents.json` entry at all, or whether Claude Code's built-in types override a file-declared one of the same name — the fix's feasibility is untested. Not measured: whether any of the seven `Explore` task-runs found in transcripts on 2026-08-05 actually landed a change; five of their prompts say "Land NOTHING" and two do not.
