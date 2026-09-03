import { CommandPalette } from "@akasha/design-primitives/command-palette"
import { ShortcutSheet } from "@akasha/design-primitives/shortcut-sheet"
import { SurfaceProvider } from "@akasha/design-primitives/surface-provider"
import { ErrorCaptureInstaller } from "@akasha/errors-client/error-capture-installer"
import { reportError } from "@akasha/errors-client/error-reporting"
import { useReportRenderError } from "@akasha/errors-client/use-report-render-error"
import { setStoreDiagnosticsSink } from "@akasha/pages-ui-store/diagnostics"
import { type AuthRouteConfig, authGuard } from "@akasha/supabase-rr/auth-guard"
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
import { NavCommands } from "./atlas-nav-commands/atlas-nav-commands.module.code.tsx"
import "./alan-atlas-web-look/alan-atlas-web-look.stylesheet.styles.css"

const AUTH_CONFIG: AuthRouteConfig = {
  signInPath: "/sign-in",
  authPaths: ["/sign-in", "/sign-up"],
  internalApiPaths: ["/api/health", "/api/errors", "/basemap/na-eu.pmtiles"],
  externalRedirectPattern: /^https:\/\/[a-z0-9-]+\.alanwalton\.com(\/|$)/,
}

export const meta: Route.MetaFunction = () => [
  { title: "Atlas" },
  { name: "description", content: "Atlas" },
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
        app: "atlas",
        errorUserId: null,
      })
    )
    return () => setStoreDiagnosticsSink(null)
  }, [])
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Meta />
        <Links />
        {}
        <script src="/sidebar-boot.js" nonce={nonce} />
      </head>
      <body className="font-sans antialiased">
        <SurfaceProvider level={0} background={false}>
          <ErrorCaptureInstaller app="atlas" />
          {children}
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
  useReportRenderError(error, "atlas")

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
