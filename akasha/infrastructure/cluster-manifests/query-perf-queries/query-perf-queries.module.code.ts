import {
  CEILING_EMIT_FLOOR_SECONDS,
  CEILING_EXCLUDED_ROLES,
  QUERY_KEY_CEILING,
  QUERY_KEY_HEARTBEAT,
  SERIES_LIMIT,
} from "../query-perf-constants/query-perf-constants.module.code.ts"

function ceilingRoleExclusion(): string {
  return CEILING_EXCLUDED_ROLES.map((r) => `'${r}'`).join(", ")
}

export const QUERY_PERF_QUERIES_YAML = `${QUERY_KEY_CEILING}:
  query: |
    SELECT query_id::text AS queryid,
           usename AS role,
           extract(epoch FROM (now() - query_start))::float8 AS seconds
    FROM pg_stat_activity
    WHERE state = 'active'
      AND query_id IS NOT NULL
      AND query_start IS NOT NULL
      AND now() - query_start > interval '${CEILING_EMIT_FLOOR_SECONDS} seconds'
      AND usename NOT IN (${ceilingRoleExclusion()})
    ORDER BY seconds DESC
    LIMIT ${SERIES_LIMIT}
  metrics:
    - queryid:
        usage: "LABEL"
        description: "pg_stat_activity query_id of the in-flight statement"
    - role:
        usage: "LABEL"
        description: "Backend role (usename); admin/system/replication roles excluded"
    - seconds:
        usage: "GAUGE"
        description: "Seconds the active statement has been running (live, from pg_stat_activity)"

${QUERY_KEY_HEARTBEAT}:
  query: |
    SELECT 1::float8 AS up
  metrics:
    - up:
        usage: "GAUGE"
        description: "Query-perf evaluator liveness heartbeat (always 1 when the exporter scrapes); QueryPerfEvaluatorAbsent guards its absence"
`
