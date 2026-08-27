---
id: a7fc053f-fa91-59cb-ac49-6764da782ea6
slug: no-guard-on-a-second-claude-launch-site
page-type-slug: finding
title: "Nothing refuses a second site from assembling a claude command line or putting --allowed-tools on it"
domain-slug: domain/agent-harness
---

# Claim

Nothing in akasha now refuses a second site from assembling a `claude` command line or from putting `--allowed-tools` on it.

# Evidence

The claim was carried by `check-allowed-tools-single-emitter` in the code repository, which held that exactly one site may launch the binary and exactly one may emit the flag. Both sites left that repository with the supervisor: the argv is assembled in `tools/lib/claude-launch-args.ts`, which names the binary at line 74 and pushes `--allowed-tools=` fused at line 75, and is spawned from `tools/lib/supervisor-interactive-spawn.ts`. Scanning `packages/` the check found zero of each and failed, which is `Fail Closed` working — it could not see its subject, so it certified nothing. It was removed rather than repaired, `Local Verdict` forbidding it the reach that would have let it look.

What survives is the substantive half, standing beside the code it guards: `tools/tests/claude-launch-args-argv.test.ts` asserts the search tool is named even where the caller passes no tools, and that the flag is emitted fused rather than bare. Those two assertions are why the ugrep shell shadow stays shut on the path that exists today.

What has no guard on either side is the singleness. A second spawn path written anywhere under `tools/` would pass every instrument now standing, and would reopen the shadow silently — no error and no changed behaviour until an unbounded search takes an agent tree down. Grepping akasha for a launch site today returns `tools/hook-bench.ts:166`, which spells `"claude", "-p", prompt` and names no search tool; whether that one is in scope is exactly the ruling nothing is now placed to make.

The reading belongs here as an instructions audit rather than as a code check, which is the shape #19407's children are already taking for five other checks.
