export const CEILING_EMIT_FLOOR_SECONDS = 5

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
