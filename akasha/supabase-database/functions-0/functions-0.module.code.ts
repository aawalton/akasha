import type { Json } from "../database-json/database-json.module.code.ts"

export type DatabasePublicFunctions0 = {
  add_compression_policy: {
    Args: {
      compress_after?: unknown
      compress_created_before?: string
      hypertable: unknown
      if_not_exists?: boolean
      initial_start?: string
      schedule_interval?: string
      timezone?: string
    }
    Returns: number
  }
  add_continuous_aggregate_policy: {
    Args: {
      buckets_per_batch?: number
      continuous_aggregate: unknown
      end_offset: unknown
      if_not_exists?: boolean
      include_tiered_data?: boolean
      initial_start?: string
      max_batches_per_execution?: number
      refresh_newest_first?: boolean
      schedule_interval: string
      start_offset: unknown
      timezone?: string
    }
    Returns: number
  }
  add_dimension:
    | {
        Args: {
          chunk_time_interval?: unknown
          column_name: unknown
          hypertable: unknown
          if_not_exists?: boolean
          number_partitions?: number
          partitioning_func?: unknown
        }
        Returns: {
          column_name: unknown
          created: boolean
          dimension_id: number
          schema_name: unknown
          table_name: unknown
        }[]
      }
    | {
        Args: {
          dimension: unknown
          hypertable: unknown
          if_not_exists?: boolean
        }
        Returns: {
          created: boolean
          dimension_id: number
        }[]
      }
  add_job: {
    Args: {
      check_config?: unknown
      config?: Json
      fixed_schedule?: boolean
      initial_start?: string
      job_name?: string
      proc: unknown
      schedule_interval: string
      scheduled?: boolean
      timezone?: string
    }
    Returns: number
  }
  add_reorder_policy: {
    Args: {
      hypertable: unknown
      if_not_exists?: boolean
      index_name: unknown
      initial_start?: string
      timezone?: string
    }
    Returns: number
  }
  add_retention_policy: {
    Args: {
      drop_after?: unknown
      drop_created_before?: string
      if_not_exists?: boolean
      initial_start?: string
      relation: unknown
      schedule_interval?: string
      timezone?: string
    }
    Returns: number
  }
  alter_job: {
    Args: {
      check_config?: unknown
      config?: Json
      fixed_schedule?: boolean
      if_exists?: boolean
      initial_start?: string
      job_id: number
      job_name?: string
      max_retries?: number
      max_runtime?: string
      next_start?: string
      retry_period?: string
      schedule_interval?: string
      scheduled?: boolean
      timezone?: string
    }
    Returns: {
      application_name: unknown
      check_config: string
      config: Json
      fixed_schedule: boolean
      initial_start: string
      job_id: number
      max_retries: number
      max_runtime: string
      next_start: string
      retry_period: string
      schedule_interval: string
      scheduled: boolean
      timezone: string
    }[]
  }
  approximate_row_count: { Args: { relation: unknown }; Returns: number }
  attach_tablespace: {
    Args: {
      hypertable: unknown
      if_not_attached?: boolean
      tablespace: unknown
    }
    Returns: undefined
  }
  by_hash: {
    Args: {
      column_name: unknown
      number_partitions: number
      partition_func?: unknown
    }
    Returns: unknown
  }
  by_range: {
    Args: {
      column_name: unknown
      partition_func?: unknown
      partition_interval?: unknown
    }
    Returns: unknown
  }
  chunk_columnstore_stats: {
    Args: { hypertable: unknown }
    Returns: {
      after_compression_index_bytes: number
      after_compression_table_bytes: number
      after_compression_toast_bytes: number
      after_compression_total_bytes: number
      before_compression_index_bytes: number
      before_compression_table_bytes: number
      before_compression_toast_bytes: number
      before_compression_total_bytes: number
      chunk_name: unknown
      chunk_schema: unknown
      compression_status: string
      node_name: unknown
    }[]
  }
  chunk_compression_stats: {
    Args: { hypertable: unknown }
    Returns: {
      after_compression_index_bytes: number
      after_compression_table_bytes: number
      after_compression_toast_bytes: number
      after_compression_total_bytes: number
      before_compression_index_bytes: number
      before_compression_table_bytes: number
      before_compression_toast_bytes: number
      before_compression_total_bytes: number
      chunk_name: unknown
      chunk_schema: unknown
      compression_status: string
      node_name: unknown
    }[]
  }
  chunks_detailed_size: {
    Args: { hypertable: unknown }
    Returns: {
      chunk_name: unknown
      chunk_schema: unknown
      index_bytes: number
      node_name: unknown
      table_bytes: number
      toast_bytes: number
      total_bytes: number
    }[]
  }
  compress_chunk: {
    Args: {
      if_not_compressed?: boolean
      recompress?: boolean
      uncompressed_chunk: unknown
    }
    Returns: unknown
  }
  create_hypertable:
    | {
        Args: {
          create_default_indexes?: boolean
          dimension: unknown
          if_not_exists?: boolean
          migrate_data?: boolean
          relation: unknown
        }
        Returns: {
          created: boolean
          hypertable_id: number
        }[]
      }
    | {
        Args: {
          associated_schema_name?: unknown
          associated_table_prefix?: unknown
          chunk_sizing_func?: unknown
          chunk_target_size?: string
          chunk_time_interval?: unknown
          create_default_indexes?: boolean
          if_not_exists?: boolean
          migrate_data?: boolean
          number_partitions?: number
          partitioning_column?: unknown
          partitioning_func?: unknown
          relation: unknown
          time_column_name: unknown
          time_partitioning_func?: unknown
        }
        Returns: {
          created: boolean
          hypertable_id: number
          schema_name: unknown
          table_name: unknown
        }[]
      }
  decompress_chunk: {
    Args: { if_compressed?: boolean; uncompressed_chunk: unknown }
    Returns: unknown
  }
  delete_job: { Args: { job_id: number }; Returns: undefined }
  detach_tablespace: {
    Args: {
      hypertable?: unknown
      if_attached?: boolean
      tablespace: unknown
    }
    Returns: number
  }
  detach_tablespaces: { Args: { hypertable: unknown }; Returns: number }
  disable_chunk_skipping: {
    Args: {
      column_name: unknown
      hypertable: unknown
      if_not_exists?: boolean
    }
    Returns: {
      column_name: unknown
      disabled: boolean
      hypertable_id: number
    }[]
  }
  drop_chunks: {
    Args: {
      created_after?: unknown
      created_before?: unknown
      newer_than?: unknown
      older_than?: unknown
      relation: unknown
      verbose?: boolean
    }
    Returns: string[]
  }
  enable_chunk_skipping: {
    Args: {
      column_name: unknown
      hypertable: unknown
      if_not_exists?: boolean
    }
    Returns: {
      column_stats_id: number
      enabled: boolean
    }[]
  }
  generate_uuidv7: { Args: never; Returns: string }
  get_plants_reading: { Args: { p_day: string }; Returns: number }
  get_sleep_reading: { Args: { p_day: string }; Returns: number }
  get_telemetry_report: { Args: never; Returns: Json }
  hypertable_approximate_detailed_size: {
    Args: { relation: unknown }
    Returns: {
      index_bytes: number
      table_bytes: number
      toast_bytes: number
      total_bytes: number
    }[]
  }
  hypertable_approximate_size: {
    Args: { hypertable: unknown }
    Returns: number
  }
  hypertable_columnstore_stats: {
    Args: { hypertable: unknown }
    Returns: {
      after_compression_index_bytes: number
      after_compression_table_bytes: number
      after_compression_toast_bytes: number
      after_compression_total_bytes: number
      before_compression_index_bytes: number
      before_compression_table_bytes: number
      before_compression_toast_bytes: number
      before_compression_total_bytes: number
      node_name: unknown
      number_compressed_chunks: number
      total_chunks: number
    }[]
  }
  hypertable_compression_stats: {
    Args: { hypertable: unknown }
    Returns: {
      after_compression_index_bytes: number
      after_compression_table_bytes: number
      after_compression_toast_bytes: number
      after_compression_total_bytes: number
      before_compression_index_bytes: number
      before_compression_table_bytes: number
      before_compression_toast_bytes: number
      before_compression_total_bytes: number
      node_name: unknown
      number_compressed_chunks: number
      total_chunks: number
    }[]
  }
  hypertable_detailed_size: {
    Args: { hypertable: unknown }
    Returns: {
      index_bytes: number
      node_name: unknown
      table_bytes: number
      toast_bytes: number
      total_bytes: number
    }[]
  }
  hypertable_index_size: { Args: { index_name: unknown }; Returns: number }
  hypertable_size: { Args: { hypertable: unknown }; Returns: number }
  interpolate:
    | {
        Args: {
          next?: Record<string, unknown>
          prev?: Record<string, unknown>
          value: number
        }
        Returns: number
      }
    | {
        Args: {
          next?: Record<string, unknown>
          prev?: Record<string, unknown>
          value: number
        }
        Returns: number
      }
    | {
        Args: {
          next?: Record<string, unknown>
          prev?: Record<string, unknown>
          value: number
        }
        Returns: number
      }
    | {
        Args: {
          next?: Record<string, unknown>
          prev?: Record<string, unknown>
          value: number
        }
        Returns: number
      }
    | {
        Args: {
          next?: Record<string, unknown>
          prev?: Record<string, unknown>
          value: number
        }
        Returns: number
      }
  json_matches_schema: {
    Args: { instance: Json; schema: Json }
    Returns: boolean
  }
  jsonb_matches_schema: {
    Args: { instance: Json; schema: Json }
    Returns: boolean
  }
  jsonschema_is_valid: { Args: { schema: Json }; Returns: boolean }
  jsonschema_validation_errors: {
    Args: { instance: Json; schema: Json }
    Returns: string[]
  }
  locf: {
    Args: {
      prev?: unknown
      treat_null_as_missing?: boolean
      value: unknown
    }
    Returns: unknown
  }
  move_chunk: {
    Args: {
      chunk: unknown
      destination_tablespace: unknown
      index_destination_tablespace?: unknown
      reorder_index?: unknown
      verbose?: boolean
    }
    Returns: undefined
  }
  pg_stat_statements: {
    Args: { showtext: boolean }
    Returns: Record<string, unknown>[]
  }
  pg_stat_statements_info: { Args: never; Returns: Record<string, unknown> }
  pg_stat_statements_reset: {
    Args: {
      dbid?: unknown
      minmax_only?: boolean
      queryid?: number
      userid?: unknown
    }
    Returns: string
  }
  pipeline_branch_category: { Args: { p_branch: string }; Returns: string }
  remove_compression_policy: {
    Args: { hypertable: unknown; if_exists?: boolean }
    Returns: boolean
  }
  remove_continuous_aggregate_policy: {
    Args: {
      continuous_aggregate: unknown
      if_exists?: boolean
      if_not_exists?: boolean
    }
    Returns: undefined
  }
}
