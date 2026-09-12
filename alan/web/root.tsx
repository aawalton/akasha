import geistSansWoff2 from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url"
import { ErrorCaptureInstaller } from "akasha/alan/harness/errors-client/error-capture-installer/error-capture-installer.module.code.tsx"
import { reportError } from "akasha/alan/harness/errors-client/error-reporting/error-reporting.module.code.ts"
import { useReportRenderError } from "akasha/alan/harness/errors-client/use-report-render-error/use-report-render-error.module.code.ts"
import type { AuthRouteConfig } from "akasha/alan/harness/supabase-rr/modules/auth-guard/auth-guard.module.code.ts"
import { guardedRootData } from "akasha/alan/harness/supabase-rr/root-loader/root-loader.module.code.ts"
import { createNativeFsContentPersistence } from "akasha/alan/web/content-pages-fs/content-pages-fs.module.code.ts"
import { isNativeShell } from "akasha/alan/web/modules/capacitor-bridge/capacitor-bridge.module.code.ts"
import { readLocalPosition } from "akasha/alan/web/offline-text/offline-text.module.code.ts"
import { createNativeFsPagesPersistence } from "akasha/alan/web/pages-persistence-fs/pages-persistence-fs.module.code.ts"
import { fontPreloading } from "akasha/code/router-apps/font-preload/font-preload.module.code.ts"
import { CommandPalette } from "akasha/design/interfaces/primitives/modules/command-palette/command-palette.module.code.tsx"
import { ShortcutSheet } from "akasha/design/interfaces/primitives/shortcut-sheet/shortcut-sheet.module.code.tsx"
import { SurfaceProvider } from "akasha/design/interfaces/primitives/surface-provider/surface-provider.module.code.tsx"
import { configureLocalPositionReader } from "akasha/pages/ui/components/local-position-port/local-position-port.module.code.ts"
import { setStoreDiagnosticsSink } from "akasha/pages/ui-store/diagnostics/diagnostics.module.code.ts"
import {
  configureContentPersistence,
  configurePagesPersistence,
} from "akasha/pages/ui-store/singleton/singleton.module.code.ts"
import type React from "react"
import { useEffect } from "react"
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router"
import type { Route } from "./+types/root"
import "akasha/alan/web/look/alan-web-look.stylesheet.styles.css"
import "akasha/alan/web/modules/capability-registrations/capability-registrations.module.code.ts"
import { NavCommands } from "akasha/alan/web/nav-commands/nav-commands.module.code.tsx"
import { StatusBarSync } from "akasha/alan/web/status-bar-sync/status-bar-sync.module.code.tsx"
import { PagesUICapabilityHosts } from "akasha/pages/ui/capabilities/modules/capability-hosts/capability-hosts.module.code.tsx"

configurePagesPersistence(isNativeShell() ? createNativeFsPagesPersistence() : null)

configureContentPersistence(isNativeShell() ? createNativeFsContentPersistence() : null)

configureLocalPositionReader(isNativeShell() ? readLocalPosition : null)

const AUTH_CONFIG: AuthRouteConfig = {
  signInPath: "/sign-in",
  authPaths: ["/sign-in", "/sign-up"],
  internalApiPaths: [
    "/api/health",
    "/api/pages-ready",
    "/api/errors",
    "/api/zero/",
    "/api/cron/",
    "/api/mcp",
    "/api/claude-usage",
    "/api/cost",
    "/api/inbox-stoplights",
    "/api/habit-stoplights",
    "/api/surplus",
    "/api/safety-level",
    "/api/categorization",
    "/api/readout-relay",
    "/api/wallpaper",
    /^\/api\/media\//,
    /^\/api\/load$/,
    /^\/api\/save$/,
    /^\/api\/persona\/message$/,
    /^\/api\/push\/register$/,
    /^\/api\/track\//,
    /^\/api\/device-secret\/mint$/,
    /^\/api\/device-secret\/revoke$/,
    /^\/api\/tracking\/active-energy$/,
    /^\/api\/tracking\/health-samples$/,
    /^\/api\/sms\/webhook$/,
    /^\/api\/sms\/opt-in$/,
    /^\/api\/sms\/verification-status$/,
    /^\/$/,
    /^\/about$/,
    /^\/services$/,
    /^\/contact$/,
    /^\/terms$/,
    /^\/sms$/,
    /^\/privacy$/,
  ],
  externalRedirectPattern: /^https:\/\/[a-z0-9-]+\.alanwalton\.com(\/|$)/,
  signInOnInvalidSession: true,
}

export const links: Route.LinksFunction = () => [
  ...fontPreloading(geistSansWoff2),
  {
    rel: "icon",
    href: "/favicon.svg",
    type: "image/svg+xml",
    sizes: "any",
  },
]

export const meta: Route.MetaFunction = () => [
  { title: "Alan Walton" },
  { name: "description", content: "Alan Walton — unified workspace" },
]

async function loader({ request, context }: Route.LoaderArgs) {
  return guardedRootData(request, AUTH_CONFIG, context.nonce)
}

export function Layout({ children }: { children: React.ReactNode }) {
  const nonce = useRouteLoaderData<typeof loader>("root")?.nonce
  useEffect(() => {
    setStoreDiagnosticsSink((d) =>
      reportError({
        message: d.message,
        stack: d.detail,
        kind: "error",
        app: "alanwalton",
        errorUserId: null,
      })
    )
    return () => setStoreDiagnosticsSink(null)
  }, [])
  useEffect(() => {
    document.documentElement.dataset.appReady = "1"
  }, [])
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {}
        <Links />
        <Meta />
        {}
        <script src="/sidebar-boot.js" nonce={nonce} />
      </head>
      <body className="font-sans antialiased">
        <SurfaceProvider level={0} background={false}>
          <ErrorCaptureInstaller app="alanwalton" />
          {children}
          <PagesUICapabilityHosts />
          <StatusBarSync />
          <CommandPalette />
          <ShortcutSheet />
          <NavCommands />
        </SurfaceProvider>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  useReportRenderError(error, "alanwalton")

  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText !== ""
          ? error.statusText
          : details
  } else if (import.meta.env.DEV === true && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="mx-auto max-w-7xl p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack != null ? (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      ) : null}
    </main>
  )
}
