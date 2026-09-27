import { useDocumentNonce } from "akasha/code/router-app/modules/document-nonce/document-nonce.module.code.tsx"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { innworldWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/innworld-web.web-app.ts"
import { SiteDocumentHead } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/head/site-document-head.module.code.tsx"
import { metaFor } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { PhrasedErrorScreen } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/error-screen/web-phrase-error-screen.module.code.tsx"
import { seededLoaderAt } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/seeding/web-phrase-seeding.module.code.ts"
import { errorScreenErrorTitle } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/error-screen-error-title.web-phrase.ts"
import { innworldErrorNotFound } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/innworld-error-not-found.web-phrase.ts"
import { innworldErrorWentWrong } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/innworld-error-went-wrong.web-phrase.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import type React from "react"
import { Links, Meta, Scripts, ScrollRestoration } from "react-router"
import type { Route } from "./+types/root"
import "akasha/product/wandering-inn-wiki/web/look/wandering-inn-wiki-web-look.stylesheet.styles.css"
import "akasha/code/router-app/vite-client/vite-client.type-declaration.d.ts"

const WEB_APP = namedAs("web-app", innworldWeb.slug, null)

export const meta = metaFor(null)

const SAID = {
  notFound: innworldErrorNotFound.slug,
  wentWrong: innworldErrorWentWrong.slug,
  thrown: errorScreenErrorTitle.slug,
}

export const loader = seededLoaderAt(WEB_APP, "")

export function Layout({ children }: { children: React.ReactNode }) {
  const nonce = useDocumentNonce()
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Meta />
        <Links />
        {}
        <script src="/sidebar-boot.js" nonce={nonce} suppressHydrationWarning />
      </head>
      <body className="font-sans antialiased">
        <SurfaceProvider level={0} background={false}>
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
  return <PhrasedErrorScreen error={error} said={SAID} />
}
