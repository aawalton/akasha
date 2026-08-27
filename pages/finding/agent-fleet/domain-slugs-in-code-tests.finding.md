---
id: cd8231cb-c6cc-511d-8b78-1bfb77c14d93
page-type-slug: finding
title: "Domain slugs in code tests"
domain-slug: domain/agent-fleet
---

# Claim

Code tests resolve domain slugs against the live instructions corpus, so retiring a domain turns a passing test red in a defect's shape.

# Evidence

`packages/agents/cli/src/agent/spawn.cli.test.ts` asserts that `ops seat start` refuses a `--name` disagreeing with the axes stated beside it. It stated `--domain identity` — an arbitrary slug, chosen only because it existed.

When the seat definitions retired `identity` as a domain on 2026-08-05, the spawn began refusing that call for an unresolvable domain instead, one step ahead of the disagreement the case exists to assert. The test went red while the behaviour it covers never changed, and the refusal it received was a correct one.

Nothing connected the two. The instructions-repo commit that removed `domains/identity.md` ran no code CI, and the red surfaced later, on a branch cut for unrelated work, where it read as that branch's breakage.

`folders/code-repo.md` carries the rule this crosses: never let changing an instruction require changing code. The dependency runs the priced direction — an instruction change costing a row, a worktree, CI and a deploy.

The repair on #17924 swapped the slug for `seat`, which restores green and leaves the coupling standing. Any test naming a live slug is the same shape, and `ops seat start`'s own resolution against the corpus is what makes an end-to-end case here need one at all.
