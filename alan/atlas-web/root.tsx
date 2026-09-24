import { ATLAS_SITE } from "akasha/alan/atlas-web/modules/atlas-handover-site/atlas-handover-site.module.code.ts"
import { NavCommands } from "akasha/alan/atlas-web/modules/atlas-nav-command/atlas-nav-command.module.code.tsx"
import { ErrorCaptureInstaller } from "akasha/alan/harness/errors-client/modules/error-capture-installer/error-capture-installer.module.code.tsx"
import { reportError } from "akasha/alan/harness/errors-client/modules/error-reporting/error-reporting.module.code.ts"
import { useReportRenderError } from "akasha/alan/harness/errors-client/modules/use-report-render-error/use-report-render-error.module.code.ts"
import {
  type HandoverGuardConfig,
  handoverGuard,
} from "akasha/alan/harness/handover-rr/modules/handover-guard/handover-guard.module.code.ts"
import { useDocumentNonce } from "akasha/code/router-app/modules/document-nonce/document-nonce.module.code.tsx"
import { CommandPalette } from "akasha/design/interface/primitive/modules/command-palette/command-palette.module.code.tsx"
import { ShortcutSheet } from "akasha/design/interface/primitive/modules/shortcut-sheet/shortcut-sheet.module.code.tsx"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { setStoreDiagnosticsSink } from "akasha/page/ui-store/modules/diagnostics/diagnostics.module.code.ts"
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
} from "react-router"
import type { Route } from "./+types/root"
import "akasha/alan/atlas-web/look/alan-atlas-web-look.stylesheet.styles.css"
import "akasha/code/router-app/vite-client/vite-client.type-declaration.d.ts"

const GUARD: HandoverGuardConfig = {
  signInPaths: ["/sign-in", "/sign-up"],
  openPaths: [/^\/api\/health/, /^\/api\/errors/, /^\/handover$/],
  externalReturnPattern: /^https:\/\/[a-z0-9-]+\.alanwalton\.com(\/|$)/,
}

export const meta: Route.MetaFunction = () => [
  { title: "Atlas" },
  { name: "description", content: "Atlas" },
]

export async function loader({ request, context }: Route.LoaderArgs) {
  const bounce = await handoverGuard(ATLAS_SITE, request, GUARD)
  if (bounce !== null) return bounce
  return data({ nonce: context.nonce })
}

export function Layout({ children }: { children: React.ReactNode }) {
  const nonce = useDocumentNonce()
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
        <script src="/sidebar-boot.js" nonce={nonce} suppressHydrationWarning />
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
