"use client"

import { useSupabase } from "@akasha/supabase-rr/supabase-provider"
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
