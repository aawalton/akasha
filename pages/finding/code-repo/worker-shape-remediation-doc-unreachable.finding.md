---
id: 78202da4-db83-5933-b23a-a9705398e71e
page-type-slug: finding
title: "Worker shape remediation doc unreachable"
domain-slug: repo/code-repo
---

# Claim

The worker-shape checks point a failing author at `docs/long-running-worker-shape.md`, and `~/instructions/docs/` does not exist — the whole directory was moved into `dirty/`, which is quarantine queued for removal. The checks' JSDoc also refers a reader to "the principle doc" and "the principle" for the variant list and the opt-out rules. None of those references resolves. The mandate itself is not stated anywhere a reader of the instructions tree can reach.

# Evidence

`packages/infra/checks/src/checks/check-worker-shape-detect.ts:31`, inside `ALLOWLISTED_BASENAMES`:

    // see docs/long-running-worker-shape.md — pure-polling-loop variant

`ls ~/instructions/docs/` fails: no such directory. The file stands at `~/instructions/dirty/docs/long-running-worker-shape.md`, under the quarantine tree whose contents are being removed source by source.

The same file's JSDoc leans on that document three more times without naming it — "Each variant has exactly one canonical example documented in the principle doc" (`:24`), and in `check-worker-shape.ts:60`, "Allowlist (variants documented in the principle)". `lib/worker-shape-handlers.ts:29` adds "Documented in the principle: cursor-replay-only workers…".

Worth separating from the above, because it corrects the record rather than confirming it: **no check prints the path.** Grepping all of `packages/infra/checks/src` for `long-running-worker-shape`, `instructions/docs` and `docs/long` returns exactly one hit, the comment quoted above. `check-worker-shape.ts`, `check-worker-shape-detect.ts` and both supervisor checks wire no remediation document. There is a `lib/remediation-doc.ts` in the same package, used by other checks; these do not use it.

So the failing author gets a violation report with no remediation pointer at all, and an author who reads the source to find out why gets a dead relative path.

The mandate those references carry — compose through `runLongRunningWorker`, emit `worker.loop_duration_ms` — is enforced by the gate and stated nowhere binding.

Found while ingesting `dirty/knowledge/worker-shape-enforcement.md`, which claimed the check prints the path and treated it as merely stale. Both halves were wrong in the direction that matters. That source has been removed.
