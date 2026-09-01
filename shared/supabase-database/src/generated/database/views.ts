// DO NOT EDIT BY HAND. `Database["public"]["Views"]`, lifted out of
// the Supabase generated `Database` type so that no one file passes the length akasha
// will hold. The barrel beside this directory is the only thing that imports it, and
// carries the note on how to split a fresh Supabase dump the same way.

export type DatabasePublicViews = {
  pg_stat_statements: {
    Row: {
      calls: number | null
      dbid: unknown
      jit_deform_count: number | null
      jit_deform_time: number | null
      jit_emission_count: number | null
      jit_emission_time: number | null
      jit_functions: number | null
      jit_generation_time: number | null
      jit_inlining_count: number | null
      jit_inlining_time: number | null
      jit_optimization_count: number | null
      jit_optimization_time: number | null
      local_blk_read_time: number | null
      local_blk_write_time: number | null
      local_blks_dirtied: number | null
      local_blks_hit: number | null
      local_blks_read: number | null
      local_blks_written: number | null
      max_exec_time: number | null
      max_plan_time: number | null
      mean_exec_time: number | null
      mean_plan_time: number | null
      min_exec_time: number | null
      min_plan_time: number | null
      minmax_stats_since: string | null
      parallel_workers_launched: number | null
      parallel_workers_to_launch: number | null
      plans: number | null
      query: string | null
      queryid: number | null
      rows: number | null
      shared_blk_read_time: number | null
      shared_blk_write_time: number | null
      shared_blks_dirtied: number | null
      shared_blks_hit: number | null
      shared_blks_read: number | null
      shared_blks_written: number | null
      stats_since: string | null
      stddev_exec_time: number | null
      stddev_plan_time: number | null
      temp_blk_read_time: number | null
      temp_blk_write_time: number | null
      temp_blks_read: number | null
      temp_blks_written: number | null
      toplevel: boolean | null
      total_exec_time: number | null
      total_plan_time: number | null
      userid: unknown
      wal_buffers_full: number | null
      wal_bytes: number | null
      wal_fpi: number | null
      wal_records: number | null
    }
    Relationships: []
  }
  pg_stat_statements_info: {
    Row: {
      dealloc: number | null
      stats_reset: string | null
    }
    Relationships: []
  }
}
