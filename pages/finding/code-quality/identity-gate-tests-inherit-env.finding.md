---
id: 9e06b788-53ad-57e7-9030-1e30c0d19475
page-type-slug: finding
title: "Identity gate tests inherit env"
domain-slug: domain/code-quality
---

# Claim

The `unidentified caller` suites for `ops project check` and `ops project deploy` establish their premise from the ambient environment rather than from the test, so they pass only in a shell where `AGENT_ID` happens to be unset. In an agent seat, where it is always set, all ten cases fail — and they fail on the assertion rather than reporting an unmet premise.

# Evidence

`packages/alanwalton/projects/cli/src/project/check.cli.test.ts` and `deploy.cli.test.ts` each open with a `describe("ops project check — unidentified caller")` block whose six and four cases assert `exitCode` 2 and a stderr containing `no caller identity` and `AGENT_ID`. The `runCli` helper spawns the verb with the parent environment inherited, and nothing in either file deletes `AGENT_ID` before spawning.

Run under project #17615's seat on 2026-08-03, `bun test packages/alanwalton/projects` reported ten failures, all from those two blocks. The stderr each case actually received was `Worktree directory does not exist` and `worktree path not provided` — the identity gate passed and execution continued past it, which is the opposite of what the block is pinning. The verb's refusal was never exercised; nothing reports that, because a failing assertion on the wrong text reads the same as a broken gate.

The blocks' own comments state their intent precisely — "no flag gets a different answer out of this gate", and the `REGISTRY_USAGE_DUMP` absence assertion exists so the cases fail when the verb is missing rather than when the refusal is wrong. That care is spent on the assertions and none on the premise they rest on.
