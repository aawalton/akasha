---
id: e9ab1d6e-2571-583c-89db-fc149fe032bb
page-type-slug: finding
title: "One relative path names two files"
domain-slug: domain/agent-evidence
---

# Claim

A path that exists at the same spelling in both the code repository and the instructions repository makes a reading wrong in a way nothing flags, because the wrong tree answers the question in the right shape.

# Evidence

Three instances on 2026-08-24, on branch `change-19458`, where `packages/infra/checks/**` stands in both repositories.

An agent was told to add `@infra/checks` to the root `package.json`. It refused with three derived facts: the package declares `@infra/cluster-checks`, no package anywhere declares `@infra/checks`, and `tools/lib/code-import.ts:15-24` resolves specifiers through `Bun.resolveSync(ref, codeRoot())`, so the lookup never consults the instructions repository whatever it is named. The instruction had read the instructions-repo copy and named the code-repo one.

A finding under `pages/finding/` measured `packages/infra/checks` in the code repository while a reader would naturally check the instructions copy. It happened not to change the verdict. The agent that deleted the finding noticed the mirrored path on its way out rather than being caught by it.

A brief written by the seat asserted that `check-design-tokens.ts`, the only string-namer of the design-tokens barrel, stood in the code repository. On this branch the code repository holds no `packages/infra/checks` files at all — `git ls-files 'packages/infra/checks/**'` in the worktree returns empty, the checks engine having already left. The namer was the instructions-repo copy at the identical relative path. The agent resolved it with `ops instructions reaches`, which attributes a specifier to the file that names it and so cannot be misled by a path standing in two trees.

The third instance caught the agent writing the brief rather than the agent working from it, so the wrong premise was distributed rather than held.

Not measured: how many paths stand at one spelling in both trees, and whether this has cost anything before today.
