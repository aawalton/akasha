import { ErrorCaptureInstaller } from "akasha/alan/harness/errors-client/modules/error-capture-installer/error-capture-installer.module.code.tsx"
import { useReportRenderError } from "akasha/alan/harness/errors-client/modules/use-report-render-error/use-report-render-error.module.code.ts"
import { useDocumentNonce } from "akasha/code/router-app/modules/document-nonce/document-nonce.module.code.tsx"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { PushRegistrationSync } from "akasha/product/smilingjenny/web/modules/jenny-push-registration-sync/jenny-push-registration-sync.module.code.tsx"
import type React from "react"
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"
import type { Route } from "./+types/root"
import "akasha/product/smilingjenny/web/look/smilingjenny-web-look.stylesheet.styles.css"
import "akasha/code/router-app/vite-client/vite-client.type-declaration.d.ts"

export const meta: Route.MetaFunction = () => [
  { title: "Smiling Jenny" },
  { name: "description", content: "What the system holds." },
  { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
]

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
  return (
    <>
      <PushRegistrationSync />
      <Outlet />
    </>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  useReportRenderError(error, "smilingjenny")

  const notFound = isRouteErrorResponse(error) && error.status === 404
  const refused = isRouteErrorResponse(error) && error.status === 403

  const heading = notFound ? "Nothing here" : refused ? "Not yours" : "Something went wrong"
  const body = notFound
    ? "This address does not lead anywhere. If you followed a link from a message, try opening it again."
    : refused
      ? String(error.data)
      : null

  return (
    <main className="mx-auto flex max-w-lg flex-col gap-3 px-5 py-16">
      <h1 className="font-semibold text-2xl text-primary">{heading}</h1>
      {body === null ? null : <p className="text-base text-secondary">{body}</p>}
    </main>
  )
}
