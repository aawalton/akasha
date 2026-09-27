import { ErrorCaptureInstaller } from "akasha/alan/harness/errors-client/modules/error-capture-installer/error-capture-installer.module.code.tsx"
import { useReportRenderError } from "akasha/alan/harness/errors-client/modules/use-report-render-error/use-report-render-error.module.code.ts"
import { useDocumentNonce } from "akasha/code/router-app/modules/document-nonce/document-nonce.module.code.tsx"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { smilingjennyWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/smilingjenny-web.web-app.ts"
import {
  type DocumentData,
  metaFor,
  SITE_DOCUMENT,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { PushRegistrationSync } from "akasha/product/smilingjenny/web/modules/jenny-push-registration-sync/jenny-push-registration-sync.module.code.tsx"
import type React from "react"
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
import "akasha/product/smilingjenny/web/look/smilingjenny-web-look.stylesheet.styles.css"
import "akasha/code/router-app/vite-client/vite-client.type-declaration.d.ts"

const WEB_APP = namedAs("web-app", smilingjennyWeb.slug, null)

const READ = [SITE_DOCUMENT]

const ROOT = "root"

const NOT_FOUND = "not-found"

const NOT_YOURS = "not-yours"

const WENT_WRONG = "went-wrong"

export const meta = metaFor(null)

export async function loader() {
  return { document: await siteDocumentAt(WEB_APP, "") }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const nonce = useDocumentNonce()
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Meta />
        <Links />
        <script src="/sidebar-boot.js" nonce={nonce} suppressHydrationWarning />
      </head>
      <body className="font-sans antialiased">
        <SurfaceProvider level={0} background={false}>
          <ErrorCaptureInstaller app="smilingjenny" />
          {children}
        </SurfaceProvider>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  )
}

export default function App() {
  useLoaderFollowing(READ)
  return (
    <>
      <PushRegistrationSync />
      <Outlet />
    </>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  useReportRenderError(error, "smilingjenny")

  useLoaderFollowing(READ)
  const sections = useRouteLoaderData<DocumentData>(ROOT)?.document.sections ?? []
  const notFound = isRouteErrorResponse(error) && error.status === 404
  const refused = isRouteErrorResponse(error) && error.status === 403
  const anchor = notFound ? NOT_FOUND : refused ? NOT_YOURS : WENT_WRONG
  const shown = sections.find((one) => one.anchor === anchor)
  const heading = shown?.title ?? ""
  const body = shown?.text ?? null

  return (
    <main className="mx-auto flex max-w-lg flex-col gap-3 px-5 py-16">
      <h1 className="font-semibold text-2xl text-primary">{heading}</h1>
      {body === null ? null : <p className="text-base text-secondary">{body}</p>}
    </main>
  )
}
