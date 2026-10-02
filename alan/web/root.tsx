import geistSansWoff2 from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url"
import literataWoff2 from "@fontsource-variable/literata/files/literata-latin-wght-normal.woff2?url"
import { ErrorCaptureInstaller } from "akasha/alan/harness/errors-client/modules/error-capture-installer/error-capture-installer.module.code.tsx"
import { reportError } from "akasha/alan/harness/errors-client/modules/error-reporting/error-reporting.module.code.ts"
import { useReportRenderError } from "akasha/alan/harness/errors-client/modules/use-report-render-error/use-report-render-error.module.code.ts"
import {
  guardedRoot,
  type RouteAccessConfig,
} from "akasha/alan/web/.server/alan-route-guard/alan-route-guard.module.code.ts"
import { useDocumentNonce } from "akasha/code/router-app/modules/document-nonce/document-nonce.module.code.tsx"
import { fontPreloading } from "akasha/code/router-app/modules/font-preload/font-preload.module.code.ts"
import { PanelToggleProvider } from "akasha/design/interface/layout/modules/panel-toggle-provider/panel-toggle-provider.module.code.tsx"
import { CommandPalette } from "akasha/design/interface/primitive/modules/command-palette/command-palette.module.code.tsx"
import { ShortcutSheet } from "akasha/design/interface/primitive/modules/shortcut-sheet/shortcut-sheet.module.code.tsx"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { SiteDocumentHead } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/head/site-document-head.module.code.tsx"
import {
  metaFor,
  openAt,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { PhrasedErrorScreen } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/error-screen/web-phrase-error-screen.module.code.tsx"
import { phrasesRead } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/seeding/web-phrase-seeding.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { setStoreDiagnosticsSink } from "akasha/page/ui-store/modules/diagnostics/diagnostics.module.code.ts"
import type React from "react"
import { useEffect } from "react"
import { Links, Meta, Scripts, ScrollRestoration, useRouteLoaderData } from "react-router"
import type { Route } from "./+types/root"
import "akasha/alan/web/look/alan-web-look.stylesheet.styles.css"
import "akasha/alan/web/modules/declared-effects/declared-effects.module.code.ts"
import { NavCommands } from "akasha/alan/web/modules/nav-command/nav-command.module.code.tsx"
import { StatusBarSync } from "akasha/alan/web/modules/status-bar-sync/status-bar-sync.module.code.tsx"
import { TabIcon } from "akasha/alan/web/modules/tab-icon/tab-icon.module.code.tsx"
import "akasha/code/router-app/vite-client/vite-client.type-declaration.d.ts"
import { alanwaltonWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/alanwalton-web.web-app.ts"

const WEB_APP = namedAs("web-app", alanwaltonWeb.slug, null)

const HOME_PATH = "home"

const ROOT = "root"

const AUTH_CONFIG: RouteAccessConfig = {
  signInPath: "/sign-in",
  authPaths: ["/sign-up"],
  openPaths: [
    /^\/sign-in$/,
    /^\/\.well-known\//,
    /^\/api\/health/,
    /^\/api\/pages-ready/,
    /^\/api\/errors/,
    /^\/api\/zero\//,
    /^\/api\/cron\//,
    /^\/api\/mcp/,
    /^\/api\/claude-usage/,
    /^\/api\/cost/,
    /^\/api\/inbox-stoplights/,
    /^\/api\/habit-stoplights/,
    /^\/api\/surplus/,
    /^\/api\/safety-level/,
    /^\/api\/categorization/,
    /^\/api\/readout-relay/,
    /^\/api\/wallpaper/,
    /^\/api\/persona\/message$/,
    /^\/api\/push\/register$/,
    /^\/api\/track\//,
    /^\/api\/device-secret\/mint$/,
    /^\/api\/device-secret\/revoke$/,
    /^\/api\/tracking\/active-energy$/,
    /^\/api\/tracking\/health-samples$/,
    /^\/api\/sms\/webhook$/,
    /^\/api\/stripe\/webhook$/,
    /^\/api\/auth\//,
    /^\/api\/sms\/opt-in$/,
    /^\/api\/sms\/verification-status$/,
    /^\/requests$/,
  ],
  externalRedirectPattern: /^https:\/\/[a-z0-9-]+\.alanwalton\.com(\/|$)/,
  openAt: openAt(WEB_APP),
}

export const links: Route.LinksFunction = () => [
  ...fontPreloading(geistSansWoff2),
  ...fontPreloading(literataWoff2),
]

export const meta = metaFor(null)

export async function loader({ request }: Route.LoaderArgs) {
  const guarded = await guardedRoot(request, AUTH_CONFIG)
  if (guarded !== null) throw guarded
  const [document, home, phrases] = await Promise.all([
    siteDocumentAt(WEB_APP, ""),
    siteDocumentAt(WEB_APP, HOME_PATH),
    phrasesRead(),
  ])
  return { document, homeLabel: home.title, phrases }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const nonce = useDocumentNonce()
  const homeLabel = useRouteLoaderData<typeof loader>(ROOT)?.homeLabel
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
        <TabIcon />
        <Meta />
        {}
        <script src="/sidebar-boot.js" nonce={nonce} suppressHydrationWarning />
      </head>
      <body className="font-sans antialiased">
        <SurfaceProvider level={0} background={false}>
          <ErrorCaptureInstaller app="alanwalton" />
          <PanelToggleProvider>{children}</PanelToggleProvider>
          <StatusBarSync />
          <CommandPalette />
          <ShortcutSheet />
          {homeLabel === undefined ? null : <NavCommands homeLabel={homeLabel} />}
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
  useReportRenderError(error, "alanwalton")
  return <PhrasedErrorScreen error={error} />
}
