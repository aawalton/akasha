---
id: ce227d7d-9b29-5e67-b26d-6d849732e748
page-type-slug: finding
title: "Prohibited Git command reached for"
domain-slug: agent-hook/agent-hook-block-destructive-git
---

# Claim

Agents reach for `git stash`, `git reset` and `git checkout --theirs` on shared worktrees, and the PreToolUse hook blocks each one. This is the largest single behaviour in the register: nine observation categories carrying thirty-two sightings, one category of twenty-two on its own. The block lands and the documented alternative is then taken, so what is measured is how often the reach is made.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 9 rows (seq 5071, 5073, 5090, 5157, 5160, 5161, 5162, 5163, 5164) carrying 32 sightings; 8 at `accumulating` and 1 at `dispatched` (seq 5162), so part of this was already handed to somebody.

The commands recorded are `git stash` (the most frequent), `git reset HEAD --`, and `git checkout --theirs` used to resolve a merge conflict. At least one row notes the agent reached for the command although the prohibition stood in its own system prompt, and another notes the hook told the agent to use an ephemeral worktree instead. One of the nine rows carries the `dispatched` status.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
