"use client"

import { useSupabase } from "@shared/supabase-rr/provider"
import { useEffect } from "react"
import { getApp } from "~/lib/capacitor-bridge"
import { wireNativeAuthRefresh } from "~/lib/native-auth-refresh"

export function NativeAuthRefreshSync() {
  const supabase = useSupabase()
  useEffect(() => {
    const app = getApp()
    if (app === null) return
    return wireNativeAuthRefresh(supabase.auth, app)
  }, [supabase])
  return null
}
