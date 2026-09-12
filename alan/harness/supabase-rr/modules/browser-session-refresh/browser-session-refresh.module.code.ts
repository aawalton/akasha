import type { SupabaseBrowserClient } from "akasha/alan/harness/supabase-rr/modules/browser-client/browser-client.module.code.ts"

export async function refreshBrowserSession(supabase: SupabaseBrowserClient): Promise<void> {
  const { error } = await supabase.auth.refreshSession()
  if (error !== null) {
    console.warn("[auth-provider] auth-stale session refresh failed", error.message)
  }
}
