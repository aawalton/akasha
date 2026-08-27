---
id: 6fee9dc7-99da-59ab-b3d0-d0023d0ef65e
slug: seat-infra-list-stated-in-both-repos
page-type-slug: finding
title: "Seat infra list stated in both repos"
domain-slug: domain/agent-harness
---

# Claim

The list of processes that count as a seat's own infrastructure is stated twice, once in each repository, and neither copy says the other exists. A change to one is silently a half-change.

# Evidence

`packages/agents/shared/proc-liveness.ts` and `tools/lib/decide-proc-liveness.ts` each declare their own `SEAT_INFRA_CMDLINE_RE`, with the same members spelled the same way. Nothing joins them and neither names the other.

Project #19204 moved the messages MCP server out of the code repository. Widening the code-repo copy passed that repo's typecheck, lint, both suites, the repo-wide AST gate and a full branch CI run, and deployed green. The instructions-repo copy went unwidened, and instructions changes are live on commit, so every seat spawned after the registry flip ran the server at a path its own harness did not recognise.

Reproduced against the live decider before repair: a seat holding only wrapper, supervisor, oauth-proxy, Claude and the messages server read as having work in flight, and the single cmdline it offered as that work was the messages server itself. `backgroundTaskCmdlinesByAgent` reaches this through `isSeatInfrastructureCmdline`, so an idle seat reads as busy. Repaired at `08a45e60`; the same probe then read false with an empty list.

The two copies are not redundant in the ordinary way: they answer for different readers, the deployed runtime and the harness. What they share is the claim, and the claim is what drifted.
