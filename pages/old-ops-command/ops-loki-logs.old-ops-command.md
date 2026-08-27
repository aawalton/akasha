---
id: cd15b9bb-cf4e-5bd4-bdfe-3f992c871d5c
page-type-slug: old-ops-command
title: "Ops loki logs"
slug: ops-loki-logs
domain-parent-slug: domain/ops-loki
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/loki/logs.ts
path: loki logs
---

# Definition

- **Ops loki logs** — a pod's log lines out of Loki, newest first, with what bounded the answer stated beside it.

# Help

Fetch pod logs from Loki via the K8s API proxy.

Matches a pod name as a prefix (`{pod=~"<pod>.*", namespace="<ns>"}`). Returns log lines newest-first with nanosecond-accurate timestamps and an opaque pagination cursor the caller passes back to fetch older pages.

Pod and namespace values are treated as literal strings (not regex): special characters (quotes, backslashes) are auto-escaped before being embedded in the LogQL matcher, so callers do not need to pre-escape them and cannot inject matcher syntax through these flags.

Pipeline-engine label filters (--commit-sha, --inputs-hash) translate to Loki label selectors on `pipeline_engine_commit_sha` / `pipeline_engine_inputs_hash` — Loki normalizes label names by replacing `.` and `-` with `_`. Both flags validate their input via `commitSha40()` / `inputsHash12()` before any query, so a malformed value fails fast with a clear error instead of silently returning zero matches.

This command does not filter log bodies. Compose with standard text tools:
  ops loki logs my-pod | jq 'select(.line | contains("ERROR"))'
  ops loki logs my-pod --since 15m --limit 100 | head

Default stdout (JSONL; no pagination metadata):
  one {"timestamp": "...", "line": "..."} per line
  callers that need to paginate must re-invoke with --json.

--json stdout (stable shape — callers may depend on field names):
  {"lines": [{timestamp, line}...], "count": number, "cursor": string | null,
   "isDone": boolean, "complete": boolean, "boundedBy": ("limit"|"since"|"unknown")[]}
  Pagination rides on stdout in --json mode, never on stderr.
  complete is true only when nothing clipped the output; boundedBy names what did —
  "limit" (the --limit cap was hit), "since" (matching lines exist older than the
  window), or "unknown" (the window check could not run, so completeness is unproven).

Fail-loud diagnostics (default JSONL path only; stderr, never stdout):
  - zero matches: warns that the pod prefix matched nothing in the namespace, and
    (best-effort) names other namespaces where the prefix has streams (did-you-mean).
  - truncation: when --limit is reached before the full --since window is covered,
    warns that older lines were dropped and points to --all / --json pagination.
  - window clipping: when matching lines exist OLDER than the --since window, warns
    that this is a time slice, not the whole log, and to widen --since (Loki retains 7d);
    a check that could not run is reported as undetermined, never as completeness.
  --json mode stays silent on stderr — its count / cursor / isDone / complete /
  boundedBy fields already carry the same signals on stdout.
