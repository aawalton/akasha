---
id: 368f1314-b7ac-52e9-a038-e718d95d96d3
page-type-slug: ops-command
title: "Ops pipeline logs"
slug: ops-pipeline-logs
domain-parent-slug: domain/ops-pipeline
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/pipeline/logs.ts
path: pipeline logs
---

# Definition

- **Ops pipeline logs** — one step's pod log lines out of Loki, newest first, with what bounded the answer beside them.

# Help

Fetch pod logs for one step of a pipeline. Resolves the step's podName via the `pipeline`/`workflow`/`step` page chain, then queries Loki with the same semantics as `ops loki logs`.

Default stdout (JSONL): one `{"timestamp": "...", "line": "..."}` per line, newest-first.
--json stdout: `{"lines": [...], "count": n, "cursor": <b64|null>, "isDone": bool, "complete": bool, "boundedBy": ["limit"|"since"|"unknown"...]}` — same shape as `ops loki logs --json`.

`complete` / `boundedBy` are the machine-readable twin of the stderr markers below, and always both appear. `complete` is false whenever a bound could not be ruled out — `boundedBy: ["limit"]` means --limit truncated the fetch, `["since"]` means matching lines exist older than the window, `["unknown"]` means the check could not run. An unverified completeness is never reported as completeness.

Fail-loud diagnostics (default JSONL path only; stderr, never stdout):
  - zero matches: warns that the pod prefix matched nothing in the namespace, and
    (best-effort) names other namespaces where the prefix has streams (did-you-mean).
  - --limit truncation: when --limit is reached before the full --since window is
    covered, warns that older lines were dropped and points to --all / --json paging.
  - --since clipping: when matching lines exist OLDER than the --since window, warns
    that the output is a time slice and points to a wider --since.
  These exist because a truncated log greps as ABSENCE — finding nothing in a bounded
  result is not evidence the thing is not there. --json mode stays SILENT on stderr;
  its complete / boundedBy fields carry the same signal on stdout.
