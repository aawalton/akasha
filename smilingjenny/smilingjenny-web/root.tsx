import { SurfaceProvider } from "@akasha/design-primitives/surface-provider"
import { ErrorCaptureInstaller } from "@akasha/errors-client/error-capture-installer"
import { useReportRenderError } from "@akasha/errors-client/use-report-render-error"
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
import { PushRegistrationSync } from "./jenny-push-registration-sync/jenny-push-registration-sync.module.code.tsx"
import "./smilingjenny-web-look/smilingjenny-web-look.stylesheet.styles.css"

export const meta: Route.MetaFunction = () => [
  { title: "Smiling Jenny" },
  { name: "description", content: "What the system holds." },
  { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
]

export async function loader({ context }: Route.LoaderArgs) {
  return { nonce: context.nonce }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const nonce = useRouteLoaderData<typeof loader>("root")?.nonce
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Meta />
        <Links />
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

  const heading = notFound ? "Nothing here" : "Something went wrong"
  const body = notFound
    ? "This address does not lead anywhere. If you followed a link from a message, try opening it again."
    : "This page could not be loaded. Nothing you did caused it, and nothing has been changed. Alan has been told."

  return (
    <main className="mx-auto flex max-w-lg flex-col gap-3 px-5 py-16">
      <h1 className="font-semibold text-2xl text-primary">{heading}</h1>
      <p className="text-base text-secondary">{body}</p>
    </main>
  )
}
