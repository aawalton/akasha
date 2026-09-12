import { SupabaseProvider } from "akasha/alan/harness/supabase-rr/supabase-provider/supabase-provider.module.code.tsx"
import { loader as appLayoutLoader } from "akasha/alan/web/.server/app-layout-loading/app-layout-loading.module.code.ts"
import { buildNativeTtsAdapter } from "akasha/alan/web/kokoro-tts-adapter/kokoro-tts-adapter.module.code.ts"
import { AppShell } from "akasha/alan/web/modules/alan-app-shell/alan-app-shell.module.code.tsx"
import { AuthProvider } from "akasha/alan/web/modules/alan-auth-provider/alan-auth-provider.module.code.tsx"
import { isNativeShell } from "akasha/alan/web/modules/capacitor-bridge/capacitor-bridge.module.code.ts"
import { resolveShellEnsureRendition } from "akasha/alan/web/shell-ensure-rendition/shell-ensure-rendition.module.code.ts"
import {
  resolveShellHlsSrc,
  resolveShellMediaSrc,
} from "akasha/alan/web/shell-media-src/shell-media-src.module.code.ts"
import { Toaster } from "akasha/design/interfaces/primitives/sonner/sonner.module.code.tsx"
import { PlayingSessionProvider } from "akasha/pages/ui/media/playing-session-context/playing-session-context.module.code.tsx"
import { useMemo } from "react"
import { Outlet } from "react-router"
import type { Route } from "./+types/_app-layout"

export const loader = appLayoutLoader

type MediaTrack = Parameters<typeof resolveShellHlsSrc>[0]

function absoluteUrl(url: string): string {
  return new URL(url, window.location.href).toString()
}

function shellMediaWiring() {
  if (!isNativeShell()) return null
  return {
    mediaSrcResolver: async (track: MediaTrack): Promise<string> =>
      absoluteUrl(await resolveShellMediaSrc(track)),
    mediaHlsSrcResolver: async (track: MediaTrack): Promise<string> =>
      absoluteUrl(await resolveShellHlsSrc(track)),
    nativeTtsAdapter: buildNativeTtsAdapter() ?? undefined,
    ensureRendition: resolveShellEnsureRendition,
  }
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  const shell = useMemo(shellMediaWiring, [])
  return (
    <SupabaseProvider>
      <AuthProvider>
        {}
        <PlayingSessionProvider
          mediaSrcResolver={shell?.mediaSrcResolver}
          mediaHlsSrcResolver={shell?.mediaHlsSrcResolver}
          nativeTtsAdapter={shell?.nativeTtsAdapter}
          ensureRendition={shell?.ensureRendition}
        >
          <AppShell user={loaderData.user} ssrNavItems={loaderData.navItems}>
            <Outlet />
          </AppShell>
        </PlayingSessionProvider>
        <Toaster />
      </AuthProvider>
    </SupabaseProvider>
  )
}
