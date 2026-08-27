---
id: e66f78a1-523c-597a-8fd9-dcd8e6b58c1c
slug: tool-denies-unwarranted
page-type-slug: finding
title: "Every tool denial in the agent settings is warranted by no document"
domain-slug: domain/agent-claude-code-tools
---

# Claim

Every one of the fourteen entries in the `deny` array of `settings/agents.json` is warranted by no document in akasha. The array is the only place each denial is stated, and it records nothing about what a tool was shut off for or what would reopen one. The domain whose subject is which Tools an agent can call, `agent-claude-code-tools`, carries a Definition and nothing else.

# Evidence

Read `settings/agents.json` on 2026-08-22. Its `deny` array holds fourteen entries: `Bash(gh:*)`, `EnterPlanMode`, `ExitPlanMode`, `EnterWorktree`, `ExitWorktree`, `AskUserQuestion`, `PushNotification`, `Workflow`, `Artifact`, `ReportFindings`, `Skill`, `Agent(claude)`, `Agent(Plan)` and `Agent(isolation:worktree)`.

Searched `pages/` for each entry as a literal string. Twelve matched no file at all. `Skill` matched twenty files, every one an ESO skill line or completion category under the temper domains; `Workflow` matched twenty, every one a CI pipeline workflow. Neither set refers to the Claude Code tool carrying that name.

Searched `tools/`, `services/`, `turn-end/` and the rest of `settings/` for eleven of the entries. Ten matched nothing outside the deny array itself. `Artifact` matched four files, which I did not open to establish what they mean by the word.

`git log -S 'isolation:worktree' -- settings/agents.json` returns one commit, `dc06bdf96`, authored by Alan Walton at 2026-08-22 06:34:45, whose message is `instructions: edit settings/agents.json` with no body. Its diff adds one line beside `Agent(claude)` and `Agent(Plan)`, in a list where `EnterWorktree` and `ExitWorktree` already stood. The three commits before it touching the same file, `d64dffb7f`, `d664d8528` and `246143fd9`, add a PostCompact hook, a write hook and an environment variable, each under the same bare message.

`settings/tool-access.json` states `"disallowedTools": []`, so it duplicates none of these and warrants none of them either.

Not established: what fault, if any, prompted any individual denial. I read the commits, not the sessions around them. Not established: whether the four `Artifact` matches outside `pages/` bear on the denied tool. Not searched: the memory repo, the books repo, or any repository other than akasha.
