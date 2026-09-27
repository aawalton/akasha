import { ATLAS_APP } from "akasha/alan/atlas-web/modules/atlas-app-id/atlas-app-id.module.code.ts"
import { ATLAS_SITE } from "akasha/alan/atlas-web/modules/atlas-handover-site/atlas-handover-site.module.code.ts"
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
import { SiteDocumentHead } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/head/site-document-head.module.code.tsx"
import {
  metaFor,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { PhrasedErrorScreen } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/error-screen/web-phrase-error-screen.module.code.tsx"
import { phrasesRead } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/seeding/web-phrase-seeding.module.code.ts"
import { setStoreDiagnosticsSink } from "akasha/page/ui-store/modules/diagnostics/diagnostics.module.code.ts"
import type React from "react"
import { useEffect } from "react"
import { Links, Meta, Scripts, ScrollRestoration } from "react-router"
import type { Route } from "./+types/root"
import "akasha/alan/atlas-web/look/alan-atlas-web-look.stylesheet.styles.css"
import "akasha/code/router-app/vite-client/vite-client.type-declaration.d.ts"

const GUARD: HandoverGuardConfig = {
  signInPaths: ["/sign-in", "/sign-up"],
  openPaths: [/^\/api\/health/, /^\/api\/errors/, /^\/handover$/],
  externalReturnPattern: /^https:\/\/[a-z0-9-]+\.alanwalton\.com(\/|$)/,
}

export const meta = metaFor(null)

export async function loader({ request }: Route.LoaderArgs) {
  const guarded = await handoverGuard(ATLAS_SITE, request, GUARD)
  if (guarded !== null) throw guarded
  const [document, phrases] = await Promise.all([siteDocumentAt(ATLAS_APP, ""), phrasesRead()])
  return { document, phrases }
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
        </SurfaceProvider>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  )
}

export default function App() {
  return <SiteDocumentHead />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  useReportRenderError(error, "atlas")
  return <PhrasedErrorScreen error={error} />
}
