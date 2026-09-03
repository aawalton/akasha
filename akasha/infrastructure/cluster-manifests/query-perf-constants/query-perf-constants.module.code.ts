export const CEILING_SECONDS = 30

export const CEILING_EMIT_FLOOR_SECONDS = 5

export const EPISODIC_KEEP_FIRING_FOR = "3h"

export const SERIES_LIMIT = 50

export const CEILING_EXCLUDED_ROLES: readonly string[] = [
  "postgres",
  "streaming_replica",
  "supabase_auth_admin",
  "supabase_realtime_admin",
  "cnpg_metrics_exporter",
]

export const QUERY_KEY_CEILING = "pg_query_active"
export const QUERY_KEY_HEARTBEAT = "pg_query_perf_evaluator"

export const METRIC_CEILING = `${QUERY_KEY_CEILING}_seconds`
export const METRIC_HEARTBEAT = `${QUERY_KEY_HEARTBEAT}_up`

export const ALERT_CEILING = "QueryHardCeilingExceeded"
export const ALERT_HEARTBEAT_ABSENT = "QueryPerfEvaluatorAbsent"
