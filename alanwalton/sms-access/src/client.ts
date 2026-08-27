import type { Database } from "../../../shared/supabase-database/src/generated/database"
import type { SupabaseClient } from "@supabase/supabase-js"

export type SmsAllowlistClient = SupabaseClient<Database>
