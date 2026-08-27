---
id: 70593149-73f4-5b1c-98bf-684debd76264
slug: ops-instructions-no-longer-a-second-door
page-type-slug: finding
title: "Ops instructions no longer a second door"
domain-slug: domain/agent-harness
---

# Claim

`block-instructions-direct-write.sh` refuses to name `ops instructions write` on the grounds that it is a second, weaker door, and that has not been true since the namespace became a door onto `tools/write.ts`.

# Evidence

The script's own comment records the measurement the rule was made from: `ops instructions write --dry-run` admitted a `domains/*.md` that `tools/run-gates.ts` refused with nine violations, because the ops-side implementation classified markdown outside `docs/` and `skills/` as a kind with no required fields and never ran schema conformance.

That implementation is gone. `packages/agents/instructions/src/instructions/registry.ts` now maps every verb to `doorCommand(name)`, which spawns `<instructions root>/tools/<name>.ts` and passes its exit code back unchanged, so `ops instructions write` and `bun ~/instructions/tools/write.ts` are one program reached two ways.

Three tests in `packages/infra/scripts` still pin the negative — that the refusal names the repo's own tool and not `ops instructions`. #17597 left them alone rather than reverse another row's recorded decision inside a row about a second root. The cost of leaving it is that the most-read piece of guidance about writing into these trees teaches a spelling the estate does not otherwise use, and the reason it gives for doing so no longer holds.
