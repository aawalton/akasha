---
id: b1e841cc-79e6-543e-a865-932d84ea2135
page-type-slug: finding
title: "Commits name no seat"
domain-slug: repo/instructions-repo
---

# Claim

Commits in the instructions repo name no seat, so with about forty seats writing into it concurrently nothing on a commit says which one made it.

# Evidence

`git log -10 --format="%an <%ae>"` in `~/instructions` returns ten commits, all authored `Alan Walton <aawalton@gmail.com>`. `git log -20 --format="%B" | grep -c "^Agent:"` returns **0**. `rg -n -i "trailer|Agent:|seat" tools/lib/git.ts` returns nothing, so the repo's own committer writes no attribution.

The mechanism exists, one repo over: `packages/agents/shared/commit-agent-trailer.ts` is tracked and live in `~/code`, and the code repo's writer uses it. The instructions door used to share it — the quarantined `packages/agents/instructions/CLAUDE.md` says "The commit also carries the seat that decided it, as an `Agent:` trailer from `@agents/shared` → `commit-agent-trailer.ts` — shared with the code repo's writer so one field is spelled one way in both." That was true when the door lived in `packages/agents/instructions/`. The door has since moved to `~/instructions/tools/`, a tree that carries no `package.json`, no lockfile and no `node_modules` and therefore cannot import `@agents/shared` — `tool-command.ts`'s docblock gives exactly that as why it shells out rather than importing. The attribution went with the move, and nothing reports its absence.

What this costs is specific rather than tidiness: a commit message here is the durable record of a verdict. An ingest seat's reasoning survives its own source's removal only in the commit and the seat's report, and `%an` names the human who pushed, which is the same on every commit and answers a different question.

Found while emptying `dirty/code/packages-agents-instructions-claude.md`, whose `## Shape` section is the only place the former arrangement is written down. That document is being removed, so the claim would otherwise go with it.
