import { useDocumentNonce } from "akasha/code/router-app/modules/document-nonce/document-nonce.module.code.tsx"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type React from "react"
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"
import type { Route } from "./+types/root"
import "akasha/product/wandering-inn-wiki/web/look/wandering-inn-wiki-web-look.stylesheet.styles.css"
import "akasha/code/router-app/vite-client/vite-client.type-declaration.d.ts"

export const meta: Route.MetaFunction = () => [
  { title: "Innworld" },
  { name: "description", content: "A wiki of The Wandering Inn" },
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
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1>{notFound ? "404" : "Error"}</h1>
      <p>{notFound ? "No page is here." : "Something went wrong."}</p>
    </main>
  )
}
