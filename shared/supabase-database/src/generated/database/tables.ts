// DO NOT EDIT BY HAND. `Database["public"]["Tables"]`, lifted out of
// the Supabase generated `Database` type so that no one file passes the length akasha
// will hold. The barrel beside this directory is the only thing that imports it, and
// carries the note on how to split a fresh Supabase dump the same way.

import type { Json } from "./json"

export type DatabasePublicTables = {
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
