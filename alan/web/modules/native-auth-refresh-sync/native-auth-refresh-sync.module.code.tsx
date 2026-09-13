"use client"

import { useSupabase } from "akasha/alan/harness/supabase-rr/modules/supabase-provider/supabase-provider.module.code.tsx"
import { getApp } from "akasha/alan/web/modules/capacitor-bridge/capacitor-bridge.module.code.ts"
import { wireNativeAuthRefresh } from "akasha/alan/web/modules/native-auth-refresh/native-auth-refresh.module.code.ts"
import { useEffect } from "react"

export function NativeAuthRefreshSync() {
  const supabase = useSupabase()
  useEffect(() => {
    const app = getApp()
    if (app === null) return
    return wireNativeAuthRefresh(supabase.auth, app)
  }, [supabase])
  return null
}
