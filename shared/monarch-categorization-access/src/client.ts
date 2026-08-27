import type { Database } from "../../supabase-database/src/generated/database"
import type { SupabaseClient } from "@supabase/supabase-js"

export type MonarchCategorizationClient = SupabaseClient<Database>
