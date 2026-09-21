import type React from "react"
import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router"
import type { Route } from "./+types/root"
import "akasha/code/router-app/vite-client/vite-client.type-declaration.d.ts"

export const meta: Route.MetaFunction = () => [
  { title: "Innworld" },
  { name: "description", content: "A wiki of The Wandering Inn" },
]

export function loader({ context }: Route.LoaderArgs) {
  return data({ nonce: context.nonce })
}

export function Layout({ children }: { children: React.ReactNode }) {
  const nonce = useRouteLoaderData<typeof loader>("root")?.nonce
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans antialiased">
        {children}
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
