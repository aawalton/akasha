"use client"

import { AppShell } from "@akasha/alanwalton-web/alan-app-shell"
import { AuthProvider } from "@akasha/alanwalton-web/alan-auth-provider"
import { buildNativeTtsAdapter } from "@akasha/alanwalton-web/kokoro-tts-adapter"
import { resolveShellEnsureRendition } from "@akasha/alanwalton-web/shell-ensure-rendition"
import { resolveShellHlsSrc, resolveShellMediaSrc } from "@akasha/alanwalton-web/shell-media-src"
import { Toaster } from "@akasha/design-primitives/sonner"
import { PlayingSessionProvider } from "@akasha/pages-ui/media/playing-session-context"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import { SupabaseProvider } from "@akasha/supabase-rr/supabase-provider"
import { type ReactNode, useMemo } from "react"
import { Outlet } from "react-router"

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
