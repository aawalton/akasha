---
id: 591f73a5-ab25-576a-9133-ba62307fb80c
slug: ddns-cloudflare-calls-untimed
page-type-slug: finding
title: "Ddns cloudflare calls untimed"
domain-slug: domain/global
---

# Claim

The `ddns-headscale` job's calls to the Cloudflare API carry no timeout, so a call that stalls holds the job until its 120-second deadline kills it rather than failing fast. The one call in the script that does carry a timeout is the public-IP lookup, which is not the one that stalls: of the three retained failures, two ended `DeadlineExceeded` and the retained failure record outlives the pod that holds the reason, so nothing in the cluster says which call was hanging.

# Evidence

Measured 2026-08-12 against the live cluster, read-only, triaging a `JobFailed` firing for `cloudflared/ddns-headscale` at 06:38Z.

THE SCRIPT. An inline `/bin/sh -c` under `set -eu`. Its first call is `curl -sf --max-time 10 https://api.ipify.org`. Every call after it — zone lookup, record lookup, and the PUT or POST that writes the record — is a `curl` with no `--max-time` and no `--connect-timeout`. The job template sets `activeDeadlineSeconds: 120`, `backoffLimit: 1`, no `ttlSecondsAfterFinished`, on `*/5 * * * *`.

THE THREE FAILURES, which is exactly `failedJobsHistoryLimit: 3`.

- `29758345`, started 2026-07-31T12:25:00Z, `BackoffLimitExceeded`.
- `29771630`, started 2026-08-09T17:50:00Z, `DeadlineExceeded` at 17:52:00Z.
- `29775270`, started 2026-08-12T06:30:00Z, `DeadlineExceeded` at 06:32:00Z.

Both `DeadlineExceeded` records land at exactly 120 seconds after the start, so the container was still running when the deadline cut it rather than exiting on an error of its own. Under `set -eu` a stalled `curl` never reaches the script's own error branches.

THE EVIDENCE IS GONE. No pod survives for any of the three; the only pod from this CronJob is one `Completed` from 87 seconds before the reading. `kubectl logs` returns nothing for any failure and the conditions carry no error text. The untimed call is the suspect on the 120-second exactness and the script's shape, not a log line.


IT RECOVERS. The 06:35Z run and the one 87 seconds before the reading both completed, and the record needs writing only when the public IP changes.

NOT ESTABLISHED. Which call stalled, for the reason above. Whether Cloudflare or the egress path was at fault, or whether `api.ipify.org` returned slowly inside its own 10 seconds and left too little of the 120 for the rest. Whether the 2026-07-31 `BackoffLimitExceeded` shares this cause; it is a different condition and its pod is equally gone. Whether the record was stale in any of the three windows.
