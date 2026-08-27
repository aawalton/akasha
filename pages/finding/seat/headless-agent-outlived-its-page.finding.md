---
id: 07ae527d-9ca2-5a7c-91f2-b7a3d779d71d
slug: headless-agent-outlived-its-page
page-type-slug: finding
title: "A headless agent outlived its errand by 28 hours in a session that never had a seat page"
domain-slug: page-type/seat
---

# Claim

A headless agent kept its tmux session and its supervisor process for 28 hours after finishing its errand, and no seat page for it ever stood. An agent was present in a seat holding no assignment, which is what `seat-presence` states must not happen.

# Evidence

Observed on the workstation on 2026-08-22. `tmux ls` returned eight sessions against seven seat pages under `pages/seat/`. The extra session, `definer-96`, was created 2026-08-21 at 07:27, and its pane held pid 2631970 with a live descendant: `run-supervisor.ts --headless -a aawalton --agent-id 01a02481-51ae-7000-b30f-86187c1ac15b --session-id 6dbd17c6-e175-4997-9636-6889b0ed3b3e --resume`, elapsed 1 day 4 hours 26 minutes. Its errand was "Reply with the single word: ok. Then stop." and its pane sat idle at the prompt, so the work it was given was already done.

Searching the memory repo for that agent id and that session id returned nothing, and git showed no seat page for `definer-96` had ever been committed. The page was never created rather than removed. The `seat` page type states in its Design that a seat's page stands while an agent is present in it and goes when none is; here presence continued for 28 hours and no page ever stood.

The seven seats that do have pages all held an unfinished assignment at the same moment: every one carried `on-call: true`, and aine and thea also carried a `project-seq`. So the gap was this one session alone.

Alan directed the session be stopped. `tmux kill-session -t definer-96` took the pane process and the supervisor with it, leaving seven sessions against seven pages.

Not measured: what started this agent without creating a page for it, and whether a supervisor outliving a finished errand is the same fault or a second one standing beside it.
