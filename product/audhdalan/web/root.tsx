import geistSansWoff2 from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url"
import { ErrorCaptureInstaller } from "akasha/alan/harness/errors-client/modules/error-capture-installer/error-capture-installer.module.code.tsx"
import { useReportRenderError } from "akasha/alan/harness/errors-client/modules/use-report-render-error/use-report-render-error.module.code.ts"
import { useDocumentNonce } from "akasha/code/router-app/modules/document-nonce/document-nonce.module.code.tsx"
import { fontPreloading } from "akasha/code/router-app/modules/font-preload/font-preload.module.code.ts"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { audhdalanWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/audhdalan-web.web-app.ts"
import { SiteDocumentHead } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/head/site-document-head.module.code.tsx"
import { metaFor } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { PhrasedErrorScreen } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/error-screen/web-phrase-error-screen.module.code.tsx"
import { seededLoaderAt } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/seeding/web-phrase-seeding.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import type React from "react"
import { Links, Meta, Scripts, ScrollRestoration } from "react-router"
import type { Route } from "./+types/root"
import "akasha/product/audhdalan/web/look/audhdalan-web-look.stylesheet.styles.css"
import "akasha/code/router-app/vite-client/vite-client.type-declaration.d.ts"

const WEB_APP = namedAs("web-app", audhdalanWeb.slug, null)

export const links: Route.LinksFunction = () => fontPreloading(geistSansWoff2)

export const meta = metaFor(null)

export const loader = seededLoaderAt(WEB_APP, "")

export function Layout({ children }: { children: React.ReactNode }) {
  const nonce = useDocumentNonce()
  return (
    <html lang="en" className="font-geist-fallback">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans antialiased">
        <SurfaceProvider level={0} background={false}>
          <ErrorCaptureInstaller app="audhdalan" />
          {children}
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
  useReportRenderError(error, "audhdalan")
  return <PhrasedErrorScreen error={error} />
}
