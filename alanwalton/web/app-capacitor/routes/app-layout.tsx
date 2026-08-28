"use client"

import { Toaster } from "@shared/design-system"
import { PlayingSessionProvider } from "@shared/pages-ui/media/playing-session-context"
import { useUserId } from "@shared/pages-ui/use-user-id"
import { SupabaseProvider } from "@shared/supabase-rr/provider"
import { type ReactNode, useMemo } from "react"
import { Outlet } from "react-router"
import { AppShell } from "~/components/app-shell"
import { AuthProvider } from "~/components/auth-provider"
import { buildNativeTtsAdapter } from "~/lib/native-tts-adapter"
import { resolveShellEnsureRendition } from "~/lib/shell-ensure-rendition"
import { resolveShellHlsSrc, resolveShellMediaSrc } from "~/lib/shell-media-src"

export default function AppLayout() {
  const nativeTtsAdapter = useMemo(() => buildNativeTtsAdapter() ?? undefined, [])
  return (
    <SupabaseProvider>
      <AuthProvider>
        <PlayingSessionProvider
          mediaSrcResolver={resolveShellMediaSrc}
          mediaHlsSrcResolver={resolveShellHlsSrc}
          nativeTtsAdapter={nativeTtsAdapter}
          ensureRendition={resolveShellEnsureRendition}
        >
          <CapacitorAppShell>
            <Outlet />
          </CapacitorAppShell>
          <Toaster />
        </PlayingSessionProvider>
      </AuthProvider>
    </SupabaseProvider>
  )
}

function CapacitorAppShell({ children }: { children: ReactNode }) {
  const userId = useUserId()
  const user = userId != null ? { id: userId, email: undefined } : null
  return (
    <AppShell user={user} ssrNavItems={null}>
      {children}
    </AppShell>
  )
}
