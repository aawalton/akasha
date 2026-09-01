import { SurfaceProvider } from "@akasha/design-primitives/surface-provider"
import { useReportRenderError } from "@akasha/errors-client/use-report-render-error"
import { isRouteErrorResponse, Link, useRouteError } from "react-router"

export function PageDetailErrorBoundary() {
  const error = useRouteError()
  useReportRenderError(error, "alanwalton")

  const isNotFound = isRouteErrorResponse(error) && error.status === 404
  const heading = isNotFound ? "This page couldn't load" : "Something went wrong"
  const detail = isNotFound
    ? "The page didn't load. This is sometimes temporary."
    : "An unexpected error interrupted this page."

  return (
    <SurfaceProvider level={0} className="min-h-[50vh]">
      <main className="mx-auto flex max-w-2xl flex-col items-start gap-4 p-4 pt-16">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg">{heading}</h1>
          <p className="text-muted-foreground">{detail}</p>
        </div>
        <Link to="." replace className="underline">
          Try again
        </Link>
      </main>
    </SurfaceProvider>
  )
}
