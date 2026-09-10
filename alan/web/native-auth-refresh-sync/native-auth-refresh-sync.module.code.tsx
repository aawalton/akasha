"use client"

import { useSupabase } from "akasha/alan/harness/supabase-rr/supabase-provider/supabase-provider.module.code.tsx"
import { useEffect } from "react"
import { getApp } from "../capacitor-bridge/capacitor-bridge.module.code.ts"
import { wireNativeAuthRefresh } from "../native-auth-refresh/native-auth-refresh.module.code.ts"

export function NativeAuthRefreshSync() {
  const supabase = useSupabase()
  useEffect(() => {
    const app = getApp()
    if (app === null) return
    return wireNativeAuthRefresh(supabase.auth, app)
  }, [supabase])
  return null
}
