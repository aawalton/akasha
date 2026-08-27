---
id: 4c78e124-7e45-5191-9b31-a8a8274dd83c
slug: teaching-carriers-omit-source
page-type-slug: finding
title: "Teaching carriers omit source"
domain-slug: domain/global
---

# Claim

`check-no-prose-flag-teaching` declares four carriers of instruction — `instructions`, `repo-doc`, `cli-help`, `page-row` — and none of them is source code. A `.ts` file that EMITS an `ops` invocation at runtime, in a refusal message or a next-step line, is neither a markdown doc nor a command definition, so nothing scores it. That carrier reaches an agent with more force than any doc, because it arrives at the moment of the act.

# Evidence

Measured 2026-08-07 in `~/code` at `ecf5f9518`, by running the check.

THE DECLARED SET. `packages/infra/checks/src/lib/prose-flag-teaching-sites.ts:47`: `export const ALL_CARRIERS: readonly Carrier[] = ["instructions", "repo-doc", "cli-help", "page-row"]`. The check's dispatch at `check-no-prose-flag-teaching.ts:121-125` handles `repo-doc` (markdown files) and `cli-help` (built from command definitions). No arm reads a `.ts` body.

THE RUN. Locally, with an instructions root present: "carriers scanned … repo-doc, cli-help, instructions / carriers NOT scanned … page-row / documents scanned … 2502 / ops invocations seen … 4724 / UNRESOLVED … 508 / TEACHING SITES … 0", exit 0, "[over 2502 of 2502 documents]". The check is scrupulous about what it did not reach — it names the unscanned carrier and its unresolved bucket — and the source-code carrier is not among either, because it is not a carrier it knows about.

THE SIZE OF WHAT IS UNSCORED. 14,522 tracked `.ts`/`.tsx` files. 1,819 of them hold an `ops <verb>` invocation inside a string or template literal, 4,409 occurrences in all. That is a coarse pattern rather than a teaching-site census — it does not decide which are instructional — but it bounds the carrier at four figures rather than a handful.

DISTINCT FROM ITS STANDING SIBLING. `pages/finding/agent-harness/prose-flag-guard-thinned.finding.md` records that a CI pod run of this same check reached only `repo-doc` and `cli-help`, missing the instructions corpus where the founding incident's 342 sites stood. That is about a carrier the check KNOWS and could not reach on that run — my local run did reach it, 1,762 of the 2,502 documents. This is about a carrier it does not enumerate at all.

NOT MEASURED. Whether any live runtime-emitted site would be a teaching site today. The instance that raised this, in `decide-handoff-gate.ts`, is cured.
