---
id: 0493287c-0eef-5b74-ae47-657b8551a1bc
page-type-slug: finding
title: "A staged file belongs to the checkout, not the agent that staged it"
domain-slug: domain/change-harness-workstation
---

# Claim

Agents swarming in one checkout share one git index, so a file staged by one agent is committed by whichever agent next runs `git commit`, under that agent's message.

Staging is not a private act. Between `git add` and `git commit` the staged set belongs to the checkout rather than to the agent that staged it, and nothing in the interval marks whose it is.

# Evidence

On 2026-08-20, during the swarm on main, commit `cf39fe57c2` — titled "Let the Plants readout's own documents drive the Plants stoplight" — carries 23 files. Four are the Plants work its message describes. The other nineteen are an unrelated CI status vocabulary sweep across `packages/alanwalton/projects/cli` and `packages/infra/ci/cli`, staged minutes earlier by a different agent that had not yet committed.

The committing agent did nothing unusual: a bare `git commit` takes the whole index. The staging agent then found its own `git commit -- <paths>` reporting "no changes added to commit", because its files were already in someone else's commit.

Both changes are correct and both landed. What was lost is the account: nineteen files stand under a message that does not describe them, and a reader of `git log` looking for when the vocabulary sweep landed will not find it at that title.

The window is as long as the gap between staging and committing, which widens whenever an agent stages, runs a test suite, and commits after. That is the ordinary shape of verifying before landing.
