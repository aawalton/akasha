---
id: c0ce64ba-0e26-5f75-b49d-7ee2e51ce6ff
page-type-slug: finding
title: "Destructive Git hook rebase gap"
domain-slug: page-type/agent-hook
---

# Claim

The destructive-git hook blocks `git checkout --ours`/`--theirs` (the standard rebase-conflict resolution), and the repo CLAUDE.md's Safe alternatives list names no way forward for that case or for stage-ref numbering, though `git show ":2:$f"`/`":3:$f"` works and fits the already-documented `git show <ref>:<path>` alternative.

# Evidence

Project #16417 (someday_maybe, agent-hook, live-on: commit). Captured, never defined; this text is the capture, moved off the row's retired `notes` attribute 2026-08-15.

The gap: the destructive-git hook blocks `git checkout` in every flavour, including `git checkout --ours <file>` / `--theirs` -- the standard way to resolve a conflict during a rebase. The repo CLAUDE.md's Safe alternatives list covers reading a file at a revision (`git show <ref>:<path>`) but says nothing about the conflict-resolution case or stage refs. An agent mid-rebase hits the block with no listed way forward, the worst moment to improvise around a guard.

Working equivalent, found by worker-16279 in a live dry run:
`git show ":2:$f" > "$f"` (`:2` = ours = the branch being rebased ONTO, main)
`git show ":3:$f" > "$f"` (`:3` = theirs = the commit being applied)

Consistent with the already-documented `git show <ref>:<path>` alternative -- the gap is purely discoverability. Nobody reading "read a file at a specific revision" connects it to "resolve a conflict," and the stage-ref numbering is the sort of thing an agent will guess wrong under pressure.

The ours/theirs inversion under rebase is worth stating explicitly: during a rebase, "ours" is the UPSTREAM branch and "theirs" is your own commit -- the opposite of what the words suggest and the opposite of a merge. An agent that guesses will silently keep the wrong side.

Scope: one addition to the Safe alternatives list under Prohibited Tools in the repo CLAUDE.md, including the stage-ref meanings and the rebase inversion.

Not dispatched: capacity gate closed (deployment 6, needs <5).
