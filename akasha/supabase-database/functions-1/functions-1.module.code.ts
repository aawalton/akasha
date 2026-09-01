export type DatabasePublicFunctions1 = {
  remove_reorder_policy: {
    Args: { hypertable: unknown; if_exists?: boolean }
    Returns: undefined
  }
  remove_retention_policy: {
    Args: { if_exists?: boolean; relation: unknown }
    Returns: undefined
  }
  reorder_chunk: {
    Args: { chunk: unknown; index?: unknown; verbose?: boolean }
    Returns: undefined
  }
  set_adaptive_chunking: {
    Args: {
      chunk_sizing_func?: unknown
      chunk_target_size: string
      hypertable: unknown
    }
    Returns: Record<string, unknown>
  }
  set_chunk_time_interval: {
    Args: {
      chunk_time_interval: unknown
      dimension_name?: unknown
      hypertable: unknown
    }
    Returns: undefined
  }
  set_integer_now_func: {
    Args: {
      hypertable: unknown
      integer_now_func: unknown
      replace_if_exists?: boolean
    }
    Returns: undefined
  }
  set_number_partitions: {
    Args: {
      dimension_name?: unknown
      hypertable: unknown
      number_partitions: number
    }
    Returns: undefined
  }
  set_partitioning_interval: {
    Args: {
      dimension_name?: unknown
      hypertable: unknown
      partition_interval: unknown
    }
    Returns: undefined
  }
  show_chunks: {
    Args: {
      created_after?: unknown
      created_before?: unknown
      newer_than?: unknown
      older_than?: unknown
      relation: unknown
    }
    Returns: unknown[]
  }
  show_limit: { Args: never; Returns: number }
  show_tablespaces: { Args: { hypertable: unknown }; Returns: unknown[] }
  show_trgm: { Args: { "": string }; Returns: string[] }
  time_bucket:
    | { Args: { bucket_width: number; ts: number }; Returns: number }
    | {
        Args: { bucket_width: number; offset: number; ts: number }
        Returns: number
      }
    | { Args: { bucket_width: number; ts: number }; Returns: number }
    | {
        Args: { bucket_width: number; offset: number; ts: number }
        Returns: number
      }
    | { Args: { bucket_width: string; ts: string }; Returns: string }
    | {
        Args: { bucket_width: string; offset: string; ts: string }
        Returns: string
      }
    | {
        Args: { bucket_width: string; origin: string; ts: string }
        Returns: string
      }
    | { Args: { bucket_width: string; ts: string }; Returns: string }
    | {
        Args: { bucket_width: string; offset: string; ts: string }
        Returns: string
      }
    | {
        Args: { bucket_width: string; origin: string; ts: string }
        Returns: string
      }
    | {
        Args: {
          bucket_width: string
          offset?: string
          origin?: string
          timezone: string
          ts: string
        }
        Returns: string
      }
    | { Args: { bucket_width: string; ts: string }; Returns: string }
    | {
        Args: { bucket_width: string; offset: string; ts: string }
        Returns: string
      }
    | {
        Args: { bucket_width: string; origin: string; ts: string }
        Returns: string
      }
    | { Args: { bucket_width: string; ts: string }; Returns: string }
    | {
        Args: { bucket_width: string; offset: string; ts: string }
        Returns: string
      }
    | {
        Args: { bucket_width: string; origin: string; ts: string }
        Returns: string
      }
    | {
        Args: {
          bucket_width: string
          offset?: string
          origin?: string
          timezone: string
          ts: string
        }
        Returns: string
      }
    | { Args: { bucket_width: number; ts: number }; Returns: number }
    | {
        Args: { bucket_width: number; offset: number; ts: number }
        Returns: number
      }
  time_bucket_gapfill:
    | {
        Args: {
          bucket_width: number
          finish?: number
          start?: number
          ts: number
        }
        Returns: number
      }
    | {
        Args: {
          bucket_width: number
          finish?: number
          start?: number
          ts: number
        }
        Returns: number
      }
    | {
        Args: {
          bucket_width: string
          finish?: string
          start?: string
          ts: string
        }
        Returns: string
      }
    | {
        Args: {
          bucket_width: string
          finish?: string
          start?: string
          ts: string
        }
        Returns: string
      }
    | {
        Args: {
          bucket_width: string
          finish?: string
          start?: string
          timezone: string
          ts: string
        }
        Returns: string
      }
    | {
        Args: {
          bucket_width: string
          finish?: string
          start?: string
          ts: string
        }
        Returns: string
      }
    | {
        Args: {
          bucket_width: number
          finish?: number
          start?: number
          ts: number
        }
        Returns: number
      }
  timescaledb_post_restore: { Args: never; Returns: boolean }
  timescaledb_pre_restore: { Args: never; Returns: boolean }
  to_uuidv7: { Args: { ts: string }; Returns: string }
  to_uuidv7_boundary: { Args: { ts: string }; Returns: string }
  uuid_timestamp: { Args: { uuid: string }; Returns: string }
  uuid_timestamp_micros: { Args: { uuid: string }; Returns: string }
  uuid_version: { Args: { uuid: string }; Returns: number }
}
