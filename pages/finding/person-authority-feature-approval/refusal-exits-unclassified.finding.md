---
id: ac9736f6-966d-59e2-811c-7ee1b34b335d
slug: refusal-exits-unclassified
page-type-slug: finding
title: "Refusal exits unclassified"
domain-slug: domain/person-authority-feature-approval
---

# Claim

A refusal from the feature-approval gate leaves the CLI with exit code 70, `UNCLASSIFIED` — the code reserved for a verb throwing something nobody tagged. A gate doing exactly its job, refusing to open work on an ask no approved request names, reports itself to every caller as an unhandled defect rather than as a refusal.

`ops project create` on `main` refuses through the same class and exits the same way, and did so before `ops project start` was put behind that gate.

# Evidence

`FeatureRequestRefused` is declared `extends Error` directly, at `packages/alanwalton/feature-requests/src/proposal/approval.ts:52`, and is thrown from four sites in that file when a request names no approval, records no approver, or is asked for by somebody other than its requester.

The CLI's exit classifier recognises four tagged shapes and no others — `CliError`, `InputError`, `DataError`, `OperationalError` — at `packages/shared/cli-core/src/exit.ts:98-101`. Anything untagged takes `UNCLASSIFIED: 70` (`exit.ts:31`), whose own comment reads "the verb threw something nobody tagged, so the CLI has" no better answer; 70 is `EX_SOFTWARE` in `sysexits.h`.

`FeatureRequestRefused` matches none of the four, so the fall-through is by construction rather than by oversight in any one verb.

Observed while verifying #18636, which put `ops project start` behind the gate `ops project create` already held. The seat that built it reported the exit code and I confirmed the classification path independently. No criterion on that project asked for the exit code, and nothing in that tree changed it.
