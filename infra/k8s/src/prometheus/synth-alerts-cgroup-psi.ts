import { ALERT_PSI_COLLECTOR_STALE, PSI_PROM_FILE_PATH } from "./cgroup-psi-constants"

const COLLECTOR_STALE_SECONDS = 300

export const CGROUP_PSI_ALERTS = `  - name: cgroup-psi
    rules:
      # The collector's only death signal. It leaves the published file untouched
      # on a failed read rather than writing a zero, so a frozen mtime means the
      # reader stopped — and a false zero would be indistinguishable from calm.
      - alert: ${ALERT_PSI_COLLECTOR_STALE}
        expr: time() - node_textfile_mtime_seconds{file="${PSI_PROM_FILE_PATH}"} > ${COLLECTOR_STALE_SECONDS}
        for: 0m
        labels:
          severity: warning
`
