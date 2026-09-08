import { SurfaceProvider } from "@akasha/design-primitives/surface-provider"
import { ErrorCaptureInstaller } from "@akasha/errors-client/error-capture-installer"
import { useReportRenderError } from "@akasha/errors-client/use-report-render-error"
import geistSansWoff2 from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url"
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
import "./audhdalan-web-look/audhdalan-web-look.stylesheet.styles.css"

export const links: Route.LinksFunction = () => [
  {
    rel: "preload",
    href: geistSansWoff2,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
]

export const meta: Route.MetaFunction = () => [
  { title: "audhdalan" },
  { name: "description", content: "audhdalan.com" },
]

export async function loader({ context }: Route.LoaderArgs) {
  return { nonce: context.nonce }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const nonce = useRouteLoaderData<typeof loader>("root")?.nonce
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
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  useReportRenderError(error, "audhdalan")

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
