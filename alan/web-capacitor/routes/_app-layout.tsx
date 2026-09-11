"use client"

import { SupabaseProvider } from "akasha/alan/harness/supabase-rr/supabase-provider/supabase-provider.module.code.tsx"
import { AppShell } from "akasha/alan/web/alan-app-shell/alan-app-shell.module.code.tsx"
import { AuthProvider } from "akasha/alan/web/alan-auth-provider/alan-auth-provider.module.code.tsx"
import { buildNativeTtsAdapter } from "akasha/alan/web/kokoro-tts-adapter/kokoro-tts-adapter.module.code.ts"
import { resolveShellEnsureRendition } from "akasha/alan/web/shell-ensure-rendition/shell-ensure-rendition.module.code.ts"
import {
  resolveShellHlsSrc,
  resolveShellMediaSrc,
} from "akasha/alan/web/shell-media-src/shell-media-src.module.code.ts"
import { Toaster } from "akasha/design/interfaces/primitives/sonner/sonner.module.code.tsx"
import { PlayingSessionProvider } from "akasha/pages/ui/media/playing-session-context/playing-session-context.module.code.tsx"
import { useUserId } from "akasha/pages/ui/use-user-id/use-user-id.module.code.tsx"
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
