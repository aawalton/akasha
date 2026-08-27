---
id: 47f3aacc-7b55-5b4d-b877-d23b09c79d75
page-type-slug: finding
title: "Step script past arg cap never execs"
domain-slug: domain/branch-pipeline
---

# Claim

A CI step is dispatched as a single `sh -c` argument carrying the changed-file list inline, so a change touching enough files produces a script past Linux's per-argument cap and the step can never exec — it sits in `launching` while everything queues behind it, and nothing fails or alerts.

# Evidence

Measured 2026-08-14 on pipeline 28015, branch `project-19104` at `a0d1e401e7`.

The pipeline stood `running` for 34 minutes with 2 steps completed, 1 `launching` and 168 `pending`. The `launching` step was `preparation-prep`. Its pod `pe-28015-preparation-prep-a0d1e40` in namespace `ci` was 28 seconds old and in `Error`, so it was being recreated rather than hanging, and its whole log was one line: `exec /bin/sh: argument list too long`.

The pod's container `command` is 3 elements: `/bin/sh`, `-c`, and one argument of 857362 bytes. Its `env` totals 3205 bytes, so the size is argv rather than environment. Of that argument, 12759 path-like occurrences account for 832836 bytes — the changed-file list, inlined as a `CHANGED_FILES_EOF_8339` heredoc. The branch changes 12763 files, 846060 bytes of paths.

Linux caps a single argument at MAX_ARG_STRLEN, 131072 bytes, independently of the much larger total ARG_MAX, so one 857KB argument fails with E2BIG however small the rest is. The threshold is therefore a per-change file count somewhere near 2000 rather than anything about this branch's content.

WHY IT READS AS A STALL RATHER THAN A FAILURE, which is the part worth keeping. The step row holds `launching`, the pod dies before it can post a status, and the dispatcher recreates it. So the failing thing never reports, the steps behind it stay `pending` forever, and a pipeline that cannot start is indistinguishable from a slow one. Two seats watched this for over half an hour, one of them replacing the CLI's own wait with a direct poll, and neither could tell it apart from a queue waiting on a pod.

NOT ESTABLISHED: whether the merge queue's staging CI over the merged result hits the same cap — expected, since that changed-file set is the same size, but not measured, because measuring it means enqueueing and being ejected. Nor the exact file count at which a script crosses the cap. Nor whether any earlier change ever hit this and was read as an infrastructure flake and retried away.
