import literataLatinWoff2 from "@fontsource-variable/literata/files/literata-latin-wght-normal.woff2?url"
import { PageLayoutSkeleton } from "@shared/design-layout/components/page-layout"
import { tabbedPageSkeleton } from "@shared/design-layout/components/skeleton-presets"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { SurfaceProvider } from "@shared/design-primitives/components/surface-provider"
import { ErrorCaptureInstaller } from "@shared/errors-client/error-capture-installer"
import { reportError, setErrorReportOrigin, setReleaseSha } from "@shared/errors-client/report-error"
import { useReportRenderError } from "@shared/errors-client/use-report-render-error"
import { PagesUICapabilityHosts } from "@shared/pages-ui/capabilities/capability-hosts"
import { configureLocalPositionReader } from "@shared/pages-ui/components/local-position-port"
import { parseBuildSha } from "@shared/pages-ui/app-version/app-version-check.pure"
import { setStoreDiagnosticsSink } from "@shared/pages-ui-store/diagnostics"
import { configureContentPersistence, configurePagesPersistence, configurePagesStoreFetch } from "@shared/pages-ui-store/singleton"
import { type ReactNode, useEffect } from "react"
import {
  isRouteErrorResponse,
  Links,
  type LinksFunction,
  Meta,
  type MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router"
import { StatusBarSync } from "~/components/status-bar-sync"
import { apiFetch } from "~/lib/api-fetch"
import { isNativeShell } from "~/lib/capacitor-bridge"
import { createNativeFsContentPersistence } from "~/lib/content-pages-fs"
import { readLocalPosition } from "~/lib/offline-text"
import { createNativeFsPagesPersistence } from "~/lib/pages-persistence-fs"
import "~/lib/capability-registrations"
import "./globals.css"

configurePagesStoreFetch(apiFetch)

configurePagesPersistence(isNativeShell() ? createNativeFsPagesPersistence() : null)

configureContentPersistence(isNativeShell() ? createNativeFsContentPersistence() : null)

configureLocalPositionReader(isNativeShell() ? readLocalPosition : null)

setErrorReportOrigin("https://alanwalton.com")

setReleaseSha(parseBuildSha(process.env.NEXT_PUBLIC_BUILD_SHA) ?? "")

const ONLINE_CSP = [
  "default-src 'self'",
  "img-src 'self' https://alanwalton.com https://supabase.alanwalton.com data: blob:",
  "media-src 'self' https://alanwalton.com blob:",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://alanwalton.com https://supabase.alanwalton.com wss://supabase.alanwalton.com",
  "base-uri 'none'",
  "object-src 'none'",
].join("; ")

export const links: LinksFunction = () => [
  {
    rel: "preload",
    href: literataLatinWoff2,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "icon",
    href: `${import.meta.env.BASE_URL}favicon.svg`,
    type: "image/svg+xml",
    sizes: "any",
  },
]

export const meta: MetaFunction = () => [
  { title: "Alan Walton" },
  { name: "description", content: "Alan Walton" },
]

export function Layout({ children }: { children: ReactNode }) {
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
        <meta httpEquiv="Content-Security-Policy" content={ONLINE_CSP} />
        <Links />
        <Meta />
      </head>
      <body className="font-sans antialiased">
        <SurfaceProvider level={0} background={false}>
          {}
          <ErrorCaptureInstaller app="alanwalton" />
          {children}
          {}
          <PagesUICapabilityHosts />
          {}
          <StatusBarSync />
        </SurfaceProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function HydrateFallback() {
  return (
    <div className={`min-h-screen ${surfaceClass(0)}`}>
      <PageLayoutSkeleton config={tabbedPageSkeleton({ defaultTab: "home" })} />
    </div>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: { error: unknown }) {
  useReportRenderError(error, "alanwalton")
  const message = isRouteErrorResponse(error)
    ? error.status === 404
      ? "Not found"
      : "Error"
    : "Something went wrong"
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-4 p-6 text-primary">
      <h1 className="font-semibold text-lg">{message}</h1>
      <a href="/" className="inline-block text-secondary underline">
        Back home
      </a>
    </main>
  )
}
