export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      apns_push_log: {
        Row: {
          pushed_at: string
          row_id: string
          transition: string
        }
        Insert: {
          pushed_at?: string
          row_id: string
          transition: string
        }
        Update: {
          pushed_at?: string
          row_id?: string
          transition?: string
        }
        Relationships: []
      }
      device_secrets: {
        Row: {
          created_at: string
          device_id: string
          last_used_at: string | null
          revoked_at: string | null
          secret_hash: string
          user_id: string
        }
        Insert: {
          created_at?: string
          device_id: string
          last_used_at?: string | null
          revoked_at?: string | null
          secret_hash: string
          user_id: string
        }
        Update: {
          created_at?: string
          device_id?: string
          last_used_at?: string | null
          revoked_at?: string | null
          secret_hash?: string
          user_id?: string
        }
        Relationships: []
      }
      device_tokens: {
        Row: {
          bundle_id: string
          created_at: string
          device_token: string
          last_seen_at: string
          platform: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bundle_id?: string
          created_at?: string
          device_token: string
          last_seen_at?: string
          platform: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bundle_id?: string
          created_at?: string
          device_token?: string
          last_seen_at?: string
          platform?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      feature_flags: {
        Row: {
          description: string
          enabled: boolean
          flag_name: string
          updated_at: string
        }
        Insert: {
          description: string
          enabled: boolean
          flag_name: string
          updated_at?: string
        }
        Update: {
          description?: string
          enabled?: boolean
          flag_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      idle_saves: {
        Row: {
          created_at: string
          save: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          save?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          save?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      location_traces: {
        Row: {
          accuracy_m: number | null
          activity_type: string | null
          altitude_accuracy_m: number | null
          altitude_m: number | null
          battery_is_charging: boolean | null
          battery_level: number | null
          captured_at: string
          client_seq: number
          created_at: string
          device_id: string
          heading_deg: number | null
          id: string
          is_moving: boolean | null
          latitude: number
          longitude: number
          odometer_m: number | null
          source: string
          speed_mps: number | null
          user_id: string
        }
        Insert: {
          accuracy_m?: number | null
          activity_type?: string | null
          altitude_accuracy_m?: number | null
          altitude_m?: number | null
          battery_is_charging?: boolean | null
          battery_level?: number | null
          captured_at: string
          client_seq: number
          created_at?: string
          device_id: string
          heading_deg?: number | null
          id?: string
          is_moving?: boolean | null
          latitude: number
          longitude: number
          odometer_m?: number | null
          source?: string
          speed_mps?: number | null
          user_id: string
        }
        Update: {
          accuracy_m?: number | null
          activity_type?: string | null
          altitude_accuracy_m?: number | null
          altitude_m?: number | null
          battery_is_charging?: boolean | null
          battery_level?: number | null
          captured_at?: string
          client_seq?: number
          created_at?: string
          device_id?: string
          heading_deg?: number | null
          id?: string
          is_moving?: boolean | null
          latitude?: number
          longitude?: number
          odometer_m?: number | null
          source?: string
          speed_mps?: number | null
          user_id?: string
        }
        Relationships: []
      }
      temper_completion_index: {
        Row: {
          account_progress: Json | null
          character_progress: Json | null
          created_at: string
          cross_character_progress: Json | null
          overall_completion_score: number | null
          page_id: string
          updated_at: string
        }
        Insert: {
          account_progress?: Json | null
          character_progress?: Json | null
          created_at?: string
          cross_character_progress?: Json | null
          overall_completion_score?: number | null
          page_id: string
          updated_at?: string
        }
        Update: {
          account_progress?: Json | null
          character_progress?: Json | null
          created_at?: string
          cross_character_progress?: Json | null
          overall_completion_score?: number | null
          page_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      temper_market_listings: {
        Row: {
          captured_at: string
          created_at: string
          guild_name: string
          id: string
          item_link: string
          item_name: string | null
          item_unique_id: string
          kiosk_name: string | null
          price: number
          price_per_unit: number
          quality: number
          seller_name: string | null
          stack_count: number
          time_remaining: number
          updated_at: string
          uploaded_by_user_id: string
          world_name: string
        }
        Insert: {
          captured_at: string
          created_at?: string
          guild_name: string
          id?: string
          item_link: string
          item_name?: string | null
          item_unique_id: string
          kiosk_name?: string | null
          price: number
          price_per_unit: number
          quality: number
          seller_name?: string | null
          stack_count: number
          time_remaining: number
          updated_at?: string
          uploaded_by_user_id: string
          world_name: string
        }
        Update: {
          captured_at?: string
          created_at?: string
          guild_name?: string
          id?: string
          item_link?: string
          item_name?: string | null
          item_unique_id?: string
          kiosk_name?: string | null
          price?: number
          price_per_unit?: number
          quality?: number
          seller_name?: string | null
          stack_count?: number
          time_remaining?: number
          updated_at?: string
          uploaded_by_user_id?: string
          world_name?: string
        }
        Relationships: []
      }
      temper_market_price_extracts: {
        Row: {
          created_at: string
          data: Json
          id: string
          platform: string
          price_type: string
          server: string
          updated_at: string
          uploaded_by_user_id: string
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          platform: string
          price_type: string
          server: string
          updated_at?: string
          uploaded_by_user_id: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          platform?: string
          price_type?: string
          server?: string
          updated_at?: string
          uploaded_by_user_id?: string
        }
        Relationships: []
      }
      temper_market_pricing_snapshots: {
        Row: {
          chunk_count: number
          chunks: Json
          created_at: string
          data_timestamp: string
          id: string
          platform: string
          server: string
          updated_at: string
          uploaded_by_user_id: string
        }
        Insert: {
          chunk_count: number
          chunks: Json
          created_at?: string
          data_timestamp: string
          id?: string
          platform: string
          server: string
          updated_at?: string
          uploaded_by_user_id: string
        }
        Update: {
          chunk_count?: number
          chunks?: Json
          created_at?: string
          data_timestamp?: string
          id?: string
          platform?: string
          server?: string
          updated_at?: string
          uploaded_by_user_id?: string
        }
        Relationships: []
      }
      temper_ttc_listing_cache: {
        Row: {
          cache_key: string
          entries: Json
          fetched_at: string
        }
        Insert: {
          cache_key: string
          entries: Json
          fetched_at?: string
        }
        Update: {
          cache_key?: string
          entries?: Json
          fetched_at?: string
        }
        Relationships: []
      }
    }
    Views: {
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
    Functions: {
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
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

