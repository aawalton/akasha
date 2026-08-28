import geistSansWoff2 from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url"
import { SurfaceProvider } from "@shared/design-primitives/components/surface-provider"
import { CommandPalette } from "@shared/design-primitives/components/command-palette"
import { ShortcutSheet } from "@shared/design-primitives/components/shortcut-sheet"
import { ErrorCaptureInstaller } from "@shared/errors-client/error-capture-installer"
import { reportError } from "@shared/errors-client/report-error"
import { useReportRenderError } from "@shared/errors-client/use-report-render-error"
import { setStoreDiagnosticsSink } from "@shared/pages-ui-store/diagnostics"
import { type AuthRouteConfig, authGuard } from "@shared/supabase-rr/auth/proxy"
import type React from "react"
import { useEffect } from "react"
import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router"
import type { Route } from "./+types/root"
import "./globals.css"
import "~/lib/capability-registrations"
import { PagesUICapabilityHosts } from "@shared/pages-ui/capabilities/capability-hosts"
import { NavCommands } from "~/components/nav-commands"
import { StatusBarSync } from "~/components/status-bar-sync"

const AUTH_CONFIG: AuthRouteConfig = {
  signInPath: "/sign-in",
  authPaths: ["/sign-in", "/sign-up"],
  internalApiPaths: [
    "/api/health",
    "/api/errors",
    "/api/zero/",
    "/api/cron/",
    "/api/mcp",
    "/api/values-stoplights",
    "/api/persona-stoplights",
    "/api/claude-usage",
    "/api/inbox-stoplights",
    "/api/habit-stoplights",
    "/api/surplus",
    "/api/safety-level",
    "/api/categorization",
    "/api/wallpaper",
    /^\/api\/media\//,
    /^\/api\/load$/,
    /^\/api\/save$/,
    /^\/api\/persona\/message$/,
    /^\/api\/action$/,
    /^\/api\/awen\/read\//,
    /^\/api\/push\/register$/,
    /^\/api\/track\//,
    /^\/api\/device-secret\/mint$/,
    /^\/api\/device-secret\/revoke$/,
    /^\/api\/tracking\/active-energy$/,
    /^\/api\/tracking\/health-samples$/,
    /^\/api\/sms\/opt-in$/,
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
  {
    rel: "preload",
    href: geistSansWoff2,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
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

export async function loader({ request, context }: Route.LoaderArgs) {
  const guard = await authGuard(request, AUTH_CONFIG)
  if (guard instanceof Response) return guard
  return data({ nonce: context.nonce }, { headers: guard.headers })
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
