import { ErrorCaptureInstaller } from "akasha/alan/harness/errors-client/modules/error-capture-installer/error-capture-installer.module.code.tsx"
import { reportError } from "akasha/alan/harness/errors-client/modules/error-reporting/error-reporting.module.code.ts"
import { useReportRenderError } from "akasha/alan/harness/errors-client/modules/use-report-render-error/use-report-render-error.module.code.ts"
import {
  bouncedToSignIn,
  passingOn,
} from "akasha/alan/harness/handover-rr/modules/handover-bounce/handover-bounce.module.code.ts"
import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import {
  type AuthRouteConfig,
  authGuard,
} from "akasha/alan/harness/supabase-rr/modules/auth-guard/auth-guard.module.code.ts"
import { CommandPalette } from "akasha/design/interface/primitive/modules/command-palette/command-palette.module.code.tsx"
import { ShortcutSheet } from "akasha/design/interface/primitive/modules/shortcut-sheet/shortcut-sheet.module.code.tsx"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { setStoreDiagnosticsSink } from "akasha/page/ui-store/modules/diagnostics/diagnostics.module.code.ts"
import { ARCHIVE_OF_WORLDS_SITE } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-handover-site/archive-of-worlds-handover-site.module.code.ts"
import { NavCommands } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-nav-command/archive-of-worlds-nav-command.module.code.tsx"
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
import "akasha/product/archive-of-worlds/web/look/archive-of-worlds-web-look.stylesheet.styles.css"

const AUTH_CONFIG: AuthRouteConfig = {
  signInPath: "/sign-in",
  authPaths: ["/sign-in", "/sign-up"],
  internalApiPaths: ["/api/health", "/api/errors", /^\/handover$/],
  externalRedirectPattern: /^https:\/\/[a-z0-9-]+\.archiveofworlds\.app(\/|$)/,
}

export const meta: Route.MetaFunction = () => [
  { title: "Archive of Worlds" },
  { name: "description", content: "Archive of Worlds" },
]

export async function loader({ request, context }: Route.LoaderArgs) {
  const guard = await authGuard(request, AUTH_CONFIG)
  if (!(guard instanceof Response))
    return data({ nonce: context.nonce }, { headers: guard.headers })
  if (!bouncedToSignIn(guard, AUTH_CONFIG.signInPath)) return guard
  if ((await signedInAs(ARCHIVE_OF_WORLDS_SITE, request)) === null) return guard
  return data({ nonce: context.nonce }, { headers: passingOn(guard) })
}

export function Layout({ children }: { children: React.ReactNode }) {
  const nonce = useRouteLoaderData<typeof loader>("root")?.nonce
  useEffect(() => {
    setStoreDiagnosticsSink((d) =>
      reportError({
        message: d.message,
        stack: d.detail,
        kind: "error",
        app: "archive-of-worlds",
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
        <Meta />
        <Links />
        {}
        <script src="/sidebar-boot.js" nonce={nonce} />
      </head>
      <body className="font-sans antialiased">
        <SurfaceProvider level={0} background={false}>
          <ErrorCaptureInstaller app="archive-of-worlds" />
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
  useReportRenderError(error, "archive-of-worlds")

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
