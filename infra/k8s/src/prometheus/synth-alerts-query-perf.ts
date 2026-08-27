import {
  ALERT_CEILING,
  ALERT_HEARTBEAT_ABSENT,
  CEILING_SECONDS,
  EPISODIC_KEEP_FIRING_FOR,
  METRIC_CEILING,
  METRIC_HEARTBEAT,
} from "./query-perf-constants"

export const QUERY_PERF_ALERTS = `  - name: query-performance
    rules:
      # HARD CEILING. Read live from pg_stat_activity: any single statement (in a
      # monitored role) running longer than ${CEILING_SECONDS}s. Truly immediate —
      # a statement already running this long is an active incident, so no \`for\`.
      # Alert-first: statement_timeout enforcement is a later row, not this subsystem.
      - alert: ${ALERT_CEILING}
        expr: max by (queryid, role) (${METRIC_CEILING}) > ${CEILING_SECONDS}
        # EPISODIC hold (#15126). No \`for\` — a statement already past the ceiling is
        # an active incident, so firing stays immediate. But an episodic offender (e.g.
        # the ~7s-mean page_patch write) exceeds the ceiling for a few seconds,
        # clears, and re-fires minutes-to-hours later; without a hold each burst
        # flap-resolves at the rule. keep_firing_for holds firing for
        # ${EPISODIC_KEEP_FIRING_FOR} past the last breach so one incident's scattered
        # bursts collapse into ONE firing span (measured max intra-incident gap 2.6h;
        # this clears it with margin while staying 3.9x below the nearest
        # separate-incident gap). Sizing measured — see EPISODIC_KEEP_FIRING_FOR in
        # query-perf-constants.ts.
        keep_firing_for: ${EPISODIC_KEEP_FIRING_FOR}
        labels:
          severity: critical

      # EVALUATOR LIVENESS. The ceiling metric is absent-while-healthy, so this
      # always-present heartbeat is the #14219 guard: its absence means the
      # exporter's query-perf path went dark (scrape drop / query error), not "no slow
      # queries". Mirrors PostgresBackupMetricAbsent.
      - alert: ${ALERT_HEARTBEAT_ABSENT}
        expr: absent(${METRIC_HEARTBEAT})
        for: 10m
        labels:
          severity: warning
`
