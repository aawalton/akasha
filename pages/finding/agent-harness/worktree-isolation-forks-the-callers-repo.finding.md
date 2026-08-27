---
page-type-slug: finding
id: abddff92-ca1c-5a30-8cc1-844a579795f9
slug: worktree-isolation-forks-the-callers-repo
title: "Worktree isolation forks the caller's repo and gates the seat on its own duplicated pages"
domain-slug: domain/agent-harness
---

# Claim

An agent launched with `isolation: "worktree"` from a seat working in the instructions repository gets a worktree of THAT repository, not of the code repository the work is for, and the duplicate pages it contains are counted as unread instructions, which gates the launching seat down to Read, Grep and Glob until each is read again.

# Evidence

At 2026-08-21, working from a seat rooted at `~/repos/instructions`, an `Agent` call carrying `isolation: "worktree"` created `.claude/worktrees/agent-adcfdb755c76291a0/`. The work dispatched was a code-repository change, and a worktree of the code repository is what the flag reads as offering.

The copy carried the whole `pages/` tree. Twelve of those duplicates were then owed as required reading before this seat could act again: the reading record is keyed by path, so `<worktree>/pages/domain/global.md` is a document nobody has read whatever stands against `~/repos/instructions/pages/domain/global.md`. Until they were read the seat was held to `Read`, `Grep` and `Glob`, which is the state the harness uses for an agent that has not read its instructions.

The worktree cleaned itself up when the agent stopped, so nothing was left behind. The cost is the launching seat's, paid at once, and it is paid again on every such launch.

`code-repo` bars writing into `~/repos/code` and says every code change is made in a worktree, so reaching for an isolated worktree when dispatching code work is the reading the rule invites. The flag isolates the repository the CALLER sits in, which for every seat in this harness is the instructions repository, because that is where the harness stands.

NOT ESTABLISHED. Whether the flag can be pointed at another repository at all, and whether a seat rooted in the code repository would see the same duplication of its own instructions, are both unchecked. Only the instructions-rooted case was observed, once.
