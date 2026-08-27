---
id: 3ebed865-fa84-5dc9-b81a-b7d6fec39a81
slug: snapshot-half-pinned
page-type-slug: finding
title: "A graph snapshot pins one repository at a commit and reads the other as it stands, so the same named commit reads differently twice"
domain-slug: domain/instrument
---

# Claim

A graph snapshot is pinned to a wall clock rather than to a sha. `tools/lib/graph/repos.ts:90` reads the code repository at the commit it was given, and every other repository, the instructions one included, as it stands in its working tree. Two runs naming the same commit can therefore return different numbers, and the difference is whatever other seats landed in between. Nothing in the output marks which half of a reading was pinned and which was live.

# Evidence

`tools/lib/graph/repos.ts:90` reads `repo === CODE_REPO ? filesAtCommit(root, commit) : filesAsTheyStand(root)`. I opened it; that half is confirmed, not reported.

Five sightings in this initiative:

- A first graph comparison showed nodes and edges moving. The cause was two other seats deleting ten files inside the measured range. A later drift of one edge was a third seat mid-run.
- An agent moved from `--seq` to `--commit` only after noticing the worktree had shifted under it three times.
- An agent found the instructions sha quoted in its brief already stale before it began.
- Page seeds read 307 in one run and 336 in another at the same code sha, and node types went 45 to 47 from the same cause.
- Two runs of `bun tools/run-checks.ts` minutes apart, with one commit of my own between them, moved `checks-reached` from 53/51 to 54/50 and the memory page count from 20210 to 20209. Neither change was mine.

Only a back-to-back pair against a commit and its own parent is a control. A re-run at the same named commit is not one.

Proposed rather than decided: a Rule under `# Rules`, beside `Horizon`, which bounds how far back a reading reaches where this bounds what moved beneath it.

## Moving Ground

**Take both readings back to back, against a commit and its own parent.**

Between two runs other seats land work, so a difference reads as yours when none of it is.

One repo is pinned, the other is read live.

The same commit can read differently twice.

It restates none of `Horizon`, `Population` or `Negative Control`, which bind how far back a store reaches, stating the population size, and making an instrument fail before it is trusted. Nothing standing there says a re-run at the same named commit is not a control.

Not measured: how many other instruments read one repository pinned and another live; whether any caller pins both; and whether the four sightings other than my own share this cause, each being reported by the agent that hit it.
